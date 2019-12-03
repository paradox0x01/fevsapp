import {Component, LOCALE_ID, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ExpdtService} from '../../core/expdt.service';
import { Subscription } from 'rxjs';
import {Expediteur} from '../../shared/expdt';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-view-expdt',
  templateUrl: './view-expdt.component.html',
  styleUrls: ['./view-expdt.component.scss'],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'fr'
  }]
})
export class ViewExpdtComponent implements OnInit {
  private subExpdt: Subscription;
  public expediteur: Expediteur;
  constructor(private router: ActivatedRoute, private expdtService: ExpdtService) { }

  ngOnInit() {
    this.subExpdt = this.router.paramMap.subscribe(
        params => {
          const id = params.get('id');
          this.getExpdt(id);
        }
    );
  }

  getExpdt(id) {
    this.expdtService.getSingleExpd(id).subscribe({next:
          (expediteur) => this.expediteur = expediteur})
  }
}
