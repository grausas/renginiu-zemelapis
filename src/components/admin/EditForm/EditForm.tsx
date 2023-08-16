import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Input,
  Button,
  CloseButton,
  FormLabel,
  FormControl,
  InputGroup,
  InputLeftAddon,
  Select,
  Flex,
  Checkbox,
  useDisclosure,
  List,
  ListItem,
  useOutsideClick,
  Tooltip,
  Text,
  Alert,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { UpdateFeature } from "../../../helpers/updateFeature";
import { DeleteFeature } from "../../../helpers/deleteFeature";
import { CategoryData } from "../../../utils/Category";
import { queryFeatures } from "../../../queries/queryFeatures";
import { featureLayerPrivate } from "../../../layers";
import DatePicker from "../DatePicker/DatePicker";
import FileUpload from "../FileUpload/FileUpload";
import { AttachmentIcon, WarningTwoIcon, DeleteIcon } from "@chakra-ui/icons";
import InfoModal from "../InfoModal/InfoModal";
import { gLayer } from "../../../helpers/drawPolygons";

type FormValues = {
  PAVADINIMAS: string;
  ORGANIZATORIUS: string;
  PASTABOS: string;
  APRASYMAS: string;
  WEBPAGE: string;
  RENGINIO_PRADZIA: string;
  RENGINIO_PABAIGA: string;
  KATEGORIJA: number;
  KASMETINIS: number;
  ILGALAIKIS: number;
  Savaites_dienos: string;
  PAPILD_INF: string;
  Attachments?: BlobPart[];
  OBJECTID: number;
  GlobalID: string;
};

type ToastState = {
  text: string;
  status: "info" | "success" | "error";
};

type Form = {
  geometry: __esri.Geometry | undefined;
  setGeometry: React.Dispatch<
    React.SetStateAction<__esri.Geometry | undefined>
  >;
  isOpen: boolean;
  onClose: () => void;
  editData: any;
  newGeometry: any;
};

