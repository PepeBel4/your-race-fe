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

import { GroupShow } from './group/show/group-show.component.ts';

import { CompetitionService } from './competition.service';
import { GroupService } from './group/group.service';

export const routes = [
  { path: '', component: Competitions, pathMatch: 'full' },
  { path: 'competitions', component: Competitions},
  { path: 'new', component: CompetitionNew},
  { path: ':id', component: CompetitionShow},
  { path: ':id/groups/:group_id', component: GroupShow }
];


@NgModule({
  imports: [
    CommonModule,
    WidgetModule,
    FormsModule,
    DataTableModule,
    JqSparklineModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    Competitions,
    CompetitionNew,
    CompetitionShow,
    GroupShow
  ],
  providers: [
    GroupService
  ]
})
export class CompetitionsModule {
  static routes = routes;
}
