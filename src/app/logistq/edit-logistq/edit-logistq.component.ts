import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Voyageur} from '../../shared/voyags';
import {Expediteur} from '../../shared/expdt';
import {VoyageursService} from '../../core/voyageurs.service';
import {RapportsService} from '../../core/rapports.service';
import {ExpdtService} from '../../core/expdt.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-logistq',
  templateUrl: './edit-logistq.component.html',
  styleUrls: ['./edit-logistq.component.scss']
})
export class EditLogistqComponent implements OnInit {
  public colisForm: FormGroup;
  public voyageurs$: Observable<Voyageur[]>;
  public expediteurs$: Observable<Expediteur[]>;
  public subLogistiq: Subscription;
  constructor(
      private voyageursService: VoyageursService,
      private rapportsService: RapportsService,
      private expdtrService: ExpdtService,
      private route: ActivatedRoute,
      private router: Router,
      private message: NzMessageService,
      private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.colisForm = this.fb.group({
      expediteur: ['', Validators.required],
      voyageur: ['', Validators.required],
      jourDepart: ['', Validators.required],
      jourArrivee: [''],
      heureArrivee: null,
      status: ['']
    });

    this.subLogistiq = this.route.paramMap.subscribe(
        params => {
          const id = params.get('id');
          this.getLogistiq(id)
        }
    );
    this.voyageurs$ = this.voyageursService.getvoyageurs$;
    this.expediteurs$ = this.expdtrService.getexpediteur$;
  }

  getLogistiq(id) {
    this.rapportsService.getSingleColis(id).subscribe({
      next: (colis) => this.colisForm.patchValue({
        expediteur: colis.expediteur,
        voyageur: colis.voyageur,
        jourDepart: colis.jourDepart,
        jourArrivee: colis.jourArrivee,
        heureArrivee: colis.heureArrivee,
        status: colis.status
      })
    });
  }

  update() {
     
      const id = this.route.snapshot.paramMap.get('id');
      this.rapportsService.updateColis(id, this.colisForm.value).subscribe();
      this.message
      .loading('Enregistrement en cours ..', { nzDuration: 2500 })
      .onClose!.pipe(
      concatMap(() => this.message.success('Modification effectuée avec succès !', { nzDuration: 2500 }).onClose!)
    )
      .subscribe(() => {
        this.colisForm.reset();
      });
  }
}
