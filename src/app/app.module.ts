import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BannerComponent } from './banner/banner.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';
import { HotelsComponent } from './hotels/hotels.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { AllHotelsComponent } from './all-hotels/all-hotels.component';
import { SingleHotelComponent } from './single-hotel/single-hotel.component';
import { AuthenticationComponent } from './authentication/authentication.component';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CurrentBookingsComponent } from './current-bookings/current-bookings.component';
import { PastBookingsComponent } from './past-bookings/past-bookings.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminComponent } from './admin/admin.component';
import { UserMangementComponent } from './user-mangement/user-mangement.component';

import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { HotelMangementComponent } from './hotel-mangement/hotel-mangement.component';
import { ManagementBookingsComponent } from './management-bookings/management-bookings.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { HttpClientModule } from '@angular/common/http';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BannerComponent,
    FooterComponent,
    CardComponent,
    HotelsComponent,
    HomeComponent,
    ServicesComponent,
    AllHotelsComponent,
    SingleHotelComponent,
    AuthenticationComponent,
    UserDashboardComponent,
    CurrentBookingsComponent,
    PastBookingsComponent,
    ManageUserComponent,
    SidebarComponent,
    AdminComponent,
    UserMangementComponent,
    AdminSidebarComponent,
    HotelMangementComponent,
    ManagementBookingsComponent,
    AddHotelComponent,
    EditHotelComponent,
    AnalyticsComponent,
    AboutComponent,
    ContactComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPayPalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
