import { Component, OnInit } from '@angular/core';
import {Voyageur} from '../../shared/voyags';
import {VoyageursService} from '../../core/voyageurs.service';
import { Observable } from 'rxjs';
import {ExpdtService} from '../../core/expdt.service';
import {Expediteur} from '../../shared/expdt';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {RapportsService} from '../../core/rapports.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import {concatMap} from 'rxjs/internal/operators/concatMap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-logistq',
  templateUrl: './add-logistq.component.html',
  styleUrls: ['./add-logistq.component.scss']
})
export class AddLogistqComponent implements OnInit {
  public lastestVoyageurs$: Observable<Voyageur[]>;
  public lastestExpediteur$: Observable<Expediteur[]>;
  public voyageurs$: Observable<Voyageur[]>;
  public expediteurs$: Observable<Expediteur[]>;
  public colisForm: FormGroup;
  constructor(private voyageursService: VoyageursService,
              private rapportsService: RapportsService,
              private expdtrService: ExpdtService,
              private router: Router,
              private message: NzMessageService,
              private fb: FormBuilder
              ) { }

  ngOnInit() {
    this.colisForm = this.fb.group({
      expediteur: ['', Validators.required],
      voyageur: ['', Validators.required],
      jourDepart: ['', Validators.required],
      jourArrivee: null,
      heureArrivee: null,
      status: ['']
    });
    this.lastestVoyageurs$ = this.voyageursService.getLastestVoyageurs();
    this.lastestExpediteur$ = this.expdtrService.getLastestExpediteur();
    this.voyageurs$ = this.voyageursService.getvoyageurs$;
    this.expediteurs$ = this.expdtrService.getexpediteur$;
  }

  onSubmit() {
    if (this.colisForm.valid) {
      this.rapportsService.createColis(this.colisForm.value).subscribe();
      // tslint:disable-next-line:no-non-null-assertion
      this.message
          .loading('Enregistrement en cours ...', { nzDuration: 2500 })
          .onClose!.pipe(
          // tslint:disable-next-line:no-non-null-assertion
          concatMap(() => this.message.success('Enregistrement reussi !', { nzDuration: 2500 }).onClose!)
      )
          .subscribe(() => {
            this.colisForm.reset();
          });
    }
  }

}
