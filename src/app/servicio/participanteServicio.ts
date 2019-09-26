import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';
import {Participante} from '../model/participante';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import {URL_BACKEND} from '../config/config';

@Injectable()
export class ParticipanteServicio {

  private urlEndPonint: string = URL_BACKEND + 'api/participante';

 // pasar cabecera
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/josn'});

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Array<any>>(this.urlEndPonint , {
      responseType: 'json',
      observe: 'response'
    });
  }

  listDistritosByDocAndEstaca(doc, est) {
    return this.http.get<any>(this.urlEndPonint + '/' + doc + '/' + est , {
      responseType: 'json',
      observe: 'response'
    });
  }

  create(participante: Participante) {
    const body = {
      nombre: participante.nombre,
      miembro: participante.miembro,
      telefono: participante.telefono,
      nombreRef: participante.nombreRef,
      telefonoRef: participante.telefonoRef,
      documento: participante.documento,
      sexo: participante.sexo,
      correo: participante.correo,
      fechaNacimiento: moment(participante.fechaNacimiento, 'YYYYMMDD').format('YYYY-MM-DD'),
      distrito: {
        id: participante.idDistrito
      },
      estaca: {
        id: participante.idEstaca[0]
      },
      barrio: {
        id: participante.idBarrio
      }
    };
    return this.http.post<any>(this.urlEndPonint,  body, {
      responseType: 'json',
      observe: 'response'
    });
  }
}
