import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import Basemap from "@arcgis/core/Basemap.js";
import Search from "@arcgis/core/widgets/Search.js";
import Zoom from "@arcgis/core/widgets/Zoom.js";
import Legend from "@arcgis/core/widgets/Legend.js";
import Home from "@arcgis/core/widgets/Home.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import Expand from "@arcgis/core/widgets/Expand.js";
import { featureLayerPublic } from "../layers";
import { layerRenderer } from "./layerRenderer";

interface MapApp {
  view?: MapView;
}

const app: MapApp = {};

export function init(container: HTMLDivElement) {
  if (app.view) {
    app.view.destroy();
  }

  const baseMap = new Basemap({
    baseLayers: [
      new VectorTileLayer({
        portalItem: {
          id: "34adce6f797846bf8e971f402a251403",
        },
      }),
    ],
    title: "basemap",
    id: "basemap",
  });

  const map = new ArcGISMap({
    basemap: baseMap,
    layers: [featureLayerPublic()],
  });

  const view = new MapView({
    map,
    container,
    center: [25.28093, 54.681],
    zoom: 12,
    ui: {
      components: ["attribution"],
    },
    constraints: {
      minScale: 500000,
      snapToZoom: false,
    },
  });

  layerRenderer(view);
  const marker = new SimpleMarkerSymbol({ color: [203, 52, 52, 0.93] });

  const sources = [
    {
      url: "https://gis.vplanas.lt/arcgis/rest/services/Lokatoriai/PAIESKA_COMPOSITE/GeocodeServer",
      singleLineFieldName: "SingleLine",
      name: "Vplanas paieska",
      placeholder: "Ieškoti adreso arba vietovės",
      maxResults: 3,
      maxSuggestions: 6,
      minSuggestCharacters: 0,
      resultSymbol: marker,
    },
  ];

  const searchWidget = new Search({
    view: view,
    includeDefaultSources: false,
    sources: sources,
    popupEnabled: false,
    id: "search",
  });

  const searchExpand = new Expand({
    view,
    content: searchWidget,
    expandTooltip: "Paieška",
  });

  view.ui.add(searchExpand, {
    position: "top-left",
    index: 2,
  });

  const legend = new Legend({
    view: view,
    label: "Kategorijos",
  });

  const legendExpand = new Expand({
    view,
    content: legend,
    expandTooltip: "Legenda",
  });

  view.ui.add(legendExpand, "top-left");
  const home = new Home({
    view: view,
  });

  view.ui.add(home, {
    position: "bottom-right",
  });

  const zoom = new Zoom({
    view: view,
  });

  view.ui.add(zoom, {
    position: "bottom-right",
  });

  return view;
}
