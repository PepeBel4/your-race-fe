import { Component,OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';

import { Race } from '../../../race/race';
import { RaceService } from '../../../race/race.service';

import { PubNubAngular } from 'pubnub-angular2';

@Component({
	selector: 'race-show',
	templateUrl: 'race-show.component.html',
  	encapsulation: ViewEncapsulation.None
})

export class RaceShow implements OnInit {

  lat: number = -37.813179;
  lng: number = 144.950259;
  zoom: number = 12;

  markers: marker[] = [];

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

  private timer: any;
  private sub: Subscription;
  channel: string;

	constructor(
		private http: Http,
		private route: ActivatedRoute,
		private raceService: RaceService,
    pubnub: PubNubAngular
	 ) {

       var self = this;
       this.channel = 'races-1';
       
       pubnub.init({
        publishKey: 'pub-c-b06ac705-6638-4946-af1f-da17d43c519e',
        subscribeKey: 'sub-c-f2672bfe-a75e-11e7-ad87-6e294738eb45'
       });

       pubnub.subscribe({
         channels: [this.channel],
         withPresence: true,
         triggerEvents: true
       });

       pubnub.getMessage(this.channel, function (msg) {
         console.log('we are receiving')
         console.log(msg);
         self.race = msg.message;
         console.log('we are here!');
         console.log(self.race);
      });

  }

	race: Race;

	ngOnInit(): void {

		let competitionRequest = this.route.params	
			.flatMap((params: Params) =>
				this.raceService.getRace(+params['competition_id'],+params['group_id'],+params['fleet_id'],+params['id']));
		competitionRequest.subscribe(response => {
			this.race = response.json()
			console.log(this.race);
      this.setRace(this.race.id);
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

    //timer
    this.timer = Observable.timer(0,1000);  
    this.sub = this.timer.subscribe(() => this.updateRaceData());  

	}

  ngOnDestroy(){
        console.log("Destroy timer");
        // unsubscribe here
        this.sub.unsubscribe();

    }

    updateRaceData() {
      if (this.race) this.race.ongoingFor += 1;
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

        this.markers = [];
        response.json().metrics.forEach(element => {
          this.markers.push({"lat": 51.6, "lng": 7.8, "label": element.name, "draggable":true});
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

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
};