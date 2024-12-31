import { computed, inject, Injectable, signal } from '@angular/core';
import { messageCollection } from '../utils/firebase';
import { count, defer, delay, exhaustMap, filter, from, map, of, retry, Subject, } from 'rxjs';
import { addDoc, orderBy,limit, query, QueryConstraint } from 'firebase/firestore';
import { AuthService } from './auth.service';
import { TMessage } from '../data/types/message.type';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { collection, collectionData } from 'rxfire/firestore';

export type TMessageState = {
  messages: TMessage[];
  error: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  authService = inject(AuthService);
  authUser = toObservable(this.authService.user);

  messages = this.getMessage$().pipe(
    retry({
      count: 2,
      delay: (error, count) => this.authUser.pipe(filter((val) => { return !!val }))
    }
    ));

  constructor() {
    this.messages.subscribe({
      next: (value) => {
        this.state.update((oldState) => { return { error: '', messages: value as TMessage[] }; })
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.add$.pipe(takeUntilDestroyed(),
      exhaustMap((value) => this.addMessage$(value) as any)
    ).subscribe(
      {
        next: (value) => {
          console.log("Input Value ", value);
          this.state.update((oldState) => { return { ...oldState, messages: value as TMessage[] } });
        },
        error: (error) => {
          console.log("error", error);
        }
      }
    );
    this.logout$.pipe(takeUntilDestroyed()).subscribe({
      next: (value) => {
        console.log("Point of Error")
        this.state.update((oldState) => { return { error: '', messages: [] }; });
      }
    });
    this.error$.pipe(takeUntilDestroyed()).subscribe({
      next: (value) => {
        console.log("Point of Error")
        this.state.update((oldState) => { return { ...oldState, error: value }; });
      }
    })
  }

  add$ = new Subject<TMessage['content']>();
  error$ = new Subject<any>();
  logout$ = this.authUser.pipe(filter((value) => !value));

  private state = signal<TMessageState>({
    messages: [],
    error: ''
  });

  message = computed(() => { return this.state().messages });

  error = computed(() => { return this.state().error });

  addMessage$(message: string) {
    const currentUser = this.authService.user();
    if (!currentUser) return;
    const addMessage: TMessage = {
      author: currentUser.uid,
      content: message,
      date: Date.now().toString()
    }
    return defer(() => {
      return addDoc(messageCollection, addMessage);
    });
  }

  getMessage$() {
    const queryfilter = query(messageCollection,
      orderBy('date','desc'),
      limit(50)
    );
    return collectionData(queryfilter).pipe(
      map((element) => { return element.reverse(); })
    );
  }

}
