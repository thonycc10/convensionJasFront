import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URL_BACKEND} from '../config/config';

@Injectable()
export class BarrioService {

  // private urlEndPonint: string = 'http://localhost:8080/api/barrio';
  private urlEndPonint: string = URL_BACKEND + 'api/barrio';

  // pasar cabecera
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/josn'});

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Array<any>>(this.urlEndPonint , {
      responseType: 'json',
      observe: 'response'
    });
  }

  distritosByEstaca(idEst) {
    return this.http.get<any>(this.urlEndPonint + '/ByEstaca' + '/' + idEst, {
      responseType: 'json',
      observe: 'response'
    });
  }

}
