import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu'; 

@Component({
  selector: 'app-toolbar',
  imports: [MatMenuModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

}
