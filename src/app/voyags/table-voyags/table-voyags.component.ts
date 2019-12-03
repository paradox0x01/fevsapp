import {Component, LOCALE_ID, OnInit} from '@angular/core';
import {Voyageur} from '../../shared/voyags';
import { Subscription, Observable } from 'rxjs';
import {VoyageursService} from '../../core/voyageurs.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-table-voyags',
  templateUrl: './table-voyags.component.html',
  styleUrls: ['./table-voyags.component.scss'],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'fr'
  }]
})
export class TableVoyagsComponent implements OnInit {
  public voyageurs$: Observable<Voyageur[]>;
  private subVoyags: Subscription;
  constructor(private voyageursService: VoyageursService, private nzMessageService: NzMessageService) { }

  ngOnInit() {
    this.subVoyags = this.voyageursService.getAllVoyageurs().subscribe();
    this.voyageurs$ = this.voyageursService.getSubjectVoyageurRefresh();
  }
  confirm(id) {
    this.voyageursService.delVoyageur(id).subscribe();
    this.nzMessageService.success('Suppression reussite :-)');
  }

  cancel(): void {
    this.nzMessageService.info('Suppression annulé !');
  }
}
