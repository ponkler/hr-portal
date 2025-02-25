import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navcard',
  imports: [RouterModule],
  templateUrl: './navcard.component.html',
  styleUrl: './navcard.component.css'
})
export class NavcardComponent {
  @Input() cardText : string = "";
  @Input() cardLink : string = "";
  @Input() cardBgImageClass : string = "";
}
