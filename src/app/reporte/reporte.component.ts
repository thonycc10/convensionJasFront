import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ParticipanteServicio} from '../servicio/participanteServicio';
import {EstacaService} from '../servicio/estacaService';
import {BarrioService} from '../servicio/barrioService';
import {DistritoService} from '../servicio/distritoService';
import * as XLSX from 'xlsx';
import {DatePipe} from '@angular/common';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html'
})
export class ReporteComponent implements OnInit {
  list: any[] = [];
  @ViewChild('TABLE') table: ElementRef;

  cols = [
    { field: 'id', header: '#' },
    { field: 'estaca', header: 'Estaca' },
    { field: 'barrio', header: 'Barrio' },
    { field: 'distrito', header: 'Distrito' },
    { field: 'documento', header: 'Documento' },
    { field: 'nombre', header: 'Nombre' },
    { field: 'fechaNacimiento', header: 'Fec. Nac.' },
    { field: 'miembro', header: 'Miembro' },
    { field: 'sexo', header: 'Sexo' },
    { field: 'telefono', header: 'Telefono' },
    { field: 'nombreRef', header: 'Nombre Referido' },
    { field: 'telefonoRef', header: 'Telefono Referido' },
    { field: 'fechaCreacion', header: 'Fecha Creación' },
  ];
  estacas = [];
  barrios = [];
  distritos = [];
  miembro = [
    {label: 'Miembro', value: 'Miembro'},
    {label: 'Converso', value: 'Converso'},
    {label: 'Menos Activo', value: 'Menos Activo'},
    {label: 'Investigador', value: 'Investigador'}
  ];
  constructor(
    public  participanteServicio: ParticipanteServicio,
    public  estacaService: EstacaService,
    public  barrioService: BarrioService,
    public  distritoService: DistritoService,
    private spinner: NgxSpinnerService,
  public datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.participanteServicio.list().subscribe(response => {
      this.list = response.body;
      this.list.forEach(o => {
        o.estaca = o.estaca.nombre;
        o.distrito = o.distrito.nombre;
        o.barrio = o.barrio.nombre;
      });
      this.spinner.hide();
    });
    this.listFiltros();
  }

  listFiltros() {
    this.estacaService.list().subscribe(est => {
      this.estacas = est.body;
      this.estacas.forEach(o => {
        o.label = o.nombre;
        o.value =  o.nombre;
      });
    });
    this.barrioService.list().subscribe(est => {
      this.barrios = est.body;
      this.barrios.forEach(o => {
        o.label = o.nombre;
        o.value =  o.nombre;
      });
    });
    this.distritoService.list().subscribe(est => {
      this.distritos = est.body;
      this.distritos.forEach(o => {
        o.label = o.nombre;
        o.value =  o.nombre;
      });
    });
  }

  exportExcel() {
    this.spinner.show();
    const dateNow = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'Participantes' + dateNow + '.xlsx');
    this.spinner.hide();
  }

}
