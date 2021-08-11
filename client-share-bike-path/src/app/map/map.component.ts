import { Component, OnInit } from '@angular/core';

import 'leaflet';
import {LatLng, LeafletMouseEvent, Map} from "leaflet";
// declare  let L;
declare let L: { tileLayer: (arg0: string, arg1: { maxZoom: number; attribution: string; }) => any; latLng: (arg0: number[]) => any; marker: (arg0: LatLng) => { (): any; new(): any; addTo: { (arg0: Map): void; new(): any; }; }; };

import { Layer, Icon, icon, Marker } from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {



  constructor() {
  }


  ngOnInit(): void {
  }
  centerCoordinates = [52.237049,21.017532];

  mapLayer = L.tileLayer('https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=ZkrAk8j36aDQiWLldyPt', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="#">Map Tiler</a> | <a href="#">Open Route Service</a> '
  });

  options = {
    layers:[ this.mapLayer],
    zoom: 11,
    center: L.latLng([52.237049,21.017532]),
    zoomControl: false
  };

  onMapReady(map: L.Map) {
    // map.addControl(control.zoom({ position: 'bottomright' }));

    map.on('click',  (e) => {
      var coords = e as LeafletMouseEvent;
      var latLng = coords.latlng;


      this.addMarker(map,latLng);

    });
  }


  addMarker(map: L.Map, coords: any){
    L.marker(coords).addTo(map);
  }
}
