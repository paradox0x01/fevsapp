import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VoyageursService} from '../../core/voyageurs.service';
import { Router } from '@angular/router';
import {concatMap} from 'rxjs/internal/operators/concatMap';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-form-voyags',
  templateUrl: './form-voyags.component.html',
  styleUrls: ['./form-voyags.component.scss']
})
export class FormVoyagsComponent implements OnInit {
  constructor(private fb: FormBuilder,
              private router: Router,
              private message: NzMessageService,
              private voyageursService: VoyageursService ) { }
  voyagsForm: FormGroup;

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
  }

  submitForm(): void {
      this.voyageursService.addVoyageur(this.voyagsForm.value).subscribe();
      this.message
          .loading('Enregistrement en cours ...', { nzDuration: 2500 })
          .onClose!.pipe(
          // tslint:disable-next-line:no-non-null-assertion
          concatMap(() => this.message.success('Enregistrement reussi !', { nzDuration: 2500 }).onClose!)
      ).subscribe(() => {
        this.voyagsForm.reset();
      });
  }
}
