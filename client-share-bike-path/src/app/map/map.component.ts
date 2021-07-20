import { Component, OnInit } from '@angular/core';

// import 'leaflet';
// import 'leaflet-routing-machine';
// import 'leaflet-routing-machine/src/OpenRouteService';
// declare let L;

// import { Layer, Icon, icon, Marker } from 'leaflet';
import { control, Map, latLng, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 8,
    zoomControl: false,
    center: latLng(52.229676, 21.012229),

  };

  mapReady(map: Map) {
    map.addControl(control.zoom({ position: 'bottomright' }));
  }
}
