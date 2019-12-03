import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExpdtComponent } from './expdt/expdt.component';
import {GlobalthemesModule} from '../globalthemes/globalthemes.module';
import {NzTableModule} from 'ng-zorro-antd';

const routes: Routes = [
  {path: 'rapports', component: ExpdtComponent },
];

@NgModule({
  declarations: [
    ExpdtComponent
  ],
  imports: [
    CommonModule,
    GlobalthemesModule,
    RouterModule.forChild(routes),
    NzTableModule
  ]
})
export class RapportsModule { }
