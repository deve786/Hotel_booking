import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  baseUrl = 'http://localhost:5000'; // Update this to your backend base URL
  @Input() hotel: any;
  getImageUrl(photoPath: string): string {
    return `${this.baseUrl}/${photoPath}`;
  }
 
  ngInit() {

  }

}
