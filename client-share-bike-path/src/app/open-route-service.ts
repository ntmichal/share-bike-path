import * as L from 'leaflet';
import 'leaflet-routing-machine';


export class OpenRouteService implements L.Routing.IRouter{
    
    private apiUrl = 'http://localhost:8080/api/meeting/route';
    private wayPoints: L.Routing.Waypoint[] = [];
    private options?:any;

    constructor(options?:any){
        this.options = options;
    }

    route(waypoints: L.Routing.Waypoint[], 
        callback: (args?: any) => void, 
        context?: {}, 
        options?: L.Routing.RoutingOptions){

        this.wayPoints = waypoints;

        var referenceToThis = this;	
        this.apiCall()
                .then(function(routes){
                    referenceToThis._routeDone(routes, waypoints, callback,context);
                })
    }


    private apiCall(){
        return new Promise((resolve:any, errorResponse:any)=>{
            this.xhrCall(resolve,errorResponse);
        });

    }
    
    private xhrCall(resolve:any,errorResponse:any){
        var xhr = new XMLHttpRequest();
        var xhr = new XMLHttpRequest();
        xhr.open("POST", this.apiUrl);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
              resolve(JSON.parse(xhr.response));
            } else {
                errorResponse({
                    status: this.status,
                    statusText: xhr.statusText
                 });
            }
          };

        xhr.onerror = function () {
            errorResponse({
              status: this.status,
              statusText: xhr.statusText
            });
          };

          
        xhr.send(this.prepareJSONfromWayPoints());
    }


    private prepareJSONfromWayPoints(){

        var coordinates:any = {};
        var coordinatesList:any[] = [];
        this.wayPoints.forEach((point:L.Routing.Waypoint)=>{
            coordinatesList.push([point.latLng.lng, point.latLng.lat])
        });

        coordinates["coordinates"] = coordinatesList;

        return JSON.stringify(coordinates);
    }
        /**
         * Code from https://github.com/willmorejg/lrm-openrouteservice
         * Route calculated, now print to map
         * @param {Object} response JSON response
         * @param {Object} inputWaypoints Waypoint to put
         * @param {Object} callback 
         * @param {Object} context 
         */
        private _routeDone(response:any, inputWaypoints:any, callback:any, context:any) {

			var alts = [],
				waypoints,
				waypoint,
				coordinates,
				i, j, k,
				instructions,
				distance,
				time,
				leg,
				steps,
				step,
				startingSearchIndex,
				instruction,
				path;

			context = context || callback;

			if (!response.routes) {
				callback.call(context, {
					status: response.type,
					message: response.details
				});
				return;
			}

			for (i = 0; i < response.routes.length; i++) {
				path = response.routes[i];
				coordinates = this._decodePolyline(path.geometry);
				startingSearchIndex = 0;
				instructions = [];
				waypoints = [];
				time = 0;
				distance = 0;

				for (j = 0; j < path.segments.length; j++) {
					leg = path.segments[j];
					steps = leg.steps;
					for (k = 0; k < steps.length; k++) {
						step = steps[k];
						distance += step.distance;
						time += step.duration;
						instruction = this._convertInstructions(step, coordinates);
						instructions.push(instruction);
						waypoint = coordinates[path.way_points[1]];
						waypoints.push(waypoint);
					}
				}

				alts.push({
					name: 'Route: ' + (i + 1),
					coordinates: coordinates,
					instructions: instructions,
					summary: {
						totalDistance: distance,
						totalTime: time,
					},
					inputWaypoints: inputWaypoints,
					waypoints: waypoints
				});
			}

			callback.call(context, null, alts);
		}


        /**
         * Code from https://github.com/GIScience/openrouteservice-docs#geometry-decoding
         * Decode an x,y or x,y,z encoded polyline
         * @param {*} encodedPolyline
         * @param {Boolean} includeElevation - true for x,y,z polyline
         * @returns {Array} of coordinates
         */
        private _decodePolyline(encodedPolyline:any, includeElevation = false){
			// array that holds the points
			let points = []
			let index = 0
			const len = encodedPolyline.length
			let lat = 0
			let lng = 0
			let ele = 0
			while (index < len) {
				let b
				let shift = 0
				let result = 0
				do {
					b = encodedPolyline.charAt(index++).charCodeAt(0) - 63 // finds ascii
					// and subtract it by 63
					result |= (b & 0x1f) << shift
					shift += 5
				} while (b >= 0x20)

				lat += ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1))
				shift = 0
				result = 0
				do {
					b = encodedPolyline.charAt(index++).charCodeAt(0) - 63
					result |= (b & 0x1f) << shift
					shift += 5
				} while (b >= 0x20)
				lng += ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1))

				if (includeElevation) {
					shift = 0
					result = 0
					do {
						b = encodedPolyline.charAt(index++).charCodeAt(0) - 63
						result |= (b & 0x1f) << shift
						shift += 5
					} while (b >= 0x20)
					ele += ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1))
				}
				try {
					let location = [(lat / 1E5), (lng / 1E5)]
					if (includeElevation) location.push((ele / 100))
					points.push(location)
				} catch (e) {
					console.log(e)
				}
			}
			return points
		}



    private _convertInstructions(step:any, coordinates:any) {
        return {
            text: step.instruction,
            distance: step.distance,
            time: step.duration,
            index: step.way_points[0]
        };
    }
    

}
