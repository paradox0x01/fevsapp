import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Expediteur} from "../shared/expdt";
import {EnvUrl} from "../shared/envUrl";
import {Voyageur} from "../shared/voyags";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
  constructor(private http: HttpClient) { }

  // Get count expediteurs
  getCountExpediteur(moment): Observable<{Day: Expediteur[], Count: Number}> {
    return this.http.get<{Day: Expediteur[], Count: Number}>(`${EnvUrl.expdtAPI}/report/${moment}`, {headers: this.headers})
  }

  // Get count voyageurs
  getCountVoyageur(moment): Observable<{Day: Voyageur[], Count: Number}> {
    return this.http.get<{Day: Voyageur[], Count: Number}>(`${EnvUrl.voyagsAPI}/report/${moment}`, {headers: this.headers})
  }

}
