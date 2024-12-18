import { Component, EnvironmentInjector, inject, runInInjectionContext, signal } from '@angular/core';
import { Auth, user, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { MatButton } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon'
import { EmailFormComponent } from './email-form/email-form.component';

@Component({
  selector: 'app-login',
  imports: [EmailFormComponent, MatButton, MatDialogModule, MatIcon],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css'
})

export class LoginComponent {
  private auth = inject(Auth);
  user$ = user(this.auth);
  isEmailSignIn = signal(false);
  isSignInSuccessful = signal(false);
  isUserCreated = signal(false);
  signInError = signal<any>(null);
  environmentInjector = inject(EnvironmentInjector)

  async emailAccountSubmitted(userDetails: any) {
    this.isSignInSuccessful.set(false)
    this.isUserCreated.set(false)
    this.signInError.set(null)
    const signIn = userDetails.signIn
    const email = userDetails.email
    const password = userDetails.password
    if (signIn) {
      try {
        await runInInjectionContext(this.environmentInjector, () => signInWithEmailAndPassword(this.auth, email, password))
        this.isSignInSuccessful.set(true)
      } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        this.signInError.set({errorCode, errorMessage})
      }
    } else {
      try {
        await runInInjectionContext(this.environmentInjector, () => createUserWithEmailAndPassword(this.auth, email, password))
        this.isSignInSuccessful.set(true)
        this.isUserCreated.set(true)
      } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        this.signInError.set({errorCode, errorMessage})
      }
    }
  }

  onBack() {
    this.isEmailSignIn.set(false); 
    this.signInError.set(null)
  }

}
