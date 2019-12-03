import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableVoyagsComponent } from './table-voyags/table-voyags.component';
import { RouterModule, Routes } from '@angular/router';
import { FormVoyagsComponent } from './form-voyags/form-voyags.component';
import {GlobalthemesModule} from '../globalthemes/globalthemes.module';
import {NgZorroAntdModule, NzButtonModule} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';
import { ViewVoyagsComponent } from './view-voyags/view-voyags.component';
import { EditVoyagsComponent } from './edit-voyags/edit-voyags.component';
import {AuthGuard} from '../core/auth.guard';

const routes: Routes = [
  {path: 'formsvoyag', component: FormVoyagsComponent, canActivate: [AuthGuard]},
  {path: 'tablevoyags', component: TableVoyagsComponent, canActivate: [AuthGuard]},
  {path: 'voyags/:id', component: ViewVoyagsComponent, canActivate: [AuthGuard]},
  {path: 'voyags/:id/edit', component: EditVoyagsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    FormVoyagsComponent,
    TableVoyagsComponent,
    ViewVoyagsComponent,
    EditVoyagsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GlobalthemesModule,
    NzButtonModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ]
})
export class VoyagsModule { }
