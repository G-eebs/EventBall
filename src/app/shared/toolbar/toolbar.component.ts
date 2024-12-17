import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { LoginComponent } from '../login/login.component';
import { Auth, User, user, getRedirectResult, GoogleAuthProvider } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  imports: [MatMenuModule, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  private auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;
  currentUser: WritableSignal<User | null> = signal(null)

  constructor(private loginDialog: MatDialog, private logoutSnackBar: MatSnackBar) {
    this.userSubscription = this.user$.subscribe((user: User | null) => {
      this.currentUser.set(user)
    })
  }

  openLoginDialog() {
    this.loginDialog.open(LoginComponent)
  }

  openlogoutSnackBar(message: string) {
    this.logoutSnackBar.open(message, "OK", {
      duration: 5000,
    });
  }

  async signOut() {
    try {
      await this.auth.signOut()
      this.openlogoutSnackBar("Signed out")
    } catch (error: any) {
      console.error('Error signing out: ', error)
      this.openlogoutSnackBar(`Error signing out: ${error.message}`)
    }
  }

  async ngOnInit() {
    const result = await getRedirectResult(this.auth);
    console.log(result);
    if (result) {
      const user = result.user;
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      console.log(result, user, credential, token);
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
