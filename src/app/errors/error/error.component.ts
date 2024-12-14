import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  constructor(private router: Router, private route: ActivatedRoute) {
    if (this.router.getCurrentNavigation()?.extras.state?.["error"]) {
      this.error = JSON.parse(this.router.getCurrentNavigation()?.extras.state?.["error"])
      this.error.message = this.error.error.error.message
      this.error.description = this.error.error.error.description
    }
  }
  error: any = {
    status: 500,
    statusText: "Internal Server Error"
  }

  async ngOnInit() {
    const routeData = await firstValueFrom(this.route.data)
    if(routeData["error"]) {
      this.error = routeData["error"]
    }
  }
};