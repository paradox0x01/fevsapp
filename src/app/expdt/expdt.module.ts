import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TableExpdtComponent } from './table-expdt/table-expdt.component';
import { FormExpdtComponent } from './form-expdt/form-expdt.component';
import {GlobalthemesModule} from '../globalthemes/globalthemes.module';
import {NgZorroAntdModule, NzMessageModule} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';
import { EditExpdtComponent } from './edit-expdt/edit-expdt.component';
import { ViewExpdtComponent } from './view-expdt/view-expdt.component';
import {AuthGuard} from '../core/auth.guard';

const routes: Routes = [
  {path: 'formexpediteur', component: FormExpdtComponent, canActivate: [AuthGuard]},
  {path:  'tablexpediteur', component: TableExpdtComponent, canActivate: [AuthGuard]},
  {path: 'expdt/:id/edit', component: EditExpdtComponent, canActivate: [AuthGuard]},
  {path: 'expdt/:id', component: ViewExpdtComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    FormExpdtComponent,
    TableExpdtComponent,
    EditExpdtComponent,
    ViewExpdtComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GlobalthemesModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    NzMessageModule
  ]
})
export class ExpdtModule { }
