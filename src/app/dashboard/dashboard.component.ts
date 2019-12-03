import {Component, OnInit, OnDestroy, LOCALE_ID} from '@angular/core';
import {DashboardService} from '../core/dashboard.service';
import { Subscription, Observable } from 'rxjs';
import * as moment from 'moment';
import { Colis } from '../shared/colis';
import {RapportsService} from '../core/rapports.service';
import {NzMessageService} from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
    providers: [{
        provide: LOCALE_ID,
        useValue: 'fr'
    }]
})
export class DashboardComponent implements OnInit, OnDestroy {
  // Binding constante
  public totalColis: Number;
  public voyageur: Number;
  public expediteur: Number;

  // Subscriptors
  private subTotalColis: Subscription;
  private subVoyageur: Subscription;
  private subExpediteur: Subscription;
  public LivraisonEncours: Subscription;
  public listColis$: Observable<Colis[]>;
  private subListColis: Subscription;
  public enCours: Number;
  // Others
  private dateNow = new Date();
  public moment = moment(this.dateNow).startOf("day").format();
  constructor(private dashboardService: DashboardService,
              private nzMessageService: NzMessageService,
              private rapportsService: RapportsService) { }

  ngOnInit() {
    // Get count total colis today
      this.subListColis  = this.rapportsService.getColis().subscribe();
      this.listColis$ = this.rapportsService.getColisRefresher();
      this.LivraisonEncours = this.rapportsService.getLivraisonEnCours()
          .subscribe((livraison) => {
              this.enCours = livraison.length;
          });
      console.log(this.moment);
      this.subTotalColis = this.dashboardService.getCountVoyageur(this.moment)
        .subscribe((voyageur) => {
          this.totalColis = voyageur.Count;
          console.log('Total colis: ', this.totalColis);
        });

      this.subVoyageur = this.dashboardService.getCountVoyageur(this.moment)
        .subscribe((voyageur) => {
          this.voyageur = voyageur.Count;
          console.log('Total voyageur: ', this.voyageur);
        });

      this.subExpediteur = this.dashboardService.getCountExpediteur(this.moment)
        .subscribe((expediteur) => {
          console.log(expediteur);
          this.expediteur = expediteur.Count;
          console.log('Total expéditeur: ', this.expediteur);
        });
  }

    confirm(id) {
      this.rapportsService.delColis(id).subscribe();
      this.nzMessageService.success('Suppression reussite :-)');
    }

    cancel(): void {
        this.nzMessageService.info('Suppression annulé !');
    }

  ngOnDestroy(): void {
    this.subTotalColis.unsubscribe();
    this.subExpediteur.unsubscribe();
    this.subVoyageur.unsubscribe();
  }

}
