import {Component, LOCALE_ID, OnInit} from '@angular/core';
import {Expediteur} from '../../shared/expdt';
import {ExpdtService} from '../../core/expdt.service';
import {Subscription} from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import {ActivatedRoute} from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-table-expdt',
  templateUrl: './table-expdt.component.html',
  styleUrls: ['./table-expdt.component.scss'],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'fr'
  }]
})
export class TableExpdtComponent implements OnInit {
  Expediteur: Expediteur[] = [];
  sub: Subscription;
  constructor(private expdtService: ExpdtService,
              private nzMessageService: NzMessageService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.expdtService.getAllExpdt();
    this.expdtService.expdtCacheRefresher()
      .subscribe((expdt: Expediteur[]) => {
        this.Expediteur = expdt;
      });
    this.sub = this.route.paramMap.subscribe(
      (params) => {
        const id = params.get('id');
      }
    );
  }

  confirm(id: any): void {
    this.expdtService.deleteExpdt(id);
    this.nzMessageService.success('Suppression reussite :-)');
  }

  cancel(): void {
    this.nzMessageService.info('Suppression annulé !');
  }

}
