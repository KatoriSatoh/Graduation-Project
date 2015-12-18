function bkFeature(name, type, coordinates){
  this.name = name;
  this.type = type;
  this.coordinates = coordinates;

  this.setName = function(name){
    this.name = name
  };

  this.setType = function(type){
    this.type = type;
  };

  this.getCoordinates = function(){
    return this.coordinates;
  };
/*
  this.setCoordinates = function(coordinates){
    var newcoor = new Array();
    for (var i=0; i<coordinates.length; i++) {
      //console.log(coordinates[i]);
      newcoor.push(ol.proj.transform(coordinates[i], 'EPSG:4326', 'EPSG:900913'));
    }
    this.coordinates = newcoor;
    console.log(coordinates);
  };

  this.coordinates = this.setCoordinates(coordinates);
*/
  this.toGeoJSON = function(){

    var newcoor = new Array();
    for (var i=0; i<this.coordinates.length; i++) {
      //console.log(this.coordinates[i]);
      newcoor.push(ol.proj.transform(this.coordinates[i], 'EPSG:4326', 'EPSG:900913'));
    }
    //console.log(newcoor);
  return {
      "type": "Feature",
      "geometry": {
        "type": this.type,
        "coordinates": newcoor
      },
      "properties": {
        "name": this.name
      }
    };
  }

  this.getFeature = function(){
    var feature = new ol.format.GeoJSON().readFeature(this.toGeoJSON());
    feature.setId(this.name);
    return feature;
  };
}

function bkMap(id){
  this.id = id;
  this.center = [106,10];
  this.zoom = 7;
  this.vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      feature:[]
    })
  });
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      this.vectorLayer
    ],
    controls: ol.control.defaults({
      attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
        collapsible: false
      })
    }),
    target: this.id,
    view: new ol.View({
      center: ol.proj.transform([106, 10], 'EPSG:4326', 'EPSG:900913'),
      zoom: this.zoom
    })
  });
 
  this.setCenter = function(lon,lat){
	  // transform from WGS 1984 to Spherical Mercator Projection
    var location = ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:900913');
    this.map.getView().setCenter(location);
  };

  this.setBound = function(){
    this.map.getView().fit(this.vectorLayer.getSource().getExtent(), this.map.getSize());
  }

  this.setZoom = function(zoom){
    this.map.getView().setZoom(zoom);
  };

  //this.features = new Array();

  this.addFeature = function(bkFeature){
    //this.features.push(bkFeature);
    this.vectorLayer.getSource().addFeature(bkFeature.getFeature());
  };

  this.getFeature = function(name){
    return this.vectorLayer.getSource().getFeatureById(name);
  }

  this.setStyle = function(name, style){
    var feature = this.getFeature(name);
    feature.setStyle(style);
    feature.changed();
  }

  this.refresh = function(){
    this.map.render();
  };
}

setPointStyle = function(pointColor, pointRadius){
  return new ol.style.Style({
    image: new ol.style.Circle({
      radius: pointRadius,
      fill: new ol.style.Fill({
        color: pointColor
      })
    })
  })
}

setLineStyle = function(lineColor, lineWidth){
  return new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: lineColor,
      width: lineWidth
    })
  })
}
