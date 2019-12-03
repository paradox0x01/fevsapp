import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {GlobalthemesModule} from '../globalthemes/globalthemes.module';
import {NzButtonModule, NzInputModule} from 'ng-zorro-antd';

const route: Routes = [
  {path: 'login', component: LoginComponent},
];



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzInputModule,
    GlobalthemesModule,
    RouterModule.forChild(route),
  ]
})
export class AuthModule { }
