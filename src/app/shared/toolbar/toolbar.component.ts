import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { LoginComponent } from '../login-dialog/login-dialog.component';
import { Auth, User, user } from '@angular/fire/auth';
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
  routerEventsSubscription: Subscription
  currentRoute = signal("")

  constructor(private loginDialog: MatDialog, private logoutSnackBar: MatSnackBar, private router: Router) {
    this.userSubscription = this.user$.subscribe((user: User | null) => {
      this.currentUser.set(user)
    })
    this.routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute.set(event.url)
      }
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
      if(this.router.url === "/create-event") {
        this.router.navigate([""])
      }
    } catch (error: any) {
      console.error('Error signing out: ', error)
      this.openlogoutSnackBar(`Error signing out: ${error.message}`)
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.routerEventsSubscription.unsubscribe();
  }
}
