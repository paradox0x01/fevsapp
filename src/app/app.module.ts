import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from  'ngx-ui-loader';registerLocaleData(fr);

import {NgZorroAntdModule, NZ_I18N, fr_FR } from 'ng-zorro-antd';
import { GlobalthemesModule } from './globalthemes/globalthemes.module';

// Import shared
import { DashboardComponent } from './dashboard/dashboard.component';
import { VoyagsModule } from './voyags/voyags.module';
import { ExpdtModule } from './expdt/expdt.module';
import { LogistqModule } from './logistq/logistq.module';
import { RapportsModule } from './rapports/rapports.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import {AuthModule} from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    HttpClientModule,
    GlobalthemesModule,
    VoyagsModule,
    ExpdtModule,
    LogistqModule,
    RapportsModule,
    NzBreadCrumbModule,
    SlimLoadingBarModule,
    FlexLayoutModule,
    NzStatisticModule,
    AuthModule,
    AppRoutingModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    { provide: NZ_I18N, useValue: fr_FR }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
