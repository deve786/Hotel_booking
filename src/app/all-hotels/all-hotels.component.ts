import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../allServices/api-services.service';

@Component({
  selector: 'app-all-hotels',
  templateUrl: './all-hotels.component.html',
  styleUrls: ['./all-hotels.component.css']
})
export class AllHotelsComponent implements OnInit {
  hotels = [];
  filteredHotels = [];
  
  searchTerm: string = '';
  sortBy: string = ''; 
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(private as: ApiServicesService) { }

  ngOnInit() {
    this.getHotels();
  }

  getHotels() {
    this.as.getHotels().subscribe({
      next: (result: any) => {
        // console.log(result);
        this.hotels = result;
        // this.filteredHotels = [...this.hotels]; // Initialize filteredHotels
        // this.applyFilters(); // Apply filters after fetching hotels
      },
      error: (err) => {
        console.error('Error fetching hotels:', err);
      }
    });
  }

  get paginatedHotels() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredHotels.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.filteredHotels.length / this.itemsPerPage);
  }

  // // applyFilters() {
  // //   // Filter by search term
  // //   this.filteredHotels = this.hotels.filter(hotel =>
  // //     hotel.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  // //   );

  //   // Sort based on the selected sort option
  //   this.sortHotels();

  //   // Paginate after applying filters and sorting
  //   this.setPage(1);
  // }

  // sortHotels() {
  //   if (this.sortBy === 'name') {
  //     this.filteredHotels.sort((a, b) => a.name.localeCompare(b.name));
  //   } else if (this.sortBy === 'priceAsc') {
  //     this.filteredHotels.sort((a, b) => a.price - b.price);
  //   } else if (this.sortBy === 'priceDesc') {
  //     this.filteredHotels.sort((a, b) => b.price - a.price);
  //   } else if (this.sortBy === 'rating') {
  //     this.filteredHotels.sort((a, b) => b.rating - a.rating);
  //   }
  // }

  setPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
