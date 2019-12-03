import {Component, LOCALE_ID, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {VoyageursService} from '../../core/voyageurs.service';
import { Voyageur } from 'src/app/shared/voyags';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-view-voyags',
  templateUrl: './view-voyags.component.html',
  styleUrls: ['./view-voyags.component.scss'],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'fr'
  }]
})
export class ViewVoyagsComponent implements OnInit {
  private subVoyags: Subscription;
  public voyags: Voyageur;
  constructor(private router: ActivatedRoute, private voyageursService: VoyageursService) { }

  ngOnInit() {
    this.subVoyags = this.router.paramMap.subscribe(
        params => {
          const id = params.get('id');
          this.getVoyagsId(id);
        }
    );
  }

  getVoyagsId(id) {
    this.voyageursService.getSingleVoyageur(id).subscribe({next:
          (voyageur) => this.voyags = voyageur})
  }

}
