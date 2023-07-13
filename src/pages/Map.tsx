import React from "react";
import { ArcGISMap } from "../components/Map/Map";
import { Box, Flex, Stack, Text, useRadioGroup } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar/Sidebar";
import Search from "../components/Search/Search";
// import Filter from "../components/Filter/Filter";
import FilterByDate from "../components/FilterByDate/FilterByDate";
import Card from "../components/Card/Card";
import Popup from "../components/Popup/Popup";
import BackButton from "../components/BackButton/BackButton";
import Spinner from "../components/Spinner/Spinner";
import { useContext, useEffect, useState } from "react";
import { whereParamsChange } from "../helpers/whereParams";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter.js";
import FeatureEffect from "@arcgis/core/layers/support/FeatureEffect.js";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import { MapContext } from "../context/map-context";
import { addDays } from "../helpers/addDays";
import NoResults from "../components/NoResults/NoResults";
const Form = React.lazy(() => import("../components/admin/Form/Form"));
const Filter = React.lazy(() => import("../components/Filter/Filter"));
import { AuthContext } from "../context/auth";
const todayStart = new Date(new Date().setHours(0, 0, 0)).getTime();
const todayEnd = new Date(new Date().setHours(23, 59, 59)).getTime();
const defaultWhereParams = `RENGINIO_PRADZIA <= '${todayEnd}' AND RENGINIO_PABAIGA >= '${todayStart}'`;
const options = ["šiandien", "savaitė", "mėnesis"];
import { drawPolygon } from "../helpers/drawPolygons";

