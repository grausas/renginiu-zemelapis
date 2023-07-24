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
      const symbol = (url: string, width: string, height: string) => ({
        type: "picture-marker",
        url,
        width,
        height,
      });

      const uniqueValueInfos = [
        { value: "1", symbol: symbol(Susirinkimas, "23px", "23px") },
        { value: "2", symbol: symbol(SportoRenginys, "23px", "23px") },
        { value: "3", symbol: symbol(Koncertas, "23px", "23px") },
        { value: "4", symbol: symbol(Filmavimas, "23px", "23px") },
        { value: "5", symbol: symbol(Muge, "23px", "23px") },
        { value: "6", symbol: symbol(RenginysSeimai, "23px", "23px") },
        { value: "7", symbol: symbol(ValstybinisRenginys, "23px", "23px") },
        { value: "8", symbol: symbol(ViesasisRenginys, "23px", "23px") },
      ];

      const uniqueValueInfosBig = uniqueValueInfos.map((info) => ({
        ...info,
        symbol: symbol(info.symbol.url, "30px", "30px"),
      }));

      const simpleRenderer = {
        type: "unique-value",
        field: "KATEGORIJA",
        uniqueValueInfos,
      };

      const simpleRendererBig = {
        type: "unique-value",
        field: "KATEGORIJA",
        uniqueValueInfos: uniqueValueInfosBig,
      };

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
            view.map.basemap.id === "basemap"
              ? view.zoom <= 11
                ? simpleRendererBig
                : view.zoom <= 16
                ? simpleRenderer
                : simpleRendererPolygon
              : view.zoom <= 3.5
              ? simpleRendererBig
              : view.zoom <= 6.5
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
