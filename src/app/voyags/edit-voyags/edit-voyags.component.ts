import { Component, OnInit } from '@angular/core';
import {VoyageursService} from '../../core/voyageurs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {concatMap} from 'rxjs/internal/operators/concatMap';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-edit-voyags',
  templateUrl: './edit-voyags.component.html',
  styleUrls: ['./edit-voyags.component.scss']
})
export class EditVoyagsComponent implements OnInit {
  public voyagsForm: FormGroup;
  private subVoyags: Subscription;

  constructor(private voyageursService: VoyageursService,
              private route: Router,
              private message: NzMessageService,
              private router: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.voyagsForm = this.fb.group({
      villeDepart: ['', Validators.required],
      jourDepart: ['', Validators.required],
      villeArrivee: ['', Validators.required],
      jourArrivee: [''],
      typeColis: ['', Validators.required],
      nbreKilo : ['', Validators.required],
      montantVoyageur: ['', Validators.required],
      nom_prenoms: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      addresse: ['', Validators.required],
      email: [''],
      telephone: ['', Validators.required]
    });

    this.subVoyags = this.router.paramMap.subscribe(
        params => {
          const id = params.get('id');
          this.getVoyagsId(id);
        }
    );
  }

  getVoyagsId(id) {
    this.voyageursService.getSingleVoyageur(id).subscribe({next: (voyageur) => this.voyagsForm.patchValue(({
        villeDepart: voyageur.villeDepart,
        jourDepart: voyageur.jourDepart,
        villeArrivee: voyageur.villeArrivee,
        jourArrivee: voyageur.jourArrivee,
        typeColis: voyageur.typeColis,
        nbreKilo : voyageur.nbreKilo,
        montantVoyageur: voyageur.montantVoyageur,
        nom_prenoms: voyageur.nom_prenoms,
        dateNaissance: voyageur.dateNaissance,
        addresse: voyageur.addresse,
        email: voyageur.email,
        telephone: voyageur.telephone
      }))});
  }

  update() {
    if (this.voyagsForm.valid) {
      const id = this.router.snapshot.paramMap.get('id');
      this.voyageursService.updateVoyageur(this.voyagsForm.value, id).subscribe();
        // tslint:disable-next-line:no-non-null-assertion
      this.message
            .loading('Enregistrement en cours ...', { nzDuration: 2500 })
            .onClose!.pipe(
            // tslint:disable-next-line:no-non-null-assertion
            concatMap(() => this.message.success('Modification effectuée avec succès !', { nzDuration: 2500 }).onClose!)
        )
        .subscribe(() => {
          this.voyagsForm.reset();
        })
    }
  }
}