export default function EditForm({
  geometry,
  setGeometry,
  isOpen,
  onClose,
  editData,
  newGeometry,
}: Form) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const {
    isOpen: geometryErrorOpen,
    onClose: geometryErrorClose,
    onOpen: geometryErrorOnOpen,
  } = useDisclosure();
  const {
    isOpen: isOpenSuggestions,
    onOpen: onOpenSuggestions,
    onClose: onCloseSuggestions,
  } = useDisclosure();
  const {
    isOpen: isOpenSuggestions2,
    onOpen: onOpenSuggestions2,
    onClose: onCloseSuggestions2,
  } = useDisclosure();

  const [suggestions, setSuggestions] = useState<__esri.Graphic[]>([]);

  const [checkedLong, setCheckedLong] = useState(false);
  const [endDate, setEndDate] = useState(
    new Date(editData.graphic.attributes.RENGINIO_PABAIGA)
  );
  const [startDate, setStartDate] = useState(
    new Date(editData.graphic.attributes.RENGINIO_PRADZIA)
  );
  const [successText, setSuccessText] = useState<ToastState>({
    text: "",
    status: "info",
  });
  const ref = useRef(null);
  useOutsideClick({
    ref,
    handler: () => {
      onCloseSuggestions();
      onCloseSuggestions2();
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      ILGALAIKIS: editData.graphic.attributes.ILGALAIKIS,
      KASMETINIS: editData.graphic.attributes.KASMETINIS,
      KATEGORIJA: editData.graphic.attributes.KATEGORIJA,
      Savaites_dienos: editData.graphic.attributes.Savaites_dienos,
      PAVADINIMAS: editData.graphic.attributes.PAVADINIMAS,
      ORGANIZATORIUS: editData.graphic.attributes.ORGANIZATORIUS,
      PASTABOS: editData.graphic.attributes.PASTABOS,
      PAPILD_INF: editData.graphic.attributes.PAPILD_INF,
      APRASYMAS: editData.graphic.attributes.APRASYMAS,
      WEBPAGE: editData.graphic.attributes.WEBPAGE,
      OBJECTID: editData.graphic.attributes.OBJECTID,
      GlobalID: editData.graphic.attributes.GlobalID,
    },
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const name = e.target.name;
    const value = e.target.value;
    if (value.length > 1) {
      const whereParams = `${name} LIKE '%${value}%'`;
      queryFeatures(featureLayerPrivate(), whereParams).then((data) => {
        if (name === "PAVADINIMAS") {
          onOpenSuggestions();
        } else {
          onOpenSuggestions2();
        }
        setSuggestions(data);
      });
    } else {
      onCloseSuggestions();
      onCloseSuggestions2();
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (successText.text !== "") {
      const { text, status } = successText;

      toast({
        description: text,
        status: status,
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  }, [successText, toast]);

  const onSubmit = handleSubmit(async (data) => {
    if (geometry === undefined) {
      geometryErrorOnOpen();
    } else {
      const nGeometry: any = geometry;
      if (newGeometry !== undefined) {
        newGeometry.rings.map((ring: any) => {
          nGeometry.addRing(ring);
        });
      }
      setLoading(true);
      geometryErrorClose();
      data.RENGINIO_PRADZIA = startDate.toISOString();
      data.RENGINIO_PABAIGA = endDate.toISOString();
      const attachments = data.Attachments;
      delete data.Attachments;
      const results = await UpdateFeature(data, attachments, nGeometry);
      if (results === "success") {
        setLoading(false);
        setSuccessText({
          text: "Renginys sėkmingai sukurtas",
          status: "success",
        });
        gLayer.removeAll();
        setGeometry(undefined);
        window.location.reload();
      } else {
        setLoading(false);
        setSuccessText({ text: "Įvyko klaida", status: "error" });
      }
    }
  });

  const files: any = watch("Attachments");

  return (
    <>
      {isOpen && (
        <Box
          position="absolute"
          bottom="5"
          maxW="700px"
          w="100%"
          maxH={{ base: "450px", xl: "700px" }}
          // h="400px"
          right="3"
          bg="brand.white"
          pt="6"
          pb="3"
          px="3"
          borderRadius="md"
          shadow="md"
          overflow="auto"
        >
          {geometryErrorOpen && (
            <Alert status="error" fontSize="sm" m="0 auto" w="90%">
              <WarningTwoIcon color="red" mr="1" />
              Nenubraižyta renginio geometrija žemėlapyje.
              <CloseButton
                alignSelf="flex-start"
                position="absolute"
                right={-1}
                top={-1}
                onClick={geometryErrorClose}
              />
            </Alert>
          )}
          <InfoModal />
          <CloseButton
            position="absolute"
            right="0"
            top="0"
            onClick={onClose}
          />
          <>
            <Flex alignItems="flex-start" mb="2" gap="2">
              <Box zIndex="22">
                <FormLabel m="0">Pradžios data</FormLabel>
                <Controller
                  control={control}
                  name="RENGINIO_PRADZIA"
                  render={() => (
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      showMonthDropdown
                      showMonth
                      showYearDropdown
                      dropdownMode="select"
                      selectedDate={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        if (date > endDate) {
                          setEndDate(date);
                        }
                      }}
                      inputType="date"
                    />
                  )}
                />
              </Box>
              <Box zIndex="22">
                <FormLabel m="0">Pradžios laikas</FormLabel>
                <Controller
                  control={control}
                  name="RENGINIO_PRADZIA"
                  render={() => (
                    <DatePicker
                      dateFormat="HH:mm"
                      showTimeDropdown
                      showTimeSelect
                      showTimeSelectOnly
                      timeFormat="HH:mm"
                      timeIntervals={5}
                      selectedDate={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        if (date > endDate) {
                          setEndDate(date);
                        }
                      }}
                    />
                  )}
                />
              </Box>
              <Flex flexDirection="column">
                <Box mb="1">
                  <Checkbox
                    onChange={(e) => {
                      setValue("ILGALAIKIS", e.target.checked ? 1 : 2);
                      setCheckedLong(!checkedLong);
                    }}
                  >
                    Ilgalaikis renginys
                  </Checkbox>
                </Box>
              </Flex>
            </Flex>
            <Flex alignItems="center" w="100%" mb="2" gap="2">
              <Box>
                <FormLabel m="0">Pabaigos data</FormLabel>
                <Controller
                  control={control}
                  name="RENGINIO_PABAIGA"
                  render={() => (
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      showMonthDropdown
                      showMonth
                      showYearDropdown
                      dropdownMode="select"
                      selectedDate={endDate}
                      onChange={(date) => setEndDate(date)}
                      inputType="date"
                      minDate={startDate}
                    />
                  )}
                />
              </Box>
              <Box>
                <FormLabel m="0">Pabaigos laikas</FormLabel>
                <Controller
                  control={control}
                  name="RENGINIO_PABAIGA"
                  render={() => (
                    <DatePicker
                      dateFormat="HH:mm"
                      showTimeDropdown
                      showTimeSelect
                      showTimeSelectOnly
                      timeFormat="HH:mm"
                      timeIntervals={5}
                      selectedDate={endDate}
                      onChange={(date) => setEndDate(date)}
                      minTime={
                        endDate.getDate() ===
                        new Date(startDate ?? new Date().getTime()).getDate()
                          ? startDate
                          : new Date().setHours(0, 0, 0)
                      }
                      maxTime={new Date().setHours(23, 59, 59)}
                    />
                  )}
                />
              </Box>
            </Flex>

            <Flex gap="2">
              <FormControl mb="2" w="100%" position="relative" isRequired>
                <FormLabel m="0">Pavadinimas</FormLabel>
                <Input
                  {...register("PAVADINIMAS", {
                    required: "Pavadinimas yra būtinas",
                  })}
                  onChange={handleChange}
                />
                {isOpenSuggestions && (
                  <List
                    ref={ref}
                    position="absolute"
                    bg="brand.white"
                    zIndex="2"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    overflow="auto"
                    maxH="220px"
                    w="100%"
                  >
                    {suggestions
                      .filter(
                        (obj, index) =>
                          suggestions.findIndex(
                            (item) =>
                              item.attributes.PAVADINIMAS ===
                              obj.attributes.PAVADINIMAS
                          ) === index
                      )
                      .slice(0, 5)
                      .map((suggestion) => (
                        <ListItem
                          _hover={{ bg: "gray.200" }}
                          py="1"
                          px="2"
                          key={suggestion.attributes.OBJECTID}
                          onClick={() => {
                            onCloseSuggestions();
                            setValue(
                              "PAVADINIMAS",
                              suggestion.attributes.PAVADINIMAS
                            );
                          }}
                        >
                          {suggestion.attributes.PAVADINIMAS}
                        </ListItem>
                      ))}
                  </List>
                )}
                <Box color="red" fontSize="sm">
                  {errors?.PAVADINIMAS && <p>{errors.PAVADINIMAS.message}</p>}
                </Box>
              </FormControl>
              <FormControl mb="2" w="100%" position="relative" isRequired>
                <FormLabel m="0">Organizatorius</FormLabel>
                <Input
                  {...register("ORGANIZATORIUS", {
                    required: "Organizatorius yra būtinas",
                  })}
                  onChange={handleChange}
                />
                {isOpenSuggestions2 && (
                  <List
                    ref={ref}
                    position="absolute"
                    bg="brand.white"
                    zIndex="2"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    overflow="auto"
                    maxH="220px"
                    w="100%"
                  >
                    {suggestions
                      .filter(
                        (obj, index) =>
                          suggestions.findIndex(
                            (item) =>
                              item.attributes.ORGANIZATORIUS ===
                              obj.attributes.ORGANIZATORIUS
                          ) === index
                      )
                      .slice(0, 5)
                      .map((suggestion) => (
                        <ListItem
                          _hover={{ bg: "gray.200" }}
                          py="1"
                          px="2"
                          key={suggestion.attributes.OBJECTID}
                          onClick={() => {
                            onCloseSuggestions2();
                            setValue(
                              "ORGANIZATORIUS",
                              suggestion.attributes.ORGANIZATORIUS
                            );
                          }}
                        >
                          {suggestion.attributes.ORGANIZATORIUS}
                        </ListItem>
                      ))}
                  </List>
                )}
                <Box color="red" fontSize="sm">
                  {errors?.ORGANIZATORIUS && (
                    <p>{errors.ORGANIZATORIUS.message}</p>
                  )}
                </Box>
              </FormControl>
            </Flex>
            <Flex gap="2">
              <Box mb="2" w="100%">
                <FormLabel m="0">Kategorija</FormLabel>
                <Select
                  {...register("KATEGORIJA", { valueAsNumber: true })}
                  defaultValue={Number(editData.graphic.attributes.KATEGORIJA)}
                >
                  {CategoryData.map((category) => (
                    <option
                      typeof="number"
                      value={category.value}
                      key={category.id}
                    >
                      {category.text}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box w="100%">
                <FormLabel m="0">Renginio tinklapis</FormLabel>
                <InputGroup mb="2">
                  <InputLeftAddon children="https://" fontSize="sm" />
                  <Input {...register("WEBPAGE")} />
                </InputGroup>
              </Box>
            </Flex>
            <Flex mb="2" gap="2">
              <Box w="100%">
                <FormLabel m="0">Gauta</FormLabel>
                <Input {...register("PASTABOS")} />
              </Box>
              <Box w="100%">
                <FormLabel m="0">Aprašymas</FormLabel>
                <Input {...register("APRASYMAS")} />
              </Box>
            </Flex>
            <Flex mb="2" gap="2">
              <Box w="100%">
                <FormLabel m="0">
                  Papildoma informacija{" "}
                  <Tooltip label="Nematomas viešai">*</Tooltip>{" "}
                </FormLabel>
                <Input {...register("PAPILD_INF")} />
              </Box>
              <Box w="100%">
                <FormLabel m="0">Priedai</FormLabel>
                <FileUpload
                  accept={"image/*, application/pdf"}
                  multiple
                  register={register("Attachments")}
                >
                  <Button
                    leftIcon={<AttachmentIcon />}
                    variant="outline"
                    w="100%"
                    fontSize="sm"
                  >
                    Pridėti priedus
                  </Button>
                </FileUpload>
                <Flex>
                  {files &&
                    [...files].map((file, index) => (
                      <Text mr="1" fontSize="xs" key={index}>
                        {file.name}
                      </Text>
                    ))}
                </Flex>
              </Box>
            </Flex>
          </>
          <Flex justify="space-between">
            <Popover>
              <PopoverTrigger>
                <Button mt="2" colorScheme="red" leftIcon={<DeleteIcon />}>
                  Ištrinti renginį
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>
                  Ar tikrai norite ištrinti šį renginį?
                </PopoverHeader>
                <PopoverBody display="flex" justifyContent="flex-end">
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => {
                      DeleteFeature(editData.graphic.attributes.OBJECTID);
                      window.location.reload();
                    }}
                  >
                    Ištrinti
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Button
              mt="2"
              onClick={onSubmit}
              isLoading={loading}
              loadingText="Laukite"
            >
              Atnaujinti
            </Button>
          </Flex>
        </Box>
      )}
    </>
  );
}
