import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLogistqComponent } from './add-logistq/add-logistq.component';
import { RouterModule, Routes,  } from '@angular/router';
import {GlobalthemesModule} from '../globalthemes/globalthemes.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import {NgZorroAntdModule, NzButtonModule} from 'ng-zorro-antd';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ReactiveFormsModule } from '@angular/forms';
import {EditLogistqComponent} from "./edit-logistq/edit-logistq.component";
import {AuthGuard} from '../core/auth.guard';

const routes: Routes = [
  {path: 'addlogistiq', component: AddLogistqComponent, canActivate: [AuthGuard]},
  {path: 'logistiq/:id/edit', component: EditLogistqComponent, canActivate: [AuthGuard]}
  ];

@NgModule({
  declarations: [
    AddLogistqComponent,
    EditLogistqComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GlobalthemesModule,
    NzTableModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzDividerModule,
    NgZorroAntdModule,
  ]
})
export class LogistqModule { }
