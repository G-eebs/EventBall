import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-attend-form',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './attend-form.component.html',
  styleUrl: './attend-form.component.css'
})
export class AttendFormComponent {
  attendForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.pattern(/^\S.*/)]),
    email: new FormControl("", [Validators.required, Validators.email]),
  })

  attendeeSubmitted = output<Object>()

  onSubmit() {
    const attendee = {
      name: this.attendForm.get("name")?.value,
      email: this.attendForm.get("email")?.value,
    }
    this.attendeeSubmitted.emit(attendee)
  }

}
