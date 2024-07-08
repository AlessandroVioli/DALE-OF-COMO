import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import { Map, View, Overlay } from 'ol';
import { Tile, Image, Group, Vector } from 'ol/layer';
import { OSM, ImageWMS, BingMaps, StadiaMaps } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { fromLonLat } from 'ol/proj';
import { ScaleLine, FullScreen, MousePosition } from 'ol/control';
import LayerSwitcher from 'ol-layerswitcher';
import { createStringXY } from 'ol/coordinate';


let osm = new Tile({
    title: "Open Street Map",
    type: "base",
    visible: true,
    source: new OSM()
});

var Landslide_Susceptibility_Map = new Image({
    title: "Landslide Susceptibility Map",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_18/wms',
        params: { 'LAYERS': 'gis:LandslideSusceptibilityMap' }
    }),
    
});

var Landslide_Susceptibility_Map_reclass = new Image({
    title: "Landslide Susceptibility Map Reclass",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_18/wms',
        params: { 'LAYERS': 'gis:LandslideSusceptibilityMap_reclass' }
    }),
    
});



var DTM = new Image({
    title: "DTM",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_18/wms',
        params: { 'LAYERS': 'gis:DTM' }
    }),
    visible: false
});

var Aspect = new Image({
    title: "Aspect",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_18/wms',
        params: { 'LAYERS': 'gis:Aspect' }
    }),
    visible: false
});

var DUSAF = new Image({
    title: "DUSAF",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_18/wms',
        params: { 'LAYERS': 'gis:DUSAF' }
    }),
    visible: false
});

var FAULTS = new Image({
    title: "Faults",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_18/wms',
        params: { 'LAYERS': 'gis:Faults' }
    }),
    visible: false
});


var NDVI = new Image({
    title: "NDVI",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_18/wms',
        params: { 'LAYERS': 'gis:NDVI' }
    }),
    visible: false
});



var Rivers = new Image({
    title: "Rivers",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_18/wms',
        params: { 'LAYERS': 'gis:Rivers' }
    }),
    visible: false
});

var Roads = new Image({
    title: "Roads",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_18/wms',
        params: { 'LAYERS': 'gis:Roads' }
    }),
    visible: false
});

var Slope = new Image({
    title: "Slope",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_18/wms',
        params: { 'LAYERS': 'gis:Slope' }
    }),
    visible: false
});




var population = new Image({
    title: "Population",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_18/wms',
        params: { 'LAYERS': 'gis:population' }
    }),
    visible: false
});


var Profile_curvature = new Image({
    title: "Profile Curvature",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_18/wms',
        params: { 'LAYERS': 'gis:Profile_Curvature' }
    }),
    visible: false
});

var Plan_curvature = new Image({
    title: "Plan Curvature",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_18/wms',
        params: { 'LAYERS': 'gis:Plan_Curvature' }
    }),
    visible: false
});

let basemapLayers = new Group({
    title: "Base Maps",
    layers: [osm]
});
let step_1 = new Group({
    title: "STEP 1",
    layers: [DTM, Aspect, DUSAF, FAULTS, NDVI, Rivers, Roads, Slope, Profile_curvature, Plan_curvature]
})
let step_2 = new Group({
    title: "STEP 2",
    layers: [Landslide_Susceptibility_Map]
})
let step_3 = new Group({
    title: "STEP 3",
    layers: [Landslide_Susceptibility_Map_reclass, population]
})

// Map Initialization
let map = new Map({
    target: document.getElementById('map'),
    layers: [basemapLayers, step_3, step_2, step_1],
    view: new View({
        center: fromLonLat([9.1222, 45.844]),
        zoom: 11.7
    })
});

// Add the map controls:
map.addControl(new ScaleLine()); 
map.addControl(new FullScreen());
map.addControl(
    new MousePosition({
        coordinateFormat: createStringXY(4),
        projection: 'EPSG:4326',
        className: 'custom-control',
        placeholder: '0.0000, 0.0000'
    })
);

var layerSwitcher = new LayerSwitcher({});
map.addControl(layerSwitcher);

var BING_MAPS_KEY = "AqbDxABFot3cmpxfshRqLmg8UTuPv_bg69Ej3d5AkGmjaJy_w5eFSSbOzoHeN2_H";
var bingRoads = new Tile({
    title: 'Bing Maps—Roads',
    type: 'base',
    visible: false,
    source: new BingMaps({
        key: BING_MAPS_KEY,
        imagerySet: 'Road'
    })
});
var bingAerial = new Tile({
    title: 'Bing Maps—Aerial',
    type: 'base',
    visible: false,
    source: new BingMaps({
        key: BING_MAPS_KEY,
        imagerySet: 'Aerial'
    })
});
basemapLayers.getLayers().extend([bingRoads, bingAerial]);


var stadiaWatercolor = new Tile({
    title: "Stadia Watercolor",
    type: "base",
    visible: false,
    source: new StadiaMaps({
        layer: 'stamen_watercolor'
    })
})
var stadiaToner = new Tile({
    title: "Stadia Toner",
    type: "base",
    visible: false,
    source: new StadiaMaps({
        layer: 'stamen_toner'
    })
})
basemapLayers.getLayers().extend([stadiaWatercolor, stadiaToner]);



overlayLayers.getLayers().extend([vectorLayer]);


function loadFeatures(response) {
    vectorSource.addFeatures(new GeoJSON().readFeatures(response))
}

window.loadFeatures = loadFeatures;

var base_url = "https://www.gis-geoserver.polimi.it/geoserver/gis/ows?";
var wfs_url = base_url;
wfs_url += "service=WFS&"
wfs_url += "version=2.0.0&"
wfs_url += "request=GetFeature&"
wfs_url += "typeName=gis%3ACOL_water_areas&"
wfs_url += "outputFormat=text%2Fjavascript&"
wfs_url += "srsname=EPSG:3857&"
wfs_url += "format_options=callback:loadFeatures"

