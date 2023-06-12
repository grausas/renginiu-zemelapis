import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
// category icons
import Susirinkimas from "../assets/icons/susirinkimas.svg";
import SportoRenginys from "../assets/icons/sporto_renginys.svg";
import Koncertas from "../assets/icons/koncertas.svg";
import Filmavimas from "../assets/icons/filmavimas.svg";
import Muge from "../assets/icons/muge.svg";
import RenginysSeimai from "../assets/icons/renginys_seimai.svg";
import ValstybinisRenginys from "../assets/icons/valstybinis_renginys.svg";
import ViesasisRenginys from "../assets/icons/viesasis_renginys.svg";

export const layerRenderer = (view: any) => {
  reactiveUtils
    .whenOnce(() => view.ready)
    .then(() => {
      const uniqueValue =
        view.map.layers.getItemAt(0).renderer.uniqueValueInfos;

      // create unique render values with icons
      const simpleRenderer = {
        type: "unique-value",
        field: "KATEGORIJA",
        uniqueValueInfos: [
          {
            value: "1",
            symbol: {
              type: "picture-marker",
              url: Susirinkimas,
              width: "23px",
              height: "23px",
            },
          },
          {
            value: "2",
            symbol: {
              type: "picture-marker",
              url: SportoRenginys,
              width: "23px",
              height: "23px",
            },
          },
          {
            value: "3",
            symbol: {
              type: "picture-marker",
              url: Koncertas,
              width: "23px",
              height: "23px",
            },
          },
          {
            value: "4",
            symbol: {
              type: "picture-marker",
              url: Filmavimas,
              width: "23px",
              height: "23px",
            },
          },
          {
            value: "5",
            symbol: {
              type: "picture-marker",
              url: Muge,
              width: "23px",
              height: "23px",
            },
          },
          {
            value: "6",
            symbol: {
              type: "picture-marker",
              url: RenginysSeimai,
              width: "23px",
              height: "23px",
            },
          },
          {
            value: "7",
            symbol: {
              type: "picture-marker",
              url: ValstybinisRenginys,
              width: "23px",
              height: "23px",
            },
          },
          {
            value: "8",
            symbol: {
              type: "picture-marker",
              url: ViesasisRenginys,
              width: "23px",
              height: "23px",
            },
          },
        ],
      };

      const simpleRendererBig = {
        type: "unique-value",
        field: "KATEGORIJA",
        uniqueValueInfos: [
          {
            value: "1",
            symbol: {
              type: "picture-marker",
              url: Susirinkimas,
              width: "30px",
              height: "30px",
            },
          },
          {
            value: "2",
            symbol: {
              type: "picture-marker",
              url: SportoRenginys,
              width: "30px",
              height: "30px",
            },
          },
          {
            value: "3",
            symbol: {
              type: "picture-marker",
              url: Koncertas,
              width: "30px",
              height: "30px",
            },
          },
          {
            value: "4",
            symbol: {
              type: "picture-marker",
              url: Filmavimas,
              width: "30px",
              height: "30px",
            },
          },
          {
            value: "5",
            symbol: {
              type: "picture-marker",
              url: Muge,
              width: "30px",
              height: "30px",
            },
          },
          {
            value: "6",
            symbol: {
              type: "picture-marker",
              url: RenginysSeimai,
              width: "30px",
              height: "30px",
            },
          },
          {
            value: "7",
            symbol: {
              type: "picture-marker",
              url: ValstybinisRenginys,
              width: "30px",
              height: "30px",
            },
          },
          {
            value: "8",
            symbol: {
              type: "picture-marker",
              url: ViesasisRenginys,
              width: "30px",
              height: "30px",
            },
          },
        ],
      };

      // render polygons
      const simpleRendererPolygon = {
        type: "unique-value",
        field: "KATEGORIJA",
        uniqueValueInfos: uniqueValue,
      };

      //   change render symbol depending on zoom level
      reactiveUtils.watch(
        () => view.zoom,
        () => {
          view.map.layers.items[0].renderer =
            view.zoom <= 11
              ? simpleRendererBig
              : view.zoom <= 16
              ? simpleRenderer
              : simpleRendererPolygon;
        },
        {
          initial: true,
        }
      );
    });

  return view;
};
