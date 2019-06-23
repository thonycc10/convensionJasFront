import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class DistritoService {

  private urlEndPonint: string = 'http://localhost:8080/api/distrito';

  // pasar cabecera
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/josn'});

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Array<any>>(this.urlEndPonint , {
      responseType: 'json',
      observe: 'response'
    });
  }

  validarCupo(idDist, idEst) {
    return this.http.get<any>(this.urlEndPonint + '/' + idDist + '/' + idEst, {
      responseType: 'json',
      observe: 'response'
    });
  }

}
