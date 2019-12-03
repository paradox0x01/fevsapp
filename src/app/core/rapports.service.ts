import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Colis } from '../shared/colis';
import {EnvUrl} from '../shared/envUrl';
import { map, tap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapportsService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private colisSubject = new Subject<Colis[]>();
  private Colis: Colis[] = [];
  constructor(private http: HttpClient) {
  }

  // Get all colis
  getColis(): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${EnvUrl.colisAPI}`, {headers: this.headers})
        .pipe(map((colis: Colis[]) => colis.map(colis => {
          return {...colis};
        })))
        .pipe(tap(colis => {
          this.Colis = colis;
          this.colisSubject.next([...this.Colis]);
        } ));
  }

  // remove colis
  delColis(id: string) {
    return this.http.delete<Colis>(`${EnvUrl.colisAPI}/${id}/delete`)
        .pipe(tap(() => {
          this.Colis = this.Colis.filter((colis) => colis._id !== id);
          this.colisSubject.next([...this.Colis]);
        }));
  }


  getSingleColis(id: string)  {
    return this.http.get<Colis>(`${EnvUrl.colisAPI}/${id}`, {headers: this.headers})
        .pipe(map((colis: Colis) => ({
          ...colis,
          jourDepart: new Date(colis.jourDepart),
          jourArrivee: new Date(colis.jourArrivee),
          heureArrivee: new Date(colis.heureArrivee)
        }))

        ).pipe(tap((colis: Colis) =>  ({
          ...colis  
        })));
  }

  getLivraisonEnCours(): Observable<Colis[]> {
      return this.http.get<Colis[]>(`${EnvUrl.colisAPI}`, {headers: this.headers})
          .pipe(map((colis: Colis[]) => colis.filter(coli => coli.status === 'En cours')));
  }

  updateColis(id: string, colis: Colis): Observable<Colis> {
    return this.http.put<Colis>(`${EnvUrl.colisAPI}/${id}/update`, colis, {headers: this.headers})
    }

  createColis(colis: Colis): Observable<Colis>  {
      return this.http.post<Colis>(`${EnvUrl.colisAPI}/add`, colis)
          .pipe(tap(() => {
              this.colisSubject.next([...this.Colis, colis]);
          }));
  }

  getColisRefresher() {
    return this.colisSubject.asObservable();
  }

}
