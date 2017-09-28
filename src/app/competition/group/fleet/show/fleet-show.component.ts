import { Component,OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Fleet } from '../fleet';
import { FleetService } from '../fleet.service';
import { Race } from './race';
import { RaceService } from './race.service';

@Component({
	selector: 'fleet-show',
	templateUrl: 'fleet-show.component.html',
  	encapsulation: ViewEncapsulation.None
})

export class FleetShow implements OnInit {
	id: number;
	routeId: any;

	rows: Array<any> = [];
  	columns: Array<any> = [
    	{title: 'Number', name: 'number', sort: 'asc'},
    	{title: 'Name', name: 'name', sort: 'asc'}
  	];
  	page: number = 1;
  	itemsPerPage: number = 10;
  	maxSize: number = 5;
  	numPages: number = 1;
  	length: number = 0;

  	config: any = {
    	paging: true,
    	sorting: {columns: this.columns},
    	filtering: {filterString: '', columnName: 'name'}
  	};

  	 ng2TableData: Array<any> = [];

	constructor(
		private http: Http,
		private route: ActivatedRoute,
		private fleetService: FleetService,
		private raceService: RaceService
	 ) {}

	@Input()
	fleet: Fleet;
	race: Race;

	ngOnInit(): void {

		let competitionRequest = this.route.params	
			.flatMap((params: Params) =>
				this.fleetService.getFleet(+params['competition_id'],+params['group_id'],+params['id']));
		competitionRequest.subscribe(response => {
			console.log(response.json());
			this.fleet = response.json()
			this.setRace(this.fleet.races[0].id);
		})

		let searchInput = jQuery('#table-search-input, #search-countries');
    searchInput
      .focus((e) => {
      jQuery(e.target).closest('.input-group').addClass('focus');
    })
      .focusout((e) => {
      jQuery(e.target).closest('.input-group').removeClass('focus');
    });
    
    this.onChangeTable(this.config);


	}


	setRace(race_id: number) {
		let competitionRequest = this.route.params	
			.flatMap((params: Params) =>
				this.raceService.getRace(+params['competition_id'],+params['group_id'],+params['id'],race_id));
		competitionRequest.subscribe((response: any) => {
			this.race = response.json()
			
			let list: any[] = [];
				response.json().race_competitors.forEach(element => {
    			list.push({"number": element.competitor.number, "name": element.competitor.name});
			});

				this.ng2TableData = list;
				this.onChangeTable(this.config);
				
			})
	}

	changePage(page: any, data: Array<any> = this.ng2TableData): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  changeFilter(data: any, config: any): any {
    if (!config.filtering) {
      return data;
    }

    let filteredData: Array<any> = data.filter((item: any) =>
      item[config.filtering.columnName].match(this.config.filtering.filterString));

    return filteredData;
  }

  onChangeTable(config: any, page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.ng2TableData, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }


}