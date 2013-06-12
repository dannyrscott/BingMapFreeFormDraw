# BingMapFFDraw

Bing Map Free Form Drawing Tool

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/dannyrscott/BingMapFreeFormDraw/master/dist/BingMapFFDraw.min.js
[max]: https://raw.github.com/dannyrscott/BingMapFreeFormDraw/master/dist/BingMapFFDraw.js


In your code, you can attach BingMapFFDraw's methods to any object.


## Example
```html
<script src="dist/BingMapFFDraw.min.js"></script>
<script>
	//Pass in the Map object
	var drawer = new BingDrawFF(map,{
	   onDrawEnd: function() {
	      console.log('I do this after i am done drawing');
	   }
	});

	//Call the Start drawing event
	drawer.enterDrawingMode();

	//Get the Layer
	drawer.getLayer();

	//Get the Shape
	drawer.getShape();
</script>
```
## Documentation
BingDrawFF(Object Map, Object Options) - The Drawing Object Itself.  You pass in the map object created by new Microsoft.Maps
###Options
* onDrawEnd - Callback when the polygon is finished.
```javascript
var drawer = new BingDrawFF(map, opts);
```
##Methods
enterDrawingMode - Enter "drawing mode".  Calling this function binds a click event to the map itself which starts the freeform draw.  Takes an optional options object.
```javascript
drawer.enterDrawingMode();
```

getShape - Return the drawn polygon

getLayer - Return the layer on which the drawing is done.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

_Also, please don't edit files in the "dist" subdirectory as they are generated via Grunt. You'll find source code in the "lib" subdirectory!_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Danny Scott
Licensed under the MIT license.