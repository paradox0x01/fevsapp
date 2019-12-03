import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {concatMap} from 'rxjs/operators';
import {ExpdtService} from '../../core/expdt.service';
import {Router, ActivatedRoute} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-edit-expdt',
  templateUrl: './edit-expdt.component.html',
  styleUrls: ['./edit-expdt.component.scss']
})
export class EditExpdtComponent implements OnInit {
  constructor(private fb: FormBuilder,
              private message: NzMessageService,
              private expdtService: ExpdtService,
              private route: ActivatedRoute,
              private router: Router) { }
  expdtForm: FormGroup;
  private subExpdt: Subscription;

  ngOnInit() {
    this.expdtForm = this.fb.group({
      villeDepart: ['', Validators.required],
      jourDepart: ['', Validators.required],
      villeArrivee: ['', Validators.required],
      jourArrivee: [''],
      typeColis: ['', Validators.required],
      nbreKilo : ['', Validators.required],
      montantExpediteur: ['', Validators.required],
      nom_prenoms: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      addresse: ['', Validators.required],
      email: [''],
      telephone: ['', Validators.required]
    });
    this.subExpdt = this.route.paramMap.subscribe(
        params => {
          const id = params.get('id');
          this.getExpdtId(id);
        }
    );
  }

  getExpdtId(id) {
    this.expdtService.getSingleExpd(id).subscribe({next: (expediteur) => this.expdtForm.patchValue(({
        villeDepart: expediteur.villeDepart,
        jourDepart: expediteur.jourDepart,
        villeArrivee: expediteur.villeArrivee,
        jourArrivee: expediteur.jourArrivee,
        typeColis: expediteur.typeColis,
        nbreKilo : expediteur.nbreKilo,
        montantExpediteur: expediteur.montantExpediteur,
        nom_prenoms: expediteur.nom_prenoms,
        dateNaissance: expediteur.dateNaissance,
        addresse: expediteur.addresse,
        email: expediteur.email,
        telephone: expediteur.telephone
      }))});
  }
  submitForm(): void {
      const id = this.route.snapshot.paramMap.get('id');
      this.expdtService.updateExpdt(id, this.expdtForm.value).subscribe();
      // tslint:disable-next-line:no-non-null-assertion
      this.message
      .loading('Enregistrement en cours ..', { nzDuration: 2500 })
      .onClose!.pipe(
          // tslint:disable-next-line:no-non-null-assertion
      concatMap(() => this.message.success('Modification effectuée avec succès !', { nzDuration: 2500 }).onClose!)
    )
      .subscribe(() => {
        this.expdtForm.reset();
      });
  }
}
