import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, single, Subject, switchMap, take, tap } from 'rxjs';
import { TCredientials } from '../../../shared/data/types/crediential.type';
import { AuthService } from '../../../shared/service/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export enum Status {
  pending = 'pending',
  authenticating = 'authenticating',
  success = 'success',
  error = 'error',
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authService = inject(AuthService);

  login$ = new Subject<TCredientials>();
  error$ = new Subject<any>();

  state = signal<Status>(Status.pending);
  status = computed(() => {
    return this.state;
  })

  authenticationStatus = this.login$.pipe(switchMap((crediential) => {
    return this.authService.signInWithEmailAndPass(crediential).pipe(
      catchError((err, observable) => {
        this.error$.next(err);
        return EMPTY;
      })
    );
  }))

  constructor() {
    this.authenticationStatus.pipe(takeUntilDestroyed()).subscribe(
      {
        next: (value) => {
          this.state.update((oldState) => { return Status.success; })
        }
      }
    );

    this.login$.pipe(takeUntilDestroyed()).subscribe(
      {
        next: (value) => {
          this.state.update((oldState) => { return Status.authenticating; })
        }
      }
    );

    this.error$.pipe(takeUntilDestroyed()).subscribe(
      {
        next: (value) => {
          this.state.update((oldState) => { return Status.error; })
        }
      }
    )
  }
}
