import { ArcGISMap } from "../components/Map/Map";
import { Box } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar/Sidebar";

export function Map() {
  return (
    <Box w="100" h="100%">
      <Sidebar />
      <ArcGISMap />
    </Box>
  );
}
