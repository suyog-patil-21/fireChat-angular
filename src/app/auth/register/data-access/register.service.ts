import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, exhaustMap, Subject, switchMap } from 'rxjs';
import { TCredientials } from '../../../shared/data/types/crediential.type';
import { TAuthState } from '../../../shared/data/types/authstate.type';
import { AuthService } from '../../../shared/service/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Status } from '../../login/data-access/login.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  autheService = inject(AuthService);

  register$ = new Subject<TCredientials>();
  error$ = new Subject<any>();

  state = signal<Status>(Status.pending);

  status = computed(() => this.state());

  authenticationstatus = this.register$.pipe(switchMap((val) => {
    return this.autheService.createEmailAndPass(val).pipe(
      catchError((err) => {
        this.error$.next(err);
        return EMPTY;
      })
    )
  }));

  constructor() {
    this.authenticationstatus.pipe(takeUntilDestroyed()).subscribe(
      {
        next: (val) => {
          console.log(val);
          this.state.update((oldState) => { return Status.success })
        },
      });
      this.register$.pipe(takeUntilDestroyed()).subscribe(
        {
          next: (val)=>{
            this.state.update((oldState)=> {return Status.authenticating;})
          }
        }
      );
      this.error$.pipe(takeUntilDestroyed()).subscribe(
        {
          next: (val)=>{
            this.state.update((oldState)=> {return Status.error;})
          }
        }
      )
  }

}
