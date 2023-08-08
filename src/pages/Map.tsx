import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import ArcGISMap from "../components/Map/Map";
import { Flex, Stack, Text, useRadioGroup } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar/Sidebar";
import Search from "../components/Search/Search";
import FilterByDate from "../components/FilterByDate/FilterByDate";
import Card from "../components/Card/Card";
import Popup from "../components/Popup/Popup";
import BackButton from "../components/BackButton/BackButton";
import Spinner from "../components/Spinner/Spinner";
import { whereParamsChange } from "../helpers/whereParams";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter.js";
import FeatureEffect from "@arcgis/core/layers/support/FeatureEffect.js";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import Handles from "@arcgis/core/core/Handles.js";
import * as promiseUtils from "@arcgis/core/core/promiseUtils.js";
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
// locale
import * as intl from "@arcgis/core/intl";

export function Map() {
  intl.setLocale("lt");
  const history = useNavigate();
  const [data, setData] = useState<__esri.Graphic[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [featureLayer, setFeatureLayer] = useState<
    __esri.FeatureLayer | undefined
  >();
  const [dateStart, setDateStart] = useState(todayStart);
  const [category, setCategory] = useState<string[]>([]);
  const [dateEnd, setDateEnd] = useState(todayEnd);
  const [loading, setLoading] = useState(true);
  const [whereParams, setWhereParams] = useState(defaultWhereParams);
  const [popupData, setPopupData] = useState<any[]>([]);
  const [geometry, setGeometry] = useState<__esri.Geometry>();
  const [objectId, setObjectId] = useState<number>();
  const { view } = useContext(MapContext);
  const auth = useContext(AuthContext);

  const removeFilterEffect = () => {
    const effect = new FeatureEffect({
      excludedEffect: "opacity(100%) ",
    });
    if (featureLayer !== undefined) {
      featureLayer.featureEffect = effect;
    }
  };

  useEffect(() => {
    if (auth.user.token && featureLayer) {
      drawPolygon(view, setGeometry, featureLayer);
    }
  }, [auth.user.token, view, featureLayer]);

  useEffect(() => {
    setWhereParams(whereParamsChange(dateStart, dateEnd, category));
  }, [dateStart, dateEnd, category]);

  const queryFeatures = async (
    layer: __esri.FeatureLayer,
    layerView: __esri.FeatureLayerView
  ) => {
    setLoading(true);
    const featureFilter = new FeatureFilter({
      where: whereParams,
    });
    layerView.filter = featureFilter;
    await reactiveUtils.whenOnce(() => !layerView?.updating);
    const results = await layerView.queryFeatures({
      // outSpatialReference: view?.spatialReference,
      where: whereParams,
      returnGeometry: true,
      geometry: objectId !== undefined ? undefined : view?.extent,
      objectIds: objectId !== undefined ? [objectId] : [],
      outFields: [
        "APRASYMAS",
        "GlobalID",
        "ILGALAIKIS",
        "KASMETINIS",
        "KATEGORIJA",
        "OBJECTID",
        "ORGANIZATORIUS",
        "PAPILD_INF",
        "PASTABOS",
        "PAVADINIMAS",
        "RENGINIO_PRADZIA",
        "RENGINIO_PABAIGA",
        "Savaites_dienos",
        "WEBPAGE",
      ],
    });
    setData(results.features);
    if (objectId !== undefined) {
      const result = { graphic: results.features[0] };
      await getAttachments([result], layer);
      // const parcelExtent = result.graphic.geometry.extent.clone();
      setPopupData([result]);
    }
    setLoading(false);
  };

  // query features by where params
  useEffect(() => {
    const handles = new Handles();
    if (!view) return;
    const layer = view?.map.layers.getItemAt(0) as __esri.FeatureLayer;
    setFeatureLayer(layer);

    view?.whenLayerView(layer).then(async (layerView) => {
      // initial count
      await queryFeatures(layer, layerView);
      setLoading(false);

      // subsequent map interaction
      handles.add(
        reactiveUtils.watch(
          () => [view.stationary, view.extent],
          ([stationary]) => {
            if (stationary) {
              promiseUtils.debounce(queryFeatures(layer, layerView));
            }
          }
        )
      );
    });

    return () => handles.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whereParams, view]);

  // filter events by current day, coming week or month
  const handleChangeDate = (value: string) => {
    history("/");
    setObjectId(undefined);
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
  const handleFilter = useCallback(
    (category: string[], startDate: number, endDate: number) => {
      setDateStart(startDate);
      setDateEnd(endDate);
      setCategory(category);
    },
    []
  );

  useEffect(() => {
    if (view && featureLayer) {
      view.on("click", async (event) => {
        const response = await view.hitTest(event, {
          include: featureLayer,
        });
        if (response.results.length) {
          const results = response.results;

          await getAttachments(results, featureLayer);

          zoomToFeature(results);
          setPopupData(results);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featureLayer, view]);

  const getAttachments = async (results: any, layer?: __esri.FeatureLayer) => {
    const objectIds = results.map(
      (result: any) => result.graphic.attributes.OBJECTID
    );
    const attachmentQuery = {
      objectIds: objectIds,
    };
    await layer?.queryAttachments(attachmentQuery).then((attachments) => {
      if (Object.keys(attachments).length > 0) {
        results.map((result: any) => {
          const resultId = result.graphic.attributes.OBJECTID;
          if (attachments[resultId]) {
            result.graphic.set("attachments", attachments[resultId]);
          }
        });
      }
    });

    return results;
  };

  const zoomToFeature = async (results: any) => {
    view?.goTo(
      {
        target: results[0].graphic,
        zoom: 17,
      },
      { duration: 400 }
    );

    const filterObjectids = results.map(
      (result: any) => result.graphic.attributes.OBJECTID
    );
    const featureFilter = new FeatureFilter({
      objectIds: filterObjectids,
    });

    const featureEffect = new FeatureEffect({
      filter: featureFilter,
      excludedEffect: "opacity(20%) ",
    });

    if (featureLayer !== undefined) {
      featureLayer.featureEffect = featureEffect;
    }
  };

  const handleBack = () => {
    setObjectId(undefined);
    setPopupData([]);
    removeFilterEffect();
    history("/", { replace: true });
  };

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const objectID = queryParameters.get("objectid");
    const startDate = Number(queryParameters.get("pradzia"));
    const endDate = Number(queryParameters.get("pabaiga"));
    if (objectID) {
      setObjectId(Number(objectID));
      setDateStart(startDate);
      setDateEnd(endDate);
    }
  }, []);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    const filterData = data.filter((item) => {
      return item.attributes.PAVADINIMAS.toLowerCase().includes(
        searchTerm.toLowerCase()
      );
    });
    return filterData;
  }, [searchTerm, data]);

  const handleCard = async (e: __esri.Graphic) => {
    const result = { graphic: e };
    await getAttachments([result], featureLayer);
    zoomToFeature([result]);
    setPopupData([result]);
  };

  return (
    <Flex w="100" h="100%" flexDirection={{ base: "column", md: "row" }}>
      <Sidebar>
        <Stack direction={"row"} spacing="1" px="3">
          <Search
            handleSearch={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            value={searchTerm}
          />
          <Filter
            handleFilter={handleFilter}
            dateEnd={dateEnd}
            dateStart={dateStart}
          />
        </Stack>
        <Flex
          px="3"
          my={{ base: "1", md: "2" }}
          align="center"
          justify="space-between"
        >
          <Flex fontSize={{ base: "sm", md: "md" }}>
            Rodomi{" "}
            <Text mx="1" fontWeight="500">
              {!loading ? filteredData.length : "..."}
            </Text>
            renginiai
          </Flex>
          <Text ml="1" fontSize="sm">
            {new Date(dateStart).toLocaleDateString("lt-LT")} /{" "}
            {new Date(dateEnd).toLocaleDateString("lt-LT")}
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
          minH={{ base: "120px", md: "calc(100% - 160px)" }}
          h={{ md: popupData.length > 0 ? "100%" : "calc(100% - 160px)" }}
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
          {popupData.length > 0 ? (
            <Flex
              flexDirection="column"
              maxH={{ base: "300px", md: "calc(100% - 160px)" }}
            >
              <BackButton handleClick={handleBack} />
              <Flex
                flexDirection="column"
                h="100%"
                overflow="auto"
                position="relative"
              >
                <Popup popupData={popupData} auth={auth} />
              </Flex>
            </Flex>
          ) : !loading ? (
            filteredData.length > 0 ? (
              <Card data={filteredData} handleClick={handleCard} />
            ) : (
              <NoResults />
            )
          ) : (
            <Spinner />
          )}
        </Flex>
      </Sidebar>
      <ArcGISMap />
      {auth.user.token && (
        <Form geometry={geometry} setGeometry={setGeometry} />
      )}
    </Flex>
  );
}
