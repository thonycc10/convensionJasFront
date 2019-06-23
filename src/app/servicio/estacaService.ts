import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';
import {Participante} from '../model/participante';
import {map} from 'rxjs/operators';

@Injectable()
export class EstacaService {

  private urlEndPonint: string = 'http://localhost:8080/api/estaca';

  // pasar cabecera
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/josn'});

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Array<any>>(this.urlEndPonint , {
      responseType: 'json',
      observe: 'response'
    });
  }

  listBarriosByEstaca(idEst) {
    return this.http.get<Array<any>>(this.urlEndPonint + '/' + idEst, {
      responseType: 'json',
      observe: 'response'
    });
  }

}
