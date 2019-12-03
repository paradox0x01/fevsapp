import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from './core/auth.guard';
import { FlexLayoutModule } from '@angular/flex-layout';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  declarations: [
  ],
  imports: [
    FlexLayoutModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule, FlexLayoutModule]
})
export class AppRoutingModule { }
