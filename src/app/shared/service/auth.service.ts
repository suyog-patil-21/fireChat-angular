import { Injectable, signal, computed } from '@angular/core';
import { authState } from 'rxfire/auth';
import { signOut, getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword ,UserCredential } from 'firebase/auth';
import { app } from '../utils/firebase';
import { TAuthState } from '../data/types/authstate.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { from, defer, Observable } from 'rxjs';
import { TCredientials } from '../data/types/crediential.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = getAuth(app)

  authState = authState(this.auth);

  state = signal<TAuthState>({
    user: undefined
  });

  user = computed(() => {
    return this.state().user;});

  constructor() {
    this.authState.pipe(
      takeUntilDestroyed()
    ).subscribe(
      {
        next: (value) => {
          this.state.update((oldState) => {
            return { user: value };
          })
        }
      }
    );
  }

  signInWithEmailAndPass(crediential: TCredientials): Observable<UserCredential> {
    return from(
      defer(
        () => {
          return signInWithEmailAndPassword(this.auth, crediential.email, crediential.password);
        }
      )
    );
  }

  logoutUser() {
    signOut(this.auth);
  }

  createEmailAndPass(crediential: TCredientials) : Observable<UserCredential>{
    return from(
      defer(
        ()=> createUserWithEmailAndPassword(this.auth,crediential.email,crediential.password)
      )
    )
  }
}
