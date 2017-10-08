import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PubNubAngular } from 'pubnub-angular2';
import { CommonModule }  from '@angular/common';
import { Presenter } from './presenter.component';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';

import { GroupShow } from './group/show/group-show.component.ts';
import { FleetShow } from './fleet/show/fleet-show.component.ts';
import { RaceShow } from './race/show/race-show.component.ts';
import { CompetitorShow } from './competitor/show/competitor-show.component.ts';

import { Ng2TableModule } from 'ng2-table';
import { PaginationModule  } from 'ngx-bootstrap';
import { AgmCoreModule } from '@agm/core';

import { SecondsToTimePipe } from '../pipes/secondstotime.pipe';

export const routes = [
  { path: ':id', component: Presenter, pathMatch: 'full' },
  { path: ':competition_id/groups/:id', component: GroupShow },
  { path: ':competition_id/groups/:group_id/fleets/:id', component: FleetShow },
  { path: ':competition_id/groups/:group_id/competitors/:id', component: CompetitorShow },
  { path: ':competition_id/groups/:group_id/fleets/:fleet_id/races/:id', component: RaceShow }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    RouterModule.forChild(routes),
    Ng2TableModule,
    PaginationModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDe_oVpi9eRSN99G4o6TwVjJbFBNr58NxE'
    })
  ],
  declarations: [
    Presenter,
    GroupShow,
    FleetShow,
    RaceShow,
    CompetitorShow,
    SecondsToTimePipe
  ],
  providers: [
    PubNubAngular
  ]
})
export class PresenterModule {
  static routes = routes;
}