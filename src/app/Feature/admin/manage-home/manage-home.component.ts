import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manage-home',
  imports: [RouterLink,RouterLinkActive, RouterOutlet],
  templateUrl: './manage-home.component.html',
  styleUrl: './manage-home.component.css'
})
export class ManageHomeComponent {

}
