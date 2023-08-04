import { useContext, useLayoutEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { MapContext } from "../../context/map-context";

const ArcGISMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { loadMap } = useContext(MapContext);

  useLayoutEffect(() => {
    if (mapRef.current && loadMap) {
      loadMap(mapRef.current);
    }
  }, [mapRef, loadMap]);

  return (
    <Box
      w={{ base: "100%", md: "calc(100% - 400px)" }}
      h="100%"
      pt={{ base: "20px", md: "60px" }}
      ref={mapRef}
    ></Box>
  );
};

export default ArcGISMap;
