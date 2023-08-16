import FeatureEffect from "@arcgis/core/layers/support/FeatureEffect";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import { gLayer } from "./drawPolygons";

export const updatePolygon = async (
  view: __esri.MapView | undefined,
  setEditGeometry: React.Dispatch<
    React.SetStateAction<__esri.Geometry | undefined>
  >,
  featureLayer: __esri.FeatureLayer,
  editGraphic: __esri.Graphic
) => {
  const sketch = await (
    await import("@arcgis/core/widgets/Sketch/SketchViewModel.js")
  ).default;

  view?.map.layers.add(gLayer);
  const home = new sketch({
    view: view,
    layer: gLayer,
    defaultUpdateOptions: {
      tool: "reshape",
      toggleToolOnClick: false,
    },
    polygonSymbol: {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: "rgba(0, 205, 255, 0.3)",
      style: "backward-diagonal",
      outline: {
        color: "red",
        width: 1,
      },
    },
  });

  const featureFilter = new FeatureFilter({
    objectIds: editGraphic.attributes.OBJECTID,
  });
  const featureEffect = new FeatureEffect({
    filter: featureFilter,
    includedEffect: "opacity(0%)",
  });

  if (featureLayer !== undefined) {
    featureLayer.featureEffect = featureEffect;
  }

  home.update(editGraphic);

  gLayer.graphics.add(editGraphic);

  //   //   home.on(["update", "undo", "redo"], onGraphicUpdate);
  let arr: any;

  home.on("update", (event) => {
    featureLayer.opacity = 0.2;

    if (
      event.toolEventInfo &&
      (event.toolEventInfo.type === "move-stop" ||
        event.toolEventInfo.type === "reshape-stop")
    ) {
      home.update([event.graphics[0]], { tool: "reshape" });
      arr = event.graphics[0].geometry;
      home.complete();
      setEditGeometry(arr);
    }
  });
};
