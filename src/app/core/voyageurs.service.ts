import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Voyageur} from "../shared/voyags";
import { Observable, Subject } from 'rxjs';
import {EnvUrl} from '../shared/envUrl';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VoyageursService {
  private voyageurSubject = new Subject<Voyageur[]>();
  private voyageurs: Voyageur[] = [];
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  //  Get all voyageurs
  getAllVoyageurs(): Observable<Voyageur[]> {
    return this.http.get<Voyageur[]>(EnvUrl.voyagsAPI, {headers: this.headers})
        .pipe(map((voyageurs: Voyageur[]) => voyageurs.map(
            voyageur => {
              return {...voyageur}
            }
        )))
        .pipe(tap((voyageur: Voyageur[]) => {
          this.voyageurs = voyageur;
          this.voyageurSubject.next([...this.voyageurs])
        }));
  }
  //  Get single voyageur
  getSingleVoyageur(id: string): Observable<Voyageur> {
    return this.http.get<Voyageur>(`${EnvUrl.voyagsAPI}/${id}`, {headers: this.headers})
        .pipe(map(voyageur => ({
            ...voyageur,
            jourDepart: new Date(voyageur.jourDepart),
            jourArrivee: new Date(voyageur.jourArrivee),
            dateNaissance: new Date(voyageur.dateNaissance)
            })
        ))
  }

  // Update expediteur
    updateVoyageur(voyageur: Voyageur, id): Observable<Voyageur> {
      return this.http.put<Voyageur>(`${EnvUrl.voyagsAPI}/update/${id}`, voyageur, {headers: this.headers})
          .pipe(tap(() => {
              this.voyageurSubject.next([...this.voyageurs, voyageur]);
          }));
    }

  //  Create voyageur
   addVoyageur(voyageur: Voyageur) {
      return this.http.post<Voyageur>(`${EnvUrl.voyagsAPI}/add`, voyageur, {headers: this.headers})
          .pipe(tap(() => {
              this.voyageurSubject.next([...this.voyageurs, voyageur]);
          }));
   }

  // delete voyageur
    delVoyageur(id) {
      return this.http.delete<Voyageur>(`${EnvUrl.voyagsAPI}/delete/${id}`)
          .pipe(tap(() => {
              this.voyageurs = this.voyageurs.filter((voyageur) => voyageur._id !== id);
              this.voyageurSubject.next([...this.voyageurs]);
          }))}

  // todo voyageur refresh
  getSubjectVoyageurRefresh() {
    return this.voyageurSubject.asObservable();
  }

  // Get lastest voyageurs
    getLastestVoyageurs(): Observable<Voyageur[]> {
      return this.http.get<Voyageur[]>(`${EnvUrl.voyagsAPI}/recents/list`);
    }

    getvoyageurs$ = this.http.get<Voyageur[]>(`${EnvUrl.voyagsAPI}`, {headers: this.headers});
}
