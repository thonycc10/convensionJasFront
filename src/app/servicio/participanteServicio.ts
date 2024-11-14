import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Participante} from '../model/participante';
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

  listDistritosByDocAndEstaca(doc, est, isGuest) {
    return this.http.get<any>(this.urlEndPonint + '/districts/' + doc + '/' + est + '/' + isGuest , {
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
      fechaNacimiento: participante.fechaNacimiento != null ? moment(participante.fechaNacimiento, 'YYYYMMDD').format('YYYY-MM-DD') : null,
      distrito: {
        id: participante.idDistrito
      },
      estaca: {
        id: participante.idEstaca[0]
      },
      barrio: {
        id: participante.idBarrio
      },
      priesthood: participante.priesthood,
      recommendExpires: participante.recommendExpires != null ? moment(participante.recommendExpires, 'YYYYMMDD').format('YYYY-MM-DD') : null,
      mission: participante.mission,
      skills: participante.skills,
      hasRecomend: participante.hasRecomend
    };
    return this.http.post<any>(this.urlEndPonint,  body, {
      responseType: 'json',
      observe: 'response'
    });
  }

  participants(idEstaca, idBarrio, idDistrito) {
    return this.http.get<any>(this.urlEndPonint + '/' + idEstaca + '/' + idBarrio + '/' + idDistrito , {
      responseType: 'json',
      observe: 'response'
    });
  }
}
