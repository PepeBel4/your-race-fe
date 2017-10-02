import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { WidgetModule } from '../layout/widget/widget.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DataTableModule } from 'angular2-datatable';
import { JqSparklineModule } from '../components/sparkline/sparkline.module';

import { Competitions } from './competitions.component.ts';
import { CompetitionNew } from './new/competition-new.component.ts';
import { CompetitionShow } from './show/competition-show.component.ts';

import { GroupNew } from '../group/new/group-new.component.ts';
import { GroupShow } from '../group/show/group-show.component.ts';

import { FleetShow } from '../fleet/show/fleet-show.component.ts';

import { CompetitorNew } from '../competitor/new/competitor-new.component.ts';
import { CompetitorShow } from '../competitor/show/competitor-show.component.ts';

import { Ng2TableModule } from 'ng2-table';
import { PaginationModule  } from 'ngx-bootstrap';

import { SearchPipe } from './pipes/search-pipe';

import { AgmCoreModule } from '@agm/core';

export const routes = [
  { path: '', component: Competitions, pathMatch: 'full' },
  { path: 'competitions', component: Competitions},
  { path: 'new', component: CompetitionNew},
  { path: ':id', component: CompetitionShow},
  { path: ':competition_id/groups/new', component: GroupNew },
  { path: ':competition_id/groups/:id', component: GroupShow },
  { path: ':competition_id/groups/:group_id/fleets/:id', component: FleetShow },
  { path: ':competition_id/groups/:group_id/competitors/new', component: CompetitorNew },
  { path: ':competition_id/groups/:group_id/competitors/:id', component: CompetitorShow }
];



@NgModule({
  imports: [
    CommonModule,
    WidgetModule,
    FormsModule,
    DataTableModule,
    JqSparklineModule,
    RouterModule.forChild(routes),
    PaginationModule.forRoot(),
    Ng2TableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDe_oVpi9eRSN99G4o6TwVjJbFBNr58NxE'
    })
  ],
  declarations: [
    Competitions,
    CompetitionNew,
    CompetitionShow,
    GroupNew,
    GroupShow,
    FleetShow,
    CompetitorNew,
    CompetitorShow,
    SearchPipe
  ],
  providers: [
  ]
})
export class CompetitionsModule {
  static routes = routes;
}
