import { Component, EnvironmentInjector, inject, runInInjectionContext, signal } from '@angular/core';
import { Auth, user, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithCredential } from '@angular/fire/auth';
import { MatButton } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon'
import { EmailFormComponent } from './email-form/email-form.component';
import { Capacitor } from '@capacitor/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

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
  googleProvider = new GoogleAuthProvider();
  isSignInSubmitted = signal(false)
  isNativePlatform = Capacitor.isNativePlatform()

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

  async onGoogleSignIn() {
    this.isSignInSubmitted.set(true)
    if (!this.isNativePlatform) {
      try {
        await runInInjectionContext(this.environmentInjector, () => signInWithPopup(this.auth, this.googleProvider))
        this.isSignInSuccessful.set(true)
      } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        const message = errorCode.split("/")[1].replaceAll("-", " ")
        this.signInError.set(`Error: ${message}`)
        this.isSignInSubmitted.set(false)
      }
    } else {
      try {
        const result = await FirebaseAuthentication.signInWithGoogle();
        const credential = GoogleAuthProvider.credential(result.credential?.idToken)
        await signInWithCredential(this.auth, credential)
        this.isSignInSuccessful.set(true)
      } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode) {
          console.error(errorCode, errorMessage);
          const message = errorCode.split("/")[1].replaceAll("-", " ")
          this.signInError.set(`Error: ${message}`)
        } else {
          console.error(error)
          this.signInError.set(`Error: ${JSON.stringify(error)}`)
        }
        this.isSignInSubmitted.set(false)
      }
    }
  }
}
