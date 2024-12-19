import { Component, input, output, signal, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-email-form',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.css'
})
export class EmailFormComponent {
  emailForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
  })

  isSubmitted = signal(false)
  signInClicked = signal(false)
  emailAccountSubmitted = output<Object>()
  signInError = input<any>()
  signInErrorMessage = signal<String | null>(null)

  onSubmit() {
    this.isSubmitted.set(true)
    this.signInErrorMessage.set(null)
    const userDetails = {
      signIn: true,
      email: this.emailForm.get("email")?.value,
      password: this.emailForm.get("password")?.value,
    }
    if (this.signInClicked()) {
      this.emailAccountSubmitted.emit(userDetails)
    } else {
      userDetails.signIn = false
      this.emailAccountSubmitted.emit(userDetails)
    }
  }

  onSignIn() {
    this.signInClicked.set(true)
  }

  onSignUp() {
    this.signInClicked.set(false)
  }

  ngOnChanges(changes: SimpleChanges) {
    const formSignInError = changes['signInError']
    if (formSignInError.currentValue) {
      const errorCode: string = formSignInError.currentValue.errorCode
      const message = errorCode.split("/")[1].replaceAll("-", " ")
      this.signInErrorMessage.set(`Error: ${message}`)
      this.isSubmitted.set(false)
    }
  }
}
