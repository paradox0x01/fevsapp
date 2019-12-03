import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Ant design modules
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
// Ng-Bootstrap Module


// Semantic Ui modules


// PrimeNg modules
import {CalendarModule} from 'primeng/calendar';
import {NzInputModule, NzCardModule, NzTimePickerModule, NzInputNumberModule} from 'ng-zorro-antd';
import {TableModule} from 'primeng/table';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzDatePickerModule,
    NzPageHeaderModule,
    CalendarModule,
    NzLayoutModule,
    NzIconModule,
    NzDropDownModule,
    NzBreadCrumbModule,
    NzStepsModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzCardModule,
    NzTimePickerModule,
    NzInputNumberModule,
    TableModule,
    NgbDropdownModule,
    NzTabsModule,
    NzPopconfirmModule,
    FlexLayoutModule,
    NzSpinModule,
    NzDescriptionsModule,
    ReactiveFormsModule
  ],
  exports: [
    NzDatePickerModule,
    NzPageHeaderModule,
    CalendarModule,
    NzLayoutModule,
    NzIconModule,
    NzDropDownModule,
    NzBreadCrumbModule,
    NzStepsModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzCardModule,
    NzTimePickerModule,
    NzInputNumberModule,
    TableModule,
    NgbDropdownModule,
    NzTabsModule,
    NzPopconfirmModule,
    FlexLayoutModule,
    NzSpinModule,
    NzDescriptionsModule,
    ReactiveFormsModule
  ],
})
export class GlobalthemesModule { }
