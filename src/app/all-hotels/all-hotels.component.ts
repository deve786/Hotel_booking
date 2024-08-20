import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-hotels',
  templateUrl: './all-hotels.component.html',
  styleUrls: ['./all-hotels.component.css']
})
export class AllHotelsComponent implements OnInit {
  hotels = [
    { id: 1, name: "Stay Home", location: "Kochi, Kerala", rating: 4.5, price: 200, image: "assets/photo2.jpg" },
    { id: 2, name: "Urban Retreat", location: "New York, NY", rating: 4.8, price: 350, image: "assets/photo3.jpg" },
    { id: 3, name: "Beachside Bliss", location: "Malibu, CA", rating: 4.7, price: 450, image: "assets/photo4.webp" },
    { id: 4, name: "Mountain Escape", location: "Aspen, CO", rating: 4.9, price: 300, image: "assets/photo5.webp" },
    { id: 5, name: "City Lights Hotel", location: "San Francisco, CA", rating: 4.6, price: 275, image: "assets/photo6.jpeg" },
    { id: 6, name: "Luxury Suite", location: "Paris, France", rating: 4.8, price: 500, image: "assets/photo7.avif" },
    { id: 7, name: "Cozy Corner", location: "Tokyo, Japan", rating: 4.4, price: 220, image: "assets/photo8.webp" },
    { id: 8, name: "Ocean View Retreat", location: "Miami, FL", rating: 4.7, price: 350, image: "assets/photo9.webp" },
    { id: 9, name: "Historic Charm", location: "Rome, Italy", rating: 4.6, price: 275, image: "assets/photo10.jpg" },
    { id: 10, name: "Modern Oasis", location: "Los Angeles, CA", rating: 4.5, price: 290, image: "assets/photo2.jpg" }
  ];

  currentPage: number = 1;
  itemsPerPage: number = 8;

  get paginatedHotels() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.hotels.slice(start, end);
  }

  ngOnInit() {
    // Initialization code if needed
  }

  setPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get totalPages() {
    return Math.ceil(this.hotels.length / this.itemsPerPage);
  }
}
