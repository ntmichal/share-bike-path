import { Component, OnInit } from '@angular/core';

import {LeafletMouseEvent, Map } from "leaflet";

import * as L from 'leaflet';
import 'leaflet-routing-machine';

import { OpenRouteService } from '../open-route-service';
@Component({


  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  control:any;
  centerCoordinates = [52.237049,21.017532];


  mapLayer = L.tileLayer('https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=ZkrAk8j36aDQiWLldyPt', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="#">Map Tiler</a> | <a href="#">Open Route Service</a> '
  });


  options = {
    layers:[ this.mapLayer],
    zoom: 10,
    center: L.latLng([52.237049,21.017532]),
    zoomControl: false
  };



  onMapReady(map: L.Map) {

    map.on('click',  (e) => {
      var coords = e as LeafletMouseEvent;
      var latLng = coords.latlng;


      this.addMarker(map,latLng);
    
    

    });

    this.control = L.Routing.control({
      router: new OpenRouteService(),
      waypoints:
      [
        L.latLng(52.242642,20.993828),
        L.latLng(52.225038,20.988635)
      ]
    }).addTo(map);


  }


  addMarker(map: L.Map, coords: any){
    L.marker(coords, {draggable: true}).addTo(map);
    
  }


}
