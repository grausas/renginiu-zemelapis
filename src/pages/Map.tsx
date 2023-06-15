import { ArcGISMap } from "../components/Map/Map";
import {
  Box,
  Flex,
  Stack,
  Text,
  useRadioGroup,
  Spinner,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar/Sidebar";
import Search from "../components/Search/Search";
import Filter from "../components/Filter/Filter";
import FilterByDate from "../components/FilterByDate/FilterByDate";
import Card from "../components/Card/Card";
import { useContext, useEffect, useState } from "react";
import { whereParamsChange } from "../helpers/whereParams";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter.js";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import { MapContext } from "../context/map-context";
import { addDays } from "../helpers/addDays";
import NoResults from "../components/NoResults/NoResults";

const todayStart = new Date(new Date().setHours(0, 0, 0)).getTime();
const todayEnd = new Date(new Date().setHours(23, 59, 59)).getTime();
const defaultWhereParams = `RENGINIO_PRADZIA <= '${todayEnd}' AND RENGINIO_PABAIGA >= '${todayStart}'`;
const options = ["dienos", "savaitės", "mėnesio"];

export function Map() {
  const [data, setData] = useState<__esri.Graphic[]>([]);
  const [dateStart, setDateStart] = useState(todayStart);
  const [category, setCategory] = useState<string[]>([]);
  const [dateEnd, setDateEnd] = useState(todayEnd);
  const [loading, setLoading] = useState(true);
  const [whereParams, setWhereParams] = useState(defaultWhereParams);
  const { view } = useContext(MapContext);

  useEffect(() => {
    setWhereParams(whereParamsChange(dateStart, dateEnd, category));
  }, [dateStart, dateEnd, category]);

  // query features
  //   const query = useCallback(
  //     async (layer: __esri.FeatureLayer) => {
  //       setData([]);
  //       try {
  //         const features = await queryFeatures(layer, whereParams);
  //         setData(features);
  //       } catch (err) {
  //         console.log("erorr", err);
  //       }
  //     },
  //     [whereParams]
  //   );

  //   useEffect(() => {
  //     query(featureLayerPublic());
  //   }, [query]);

  // query features by where params
  useEffect(() => {
    view
      ?.whenLayerView(view.map.layers.getItemAt(0) as __esri.FeatureLayer)
      .then((layerView) => {
        setLoading(true);
        const filter = new FeatureFilter({
          where: whereParams,
        });
        layerView.filter = filter;
        reactiveUtils.when(
          () => !layerView.updating,
          () => {
            const queryParams = layerView.filter.createQuery();
            queryParams.geometry = view.extent;
            layerView
              .queryFeatures({ where: whereParams })
              .then(function (results: __esri.FeatureSet) {
                setData(results.features);
                setLoading(false);
              })
              .catch(function (error: string) {
                setLoading(false);
                console.log("error", error);
              });
          },
          { once: true }
        );
      })
      .catch(function (error: string) {
        // An error occurred during the layerview creation
        console.log("error", error);
      });
  }, [view, whereParams]);

  // filter events by current day, coming week or month
  const handleChangeDate = (value: string) => {
    if (value === "dienos") {
      setDateEnd(todayEnd);
    } else if (value === "savaitės") {
      setDateEnd(addDays(todayEnd, 7));
    } else {
      setDateEnd(addDays(todayEnd, 31));
    }
  };
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "dienos",
    defaultValue: "dienos",
    onChange: handleChangeDate,
  });
  const group = getRootProps();

  // filter events by category
  const handleFilter = (e: string[]) => {
    setCategory(e);
  };

  return (
    <Box w="100" h="100%">
      <Sidebar>
        <Stack direction={["column", "row"]} spacing="3" px="3" mb="2">
          <Search />
          <Filter handleFilter={handleFilter} />
        </Stack>
        <Flex px="3" mb="2">
          Rodomi{" "}
          <Text mx="1" fontWeight="500">
            {data?.length}
          </Text>{" "}
          renginiai
        </Flex>
        <Flex
          px="3"
          width="100%"
          direction="row"
          justify="space-between"
          {...group}
        >
          {options.map((value) => (
            <FilterByDate
              key={value}
              loading={loading}
              {...getRadioProps({ value })}
            >
              {value}
            </FilterByDate>
          ))}
        </Flex>
        <Box
          h="calc(100% - 120px)"
          px="3"
          overflow="auto"
          mt="2"
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
          {loading ? (
            <Spinner
              color="orange"
              size="xl"
              position="absolute"
              top="30%"
              left="45%"
              label="loading..."
            />
          ) : data.length > 0 ? (
            <Card data={data} />
          ) : (
            <NoResults />
          )}
        </Box>
      </Sidebar>
      <ArcGISMap />
    </Box>
  );
}
