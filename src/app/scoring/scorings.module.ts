import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { WidgetModule } from '../layout/widget/widget.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DataTableModule } from 'angular2-datatable';
import { JqSparklineModule } from '../components/sparkline/sparkline.module';

import { Scorings } from './scorings.component.ts';

import { ScoringService } from './scoring.service';

export const routes = [
  { path: '', component: Scorings, pathMatch: 'full' },
  {path: 'scorings', component: Scorings}
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
    Scorings
  ],
  providers: [
  	ScoringService
  ]
})
export class ScoringsModule {
  static routes = routes;
}
