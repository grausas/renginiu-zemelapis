import { useContext, useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { MapContext } from "../../context/map-context";

export function ArcGISMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { loadMap } = useContext(MapContext);

  useEffect(() => {
    if (mapRef.current && loadMap) {
      loadMap(mapRef.current);
    }
  }, [mapRef, loadMap]);

  return <Box w="100%" h="100%" pl="400px" pt="60px" ref={mapRef}></Box>;
}
