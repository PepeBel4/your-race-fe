import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: '[maps-google]',
  template: require('./maps-google.template.html'),
  styles: ['agm-map { height: 100% }']
})

export class MapsGoogle implements OnInit {
  
  lat: number = -37.813179;
  lng: number = 144.950259;
  zoom: number = 12;

  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true
	  }
  ];

 updateData() {
 	this.lat += 0.0001;
 }

 ngOnInit(){
    let timer = Observable.timer(2000,10);
    timer.subscribe(t=> {
        this.updateData();
    });
}



}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
};
