import { Component } from '@angular/core';
import { ApiServicesService } from '../allServices/api-services.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent {
  hotels:any=[]
  baseUrl = 'http://localhost:5000';
  constructor(private as:ApiServicesService){}

  ngOnInit(){
    this.getThreeRandomHotels()
  }
  getImageUrl(photoPath: string): string {
    return `${this.baseUrl}/${photoPath}`;
  }
  getThreeRandomHotels(): void {
    this.as.getHotels().subscribe((hotel: any) => {
      this.hotels = this.shuffleArray(hotel).slice(0, 3);
      // console.log(this.hotels);
      
    });
  }

  shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
