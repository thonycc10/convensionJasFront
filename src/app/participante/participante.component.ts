import { Component, OnInit } from '@angular/core';
import {Participante} from '../model/participante';
import {EstacaService} from '../servicio/estacaService';
import {ParticipanteServicio} from '../servicio/participanteServicio';
import {ActivatedRoute, Router, Routes} from '@angular/router';
import swal from 'sweetalert2';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DistritoService} from '../servicio/distritoService';
import {BarrioService} from '../servicio/barrioService';
import * as moment from 'moment'
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-participante',
  templateUrl: './participante.component.html',
  styleUrls: ['./participante.component.css'],
  animations: [
    trigger('animation', [
      state('visible', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('void => *', [
        style({transform: 'translateX(50%)', opacity: 0}),
        animate('300ms ease-out')
      ]),
      transition('* => void', [
        animate(('250ms ease-in'), style({
          height: 0,
          opacity: 0,
          transform: 'translateX(50%)'
        }))
      ])
    ])
  ],
})
export class ParticipanteComponent implements OnInit {
  participante: Participante;
  estacas: any[];
  existe: boolean = false;
  viewIngreso: boolean = true;

  listDistritos: any[];
  listBarrios: any[];
  viewDistrito: boolean = false;

  viewForm: boolean = false;

  items: any[];
  value: Date;

  es = {
    firstDayOfWeek: 1,
    dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
    dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
    dayNamesMin: [ "D","L","M","X","J","V","S" ],
    monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
    monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
    today: 'Hoy',
    clear: 'Borrar'
  }

  constructor(
    public estacaService: EstacaService,
    public participanteServicio: ParticipanteServicio,
    public  distritoService: DistritoService,
    public  barrioService: BarrioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.participante = new Participante();
  }

  ngOnInit() {
    this.listEstacas();
    this.items = [
      {label: 'Limpiar', icon: 'pi pi-refresh', command: () => {
          this.limpiar();
        }}
    ];
  }

  // form

  save(): void{
    this.spinner.show();
    this.participanteServicio.create(this.participante).subscribe(response => {
      if (response.body.mensaje == 'Exito') {
        this.viewIngreso = true;
        this.viewDistrito = false;
        this.viewForm = false;
        this.spinner.hide();
        return  swal('Exito', 'Hola  ' + response.body.cliente.nombre + ' bienvenido a la convensión, registro concluido', 'success');
      } else {
        this.spinner.hide();
        // añadir dato
        return  swal('Advertencia', response.body.mensaje, 'warning');
      }
    });
  }

  limpiar() {
    this.participante.correo = '';
    this.participante.telefonoRef = undefined;
    this.participante.telefono = undefined;
    this.participante.nombre = '';
    this.participante.idBarrio = undefined;
    this.participante.correo = '';
    this.participante.nombreRef = '';
  }

  barrioByEstaca(idEstaca) {
    this.spinner.show();
    this.barrioService.distritosByEstaca(idEstaca).subscribe(response => {
      this.listBarrios = response.body;
      this.spinner.hide();
    });
  }

  // distritos
  select(idDistrito) {
    this.spinner.show();
    this.distritoService.validarCupo(idDistrito, this.participante.idEstaca[0]).subscribe(response => {
      if (response.body.status == '') {
        this.viewIngreso = false;
        this.viewDistrito = false;
        this.viewForm = true;
        this.participante.idDistrito = idDistrito;
        this.barrioByEstaca(this.participante.idEstaca[0]);
        this.spinner.hide();
      } else {
        this.spinner.hide();
        return swal('Información', 'Seleccione otro distrito, este ya se lleno el cupo', 'info');
      }
    });
  }

  // ingreso

  ingresar() {
    if (this.participante.documento == undefined || this.participante.idEstaca[0] == 0 ) {
     return  swal('Advertencia', 'LLene los datos', 'error');
    }
    this.spinner.show();
    this.participanteServicio.listDistritosByDocAndEstaca(this.participante.documento, this.participante.idEstaca[0]).subscribe(response => {
      if (response.body.mensaje == 'NO EXISTE') {
       this.listDistritos = response.body.distritos;
        this.viewIngreso = false;
        this.viewDistrito = true;
        this.viewForm = false;
        this.spinner.hide();
      } else {
        this.existe = true;
        this.viewDistrito = false;
        this.viewForm = false;
        this.spinner.hide();
      }
    });
  }

  listEstacas() {
    this.spinner.show();
    this.estacaService.list().subscribe( response => {
      this.estacas = response.body;
      this.estacas.forEach(o => {
        o.label = o.nombre;
        o.value = o.id;
      });
      this.spinner.hide();
    });
  }
}
