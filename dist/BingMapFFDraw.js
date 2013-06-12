/*! BingMapFFDraw - v0.0.1 - 2013-06-12
* https://github.com/dannyrscott/BingMapFreeFormDraw
* Copyright (c) 2013 Danny Scott; Licensed MIT */
(function(exports) {

  'use strict';

  var BingDrawFF = function(map, opts) {
	var _map = map, //The Bing Map itself
		_self = this, //holder for this
		MM = Microsoft.Maps, //shorthand for Microsoft Map object
		drawLayer = new MM.EntityCollection(), //Layer for drawing on
		previewLine = new MM.Polyline(), //Preview Polyline
		previewPoints = [], //Points in the polyline
		shape = new MM.Polygon(), //Finished Polygon
		_drawEvent, //Mousemove draw event
		_endEvent, //Stop drawing "click" event
		_startEvent, //Start drawing "click" event
		_drawing = false; //Are we currently drawing


	var options = opts || {};
	options.onDrawEnd = options.onDrawEnd || function() {};

	_map.entities.push(drawLayer);  //Push the drawing layer to the map
	drawLayer.push(previewLine); //Push the previewline to the drawing layer
	drawLayer.push(shape); //Push the final shape to the drawing layer


	/*
	 * _beginDraw function
	 * Starts us drawing.
	 */
	var _beginDraw = function() {
		opts = opts || {};

		var endCallback = opts.onDrawEnd || function() {}; //after drawing ends callback
		if (_drawing) {
			return; //Already drawing, do nothing
		}
		_drawing = true; //Start drawing;

		shape.setLocations([]); //Empty the shape;

		//Bind the drawing event to the mouse move.  Throttled to 100 ms
		_drawEvent = MM.Events.addThrottledHandler(_map,"mousemove",function(e){
			previewPoints = previewLine.getLocations() || []; //Get Current locations, or empty array if first location
			var point = new MM.Point(e.getX(),e.getY()); //Turn mouse location into a MM Point
			//Attempt to convert MM Point into MM.Location
			var loc;
			try {
				loc = e.target.tryPixelToLocation(point);
			} catch(err) {
				loc = false;
			}
			//We got a Location, add it to the preview;
			if (loc) {
				previewPoints.push(loc);
				previewLine.setLocations(previewPoints);
			}
		},100);

		//Drawing end event.
		_endEvent = MM.Events.addHandler(_map,"click",function(e){
			_endDraw(endCallback); //Stop drawing
			MM.Events.removeHandler(_endEvent); //Remove the event
		});
	};


	var _endDraw = function() {

		//Remove Drawing Events
		MM.Events.removeHandler(_drawEvent);
		var shapePoints = previewLine.getLocations();

		if (shapePoints.length) {
			shapePoints.push(shapePoints[0]); //Make the last point the same as the first point.  Finish the polygon.
		}
		previewLine.setLocations([]); //Empty out the preview line

		shape.setLocations(shapePoints); //Set the points on the new shape
		_drawing = false; //No longer drawing
		options.onDrawEnd(); //Run the Callback
	};

	/*
	 * Enter Drawing Mode
	 * Registers the beginDraw event to the click action of the map
	 */
	this.enterDrawingMode = function() {
		_startEvent = MM.Events.addHandler(_map,"click",function(e){
			MM.Events.removeHandler(_startEvent);
			_beginDraw();
		});
	};

	/*
	 * End drawing mode;
	 */
	this.endDrawingMode = function() {
		MM.Events.removeHandler(_startEvent);
		if (_drawing) {
			_drawing = false;
			_endDraw();
		}
	};

	/*
	 * Get the shape
	 */
	this.getShape = function() {
		return shape;
	};

	/*
	 * Get the drawLayer
	 */
	this.getLayer = function() {
		return drawLayer;
	};
  };

  exports.BingDrawFF = BingDrawFF;
}(typeof exports === 'object' && exports || this));
