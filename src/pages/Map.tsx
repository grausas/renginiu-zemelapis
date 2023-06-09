import { ArcGISMap } from "../components/Map/Map";
import { Box, Stack, Text } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar/Sidebar";
import Search from "../components/Search/Search";
import Filter from "../components/Filter/Filter";
import Card from "../components/Card/Card";
import { queryFeatures } from "../queries/queryFeatures";
import { useEffect, useState } from "react";
import { featureLayerPublic } from "../layers";

const todayStart = new Date(new Date().setHours(0, 0, 0)).toLocaleString(
  "lt-LT"
);
const todayEnd = new Date(new Date().setHours(23, 59, 59)).toLocaleString(
  "lt-LT"
);
const defaultWhereParams = `RENGINIO_PRADZIA <= '${todayEnd}' AND RENGINIO_PABAIGA >= '${todayStart}'`;

export function Map() {
  const [data, setData] = useState<__esri.Graphic[]>([]);
  const [whereParams, setWhereParams] = useState(defaultWhereParams);

  // query features
  const query = async (layer: __esri.FeatureLayer) => {
    setData([]);
    try {
      const features = await queryFeatures(layer, whereParams);
      console.log("features", features);
      setData(features);
    } catch (err) {
      console.log("erorr", err);
    }
  };

  useEffect(() => {
    query(featureLayerPublic());
  }, [whereParams]);

  return (
    <Box w="100" h="100%">
      <Sidebar>
        <Stack direction={["column", "row"]} spacing="3" px="3" mb="2">
          <Search />
          <Filter />
        </Stack>
        <Box px="3" mb="2">
          <Text>Rodomi {data.length} renginiai</Text>
        </Box>
        <Box
          h="calc(100% - 80px)"
          px="3"
          overflow="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#8ccef0",
              borderRadius: "24px",
            },
          }}
        >
          <Card data={data} />
        </Box>
      </Sidebar>
      <ArcGISMap />
    </Box>
  );
}