export function Map() {
  const [data, setData] = useState<__esri.Graphic[]>([]);
  const [featureLayer, setFeatureLayer] = useState<__esri.FeatureLayer | undefined>();
  const [dateStart, setDateStart] = useState(todayStart);
  const [category, setCategory] = useState<string[]>([]);
  const [dateEnd, setDateEnd] = useState(todayEnd);
  const [loading, setLoading] = useState(true);
  const [whereParams, setWhereParams] = useState(defaultWhereParams);
  const [popupData, setPopupData] = useState<__esri.ViewHit[]>([]);
  const { view } = useContext(MapContext);
  const auth = useContext(AuthContext);
  const array: __esri.Geometry[] = [];

  console.log("dateStart", dateStart);


  const removeFilterEffect = () => {
    const effect = new FeatureEffect({
      excludedEffect: "opacity(100%) ",
    });
    if (featureLayer !== undefined) {
      featureLayer.featureEffect = effect;
    }
  }

  useEffect(() => {
    if (auth.user.token) {
      drawPolygon(view);
    }
  }, [auth.user.token, view]);

  console.log("event.graphic", array);

  useEffect(() => {
    setWhereParams(whereParamsChange(dateStart, dateEnd, category));
  }, [dateStart, dateEnd, category]);

  const queryFeatures = () => {
    const layer = view?.map.layers.getItemAt(0) as __esri.FeatureLayer;
    if (!layer) return;
    setFeatureLayer(layer);

    view
      ?.whenLayerView(layer)
      .then((layerView) => {
        setLoading(true);
        const featureFilter = new FeatureFilter({ where: whereParams });
        console.log(layer);
        console.log("view", view.extent);
        layerView.filter = featureFilter;

        reactiveUtils.when(
          () => !layerView.updating,
          () => {
            // const query = layerView.filter.createQuery();
            // query.geometry = view.extent;
            layerView
              .queryFeatures({
                where: whereParams,
                returnGeometry: true,
                returnM: true,
              })
              .then(({ features }) => {
                console.log("features", features);
                setData(features);
                setLoading(false);
              })
              .catch((error) => {
                setLoading(false);
                console.error(error);
              });
          },
          { once: true }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // query features by where params
  useEffect(() => {
    queryFeatures();
  }, [view, whereParams]);

  // filter events by current day, coming week or month
  const handleChangeDate = (value: string) => {
    setDateStart(todayStart);
    removeFilterEffect();
    setPopupData([]);
    const todayEnd = new Date().setHours(23, 59, 59, 999);
    const dateEnd =
      value === "šiandien"
        ? todayEnd
        : value === "savaitė"
          ? addDays(todayEnd, 7)
          : addDays(todayEnd, 31);
    setDateEnd(dateEnd);
  };
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "šiandien",
    defaultValue: "šiandien",
    onChange: handleChangeDate,
  });
  const group = getRootProps();

  // filter events by category
  const handleFilter = (category: string[], startDate: number, endDate: number) => {
    setDateStart(startDate);
    setDateEnd(endDate);
    setCategory(category);
  };

  useEffect(() => {
    if (view && featureLayer) {
      view.on("click", async (event) => {
        const response = await view.hitTest(event, {
          include: featureLayer,
        });
        if (response.results.length) {
          console.log("response", response);
          const results = response.results;
          const objectIds = results.map(
            (result) => result.graphic.attributes.OBJECTID
          );
          const attachmentQuery = {
            objectIds: objectIds,
            attachmentTypes: ["image/jpeg", "image/png"],
          };
          console.log("objectIds", objectIds);
          await featureLayer.queryAttachments(attachmentQuery).then((attachments) => {
            console.log("attachments", attachments);
            if (Object.keys(attachments).length > 0) {
              results.map((result) => {
                const resultId = result.graphic.attributes.OBJECTID;
                if (attachments[resultId]) {
                  console.log("attachmentsAdd", attachments);
                  result.graphic.set("attachments", attachments[resultId]);
                }
              })
            }
          });

          console.log(results, "features returned");
          view.goTo(
            {
              center: [
                results[0].graphic.geometry.centroid.longitude,
                results[0].graphic.geometry.centroid.latitude,
              ],
              zoom: 18,
            },
            { duration: 400 }
          );
          const filterObjectids = results.map((result) => result.graphic.attributes.OBJECTID);
          const featureFilter = new FeatureFilter({
            objectIds: filterObjectids,
          });
          featureLayer.featureEffect = new FeatureEffect({
            filter: featureFilter,
            excludedEffect: "opacity(20%) ",
          });
          setPopupData(results);
        }
      });
    }
  }, [featureLayer, view]);

  const handleBack = () => {
    setPopupData([]);
    queryFeatures();
    removeFilterEffect();
  }

  return (
    <Flex w="100" h="100%" flexDirection={{ base: "column", md: "row" }}>
      <Sidebar>
        <Stack direction={"row"} spacing="1" px="3" mb="2">
          <Search />
          <Filter handleFilter={handleFilter} />
        </Stack>
        <Flex px="3" mb="2" align="center" justify="space-between">
          <Flex>
            Rodomi{" "}
            <Text mx="1" fontWeight="500">
              {data?.length}
            </Text>
            renginiai
          </Flex>
          <Text ml="1" fontSize="sm">
            {new Date(dateStart).toLocaleDateString("lt-LT")} -{" "} {new Date(dateEnd).toLocaleDateString("lt-LT")}
          </Text>
        </Flex>
        <Flex px="3" justify="space-around" gap="1" {...group}>
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
        <Flex
          flexDirection={{ base: "row", md: "column" }}
          position="relative"
          w="100%"
          h={{ base: "180px", md: "calc(100% - 160px)" }}
          maxH="100%"
          px="3"
          overflow="auto"
          overflowY={{ base: "hidden", md: "auto" }}
          mt="2"
          css={{
            "&::-webkit-scrollbar": {
              height: "8px",
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
            <Spinner />
          ) : data.length > 0 ? (
            popupData.length > 0 ? (
              <>
                <BackButton
                  handleClick={handleBack}
                />
                <Popup popupData={popupData} />
              </>
            ) : (
              <Card data={data} handleClick={(e) => console.log(e)} />
            )
          ) : (
            <NoResults />
          )}
        </Flex>
      </Sidebar>
      <ArcGISMap />
      {auth.user.token && <Form />}
    </Flex>
  );
}
