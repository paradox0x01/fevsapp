import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import {ExpdtService} from '../../core/expdt.service';
import {Router} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import {concatMap} from 'rxjs/internal/operators/concatMap';


@Component({
  selector: 'app-form-expdt',
  templateUrl: './form-expdt.component.html',
  styleUrls: ['./form-expdt.component.scss']
})
export class FormExpdtComponent implements OnInit {
  constructor(private fb: FormBuilder,
              private expdtService: ExpdtService,
              private router: Router, private message: NzMessageService) { }
  expdtForm: FormGroup;
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


  }
  submitForm(): void {
    this.expdtService.createExpdt(this.expdtForm.value);
    this.message
      .loading('Enregistrement en cours ...', { nzDuration: 2500 })
      .onClose!.pipe(
      concatMap(() => this.message.success('Enregistrement reussi !', { nzDuration: 2500 }).onClose!)
    )
      .subscribe(() => {
        this.expdtForm.reset();
      });

  }
}
