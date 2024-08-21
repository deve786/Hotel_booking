import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllHotelsComponent } from './all-hotels/all-hotels.component';
import { SingleHotelComponent } from './single-hotel/single-hotel.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component'; // Import UserDashboardComponent
import { CurrentBookingsComponent } from './current-bookings/current-bookings.component'; // Import CurrentBookingsComponent
import { PastBookingsComponent } from './past-bookings/past-bookings.component'; // Import PastBookingsComponent

import { ManageUserComponent } from './manage-user/manage-user.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserMangementComponent } from './user-mangement/user-mangement.component';
import { HotelMangementComponent } from './hotel-mangement/hotel-mangement.component';
import { ManagementBookingsComponent } from './management-bookings/management-bookings.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hotels', component: AllHotelsComponent },
  { path: 'hotel/:id', component: SingleHotelComponent },
  { path: 'login', component: AuthenticationComponent },
  {
    path: 'dashboard',
    component: SidebarComponent,canActivate: [UserGuard],
    children: [
      { path: 'current-bookings', component: CurrentBookingsComponent },
      { path: 'past-bookings', component: PastBookingsComponent },
      { path: 'personal-details', component: ManageUserComponent },
      { path: 'user', component: UserDashboardComponent },
      { path: '', redirectTo: 'current-bookings', pathMatch: 'full' }  // Default route within dashboard
    ]
  },
  {
    path: 'admin', component: AdminSidebarComponent,canActivate: [AdminGuard],
    children: [
      { path: 'user-management', component: UserMangementComponent },
      { path: 'hotel-management', component: HotelMangementComponent },
      { path: 'manage-bookings', component: ManagementBookingsComponent },
      { path: 'edit-hotel/:id', component: EditHotelComponent },
      { path: 'add', component: AddHotelComponent },
      { path: '', redirectTo: 'user-management', pathMatch: 'full' }  // Default route
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
