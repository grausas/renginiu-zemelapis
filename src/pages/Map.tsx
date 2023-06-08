import { ArcGISMap } from "../components/Map/Map";
import { Box, Stack } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar/Sidebar";
import Search from "../components/Search/Search";
import Filter from "../components/Filter/Filter";

export function Map() {
  return (
    <Box w="100" h="100%">
      <Sidebar>
        <Stack direction={["column", "row"]} spacing="3">
          <Search />
          <Filter />
        </Stack>
      </Sidebar>
      <ArcGISMap />
    </Box>
  );
}
