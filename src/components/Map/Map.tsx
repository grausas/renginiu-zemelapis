import { useContext, useLayoutEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { MapContext } from "../../context/map-context";
import { featureLayerPublic, featureLayerPrivate } from "../../layers";
import { AuthContext } from "../../context/auth";

const ArcGISMap = ({ isOpen }: { isOpen: boolean }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { loadMap } = useContext(MapContext);
  const auth = useContext(AuthContext);

  const layer = auth.user.token ? featureLayerPrivate() : featureLayerPublic();
  useLayoutEffect(() => {
    if (mapRef.current && loadMap) {
      loadMap(mapRef.current, layer);
    }
  }, [mapRef, loadMap, layer]);

  return (
    <Box
      position={{ base: "unset", md: "absolute" }}
      right="0"
      top="60px"
      bottom="0"
      w={{
        base: "100%",
        md: isOpen ? "calc(100% - 20px)" : "calc(100% - 400px)",
      }}
      h={{ base: "100%", md: "calc(100% - 60px)" }}
      pt={{ base: "20px", md: "0px" }}
      ref={mapRef}
    ></Box>
  );
};

export default ArcGISMap;
