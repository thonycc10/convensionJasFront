import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import {FooterComponent} from './footer/footer.component';
import { ParticipanteComponent } from './participante/participante.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {SplitButtonModule} from 'primeng/splitbutton';
import {TooltipModule} from 'primeng/tooltip';
import {EstacaService} from './servicio/estacaService';
import {ParticipanteServicio} from './servicio/participanteServicio';
import {DistritoService} from './servicio/distritoService';
import {BarrioService} from './servicio/barrioService';
import {CalendarModule} from 'primeng/calendar';
import { ReporteComponent } from './reporte/reporte.component';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/primeng';
import {DatePipe} from '@angular/common';
import {NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';

const routes: Routes = [
  {path: '', redirectTo: '/jas', pathMatch: 'full'},
  {path: 'jas', component: ParticipanteComponent},
  {path: 'jas/participates', component: ReporteComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ParticipanteComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    TableModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MultiSelectModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    PanelModule,
    SplitButtonModule,
    TooltipModule,
    CalendarModule,
    MultiSelectModule,
    NgxSpinnerModule
  ],
  providers: [
    EstacaService,
    ParticipanteServicio,
    DistritoService,
    BarrioService,
    NgxSpinnerService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
