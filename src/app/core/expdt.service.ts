import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject, Observable} from 'rxjs';
import {Expediteur} from '../shared/expdt';
import {map, tap} from 'rxjs/operators';
import {EnvUrl} from '../shared/envUrl';


@Injectable({
  providedIn: 'root'
})
export class ExpdtService {
  constructor(private http: HttpClient) { }
  // Constantes
  private expdtCache = new Subject<Expediteur[]>();
  private Expediteurs: Expediteur[] = [];
  headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});

  getexpediteur$ = this.http.get<Expediteur[]>(`${EnvUrl.expdtAPI}`, {headers: this.headers});

  // TODO get all expediteurs
  getAllExpdt() {
    this.http.get<Expediteur[]>(EnvUrl.expdtAPI)
      .pipe(map(expediteurs =>
      expediteurs.map(expediteur => {
        return {...expediteur};
      })
      )).subscribe((expediteurs: Expediteur[]) => {
        this.Expediteurs = expediteurs;
        this.expdtCache.next([...this.Expediteurs]);
    });
  }

  expdtCacheRefresher(): Observable<Expediteur[]> {
    return this.expdtCache.asObservable();
  }

  // TODO Get single expediteur


  // TODO Create expediteur
  createExpdt(expdt: Expediteur) {
    const createApi = `${EnvUrl.expdtAPI}/add`;
    this.http.post<Expediteur>(createApi, expdt, {headers: this.headers})
      .subscribe(() => {
        this.expdtCache.next([...this.Expediteurs, expdt]);
      });
  }

  // TODO Delete expediteur
  deleteExpdt(id) {
    const delApi = `${EnvUrl.expdtAPI}/delete/${id}`;
    this.http.delete<Expediteur>(delApi, {headers: this.headers})
      .subscribe( () => {
        this.Expediteurs = this.Expediteurs.filter((expediteur) => expediteur._id !== id) ;
        this.expdtCache.next([...this.Expediteurs]);
      });
  }

  // TODO Update expediteur
  updateExpdt(id: string, expdt: Expediteur) {
    const updApi = `${EnvUrl.expdtAPI}/update/${id}`;
    return this.http.put<Expediteur>(updApi, expdt, {headers: this.headers});
  }

  // TODO get single expediteur
  getSingleExpd(id: any) {
    return this.http.get<Expediteur>(`${EnvUrl.expdtAPI}/${id}`, {headers: this.headers})
        .pipe(map((expediteur) => ({
              ...expediteur,
              jourDepart: new Date(expediteur.jourDepart),
              jourArrivee: new Date(expediteur.jourArrivee),
              dateNaissance: new Date(expediteur.dateNaissance)
            })
        )).pipe(tap((expediteur: Expediteur) => ({
            ...expediteur
            })
        ));
  }

  getLastestExpediteur(): Observable<Expediteur[]> {
    return this.http.get<Expediteur[]>(`${EnvUrl.expdtAPI}/recents/list`);
  }
}
