import { ChangeEvent, useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  CloseButton,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Select,
  Flex,
  Checkbox,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { AddFeature } from "../../../helpers/addFeature";
import { CategoryData } from "../../../utils/Category";
import { weekDays } from "../../../utils/WeekDays";
import { queryFeatures } from "../../../queries/queryFeatures";
import { featureLayerPrivate } from "../../../layers";
import { getWeekDays } from "../../../helpers/getWeekDays";
import DatePicker from "../DatePicker/DatePicker";

type FormValues = {
  PAVADINIMAS: string;
  ORGANIZATORIUS: string;
  PASTABOS: string;
  APRASYMAS: string;
  WEBPAGE: string;
  RENGINIO_PRADZIA: string;
  RENGINIO_PABAIGA: string;
  KATEGORIJA: number;
  Savaites_dienos: string[] | string;
  Att: HTMLInputElement;
};

export default function Form() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [suggestions, setSuggestions] = useState<__esri.Graphic[]>([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    weekDays.map(() => false)
  );
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const name = e.target.name;
    const value = e.target.value;
    const whereParams = `${name} LIKE '%${value}%'`;
    queryFeatures(featureLayerPrivate(), whereParams).then((data) => {
      setSuggestions(data);
    });
  };

  const handleChangeSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setCheckedAll(false);
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = event.target.checked;
    setCheckedItems(newCheckedItems);
  };

  useEffect(() => {
    setCheckedAll(false);
    const dates = getWeekDays(startDate, endDate);

    const newCheckedItems = weekDays.map(() => false);
    dates.map((day) => {
      console.log("day", day);
      newCheckedItems[day === 0 ? 6 : day - 1] = true;
      setCheckedItems(newCheckedItems);
    });
  }, [endDate, startDate]);

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const all = weekDays.map((day) => day.id.toString());
    setCheckedAll(isChecked);
    setValue("Savaites_dienos", isChecked ? all : []);
    setCheckedItems(
      isChecked ? weekDays.map(() => true) : weekDays.map(() => false)
    );
  };

  console.log("suggestions", suggestions);
  console.log("errors", errors);
  const onSubmit = handleSubmit((data) => {
    const dataToSubmit = data.Savaites_dienos.toString();
    data.Savaites_dienos = dataToSubmit;
    data.RENGINIO_PRADZIA = startDate.toISOString();
    data.RENGINIO_PABAIGA = endDate.toISOString();
    const att = data.Att;
    delete data.Att;
    AddFeature(data, att);
  });

  return (
    <>
      <Button
        position="absolute"
        bg="brand.white"
        shadow="md"
        right="3"
        top="130px"
        size="sm"
        onClick={onOpen}
      >
        Užpildyti formą
      </Button>
      {isOpen && (
        <Box
          position="absolute"
          bottom="5"
          maxW="500px"
          w="100%"
          right="3"
          bg="brand.white"
          p="5"
          borderRadius="md"
          shadow="md"
        >
          <CloseButton
            position="absolute"
            right="0"
            top="0"
            onClick={onClose}
          />
          <FormControl>
            <div>Pradžios data: {startDate ? startDate.toISOString() : ""}</div>
            <div>Pabaigos data: {endDate ? endDate.toISOString() : ""}</div>
            <Flex
              alignItems="flex-start"
              justify="space-between"
              w="100%"
              mb="2"
            >
              <Box zIndex="4">
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
                      onChange={(date) => setStartDate(date)}
                      inputType="date"
                    />
                  )}
                />
              </Box>
              <Box zIndex="3">
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
                      selectedDate={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  )}
                />
              </Box>
            </Flex>
            <Flex
              alignItems="flex-start"
              justify="space-between"
              w="100%"
              mb="2"
            >
              <Box zIndex="2">
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
              <Box zIndex="1">
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
                      selectedDate={endDate}
                      onChange={(date) => setEndDate(date)}
                    />
                  )}
                />
              </Box>
            </Flex>
            {/* <Input
              lang="lt-LT"
              type="datetime-local"
              {...register("RENGINIO_PRADZIA", {
                required: "Renginio pradžia yra būtina",
              })}
            /> */}
            {/* <Box color="red" fontSize="sm">
              {errors?.RENGINIO_PRADZIA && (
                <p>{errors.RENGINIO_PRADZIA.message}</p>
              )}
            </Box> */}
            {/* <FormLabel>Renginio pabaiga *</FormLabel>
            <Input
              type="datetime-local"
              {...register("RENGINIO_PABAIGA", {
                required: "Renginio pabaiga yra būtina",
              })}
              min={watch().RENGINIO_PRADZIA}
            /> */}
            {/* <Box color="red" fontSize="sm">
              {errors?.RENGINIO_PABAIGA && (
                <p>{errors.RENGINIO_PABAIGA.message}</p>
              )}
            </Box> */}
            <Box mb="2">
              <FormLabel m="0">Savaitės dienos</FormLabel>
              <Flex flexWrap="wrap">
                <Checkbox
                  isChecked={checkedAll}
                  onChange={(e) => handleSelectAll(e)}
                  mr="2"
                >
                  Visos
                </Checkbox>
                {weekDays.map((day, index) => (
                  <Checkbox
                    {...register("Savaites_dienos", {
                      required: "Savaitės dienos yra privalomos",
                    })}
                    key={day.id}
                    value={day.id}
                    mr="2"
                    isChecked={checkedItems[index]}
                    onChange={(e) => handleChangeSelect(e, index)}
                  >
                    {day.name}
                  </Checkbox>
                ))}
              </Flex>
              <Box color="red" fontSize="sm">
                {errors?.Savaites_dienos && (
                  <p>{errors.Savaites_dienos.message}</p>
                )}
              </Box>
            </Box>
            <Box mb="2">
              <FormLabel m="0">Kategorija</FormLabel>
              <Select {...register("KATEGORIJA")}>
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
            <Box mb="2">
              <FormLabel m="0">Pavadinimas *</FormLabel>
              <Input
                {...register("PAVADINIMAS", {
                  required: "Pavadinimas yra būtinas",
                })}
                onChange={handleChange}
              />
              <Box color="red" fontSize="sm">
                {errors?.PAVADINIMAS && <p>{errors.PAVADINIMAS.message}</p>}
              </Box>
            </Box>
            <Box mb="2">
              <FormLabel m="0">Organizatorius *</FormLabel>
              <Input
                {...register("ORGANIZATORIUS", {
                  required: "Organizatorius yra būtinas",
                })}
              />
              <Box color="red" fontSize="sm">
                {errors?.ORGANIZATORIUS && (
                  <p>{errors.ORGANIZATORIUS.message}</p>
                )}
              </Box>
            </Box>
            <FormLabel m="0">Gauta</FormLabel>
            <Input {...register("PASTABOS")} mb="2" />
            <FormLabel m="0">Aprašymas</FormLabel>
            <Input {...register("WEBPAGE")} mb="2" />
            <FormLabel m="0">Renginio tinklapis</FormLabel>
            <InputGroup mb="2">
              <InputLeftAddon children="https://" />
              <Input {...register("WEBPAGE")} />
            </InputGroup>
            <FormLabel m="0">Priedai</FormLabel>
            {/* <FileUpload props={...register("Att")} /> */}
            <Input
              type="file"
              multiple
              {...register("Att")}
              mb="2"
              sx={{
                "::file-selector-button": {
                  height: 10,
                  padding: 0,
                  mr: 4,
                  background: "none",
                  border: "none",
                  fontWeight: "bold",
                },
              }}
            />
          </FormControl>
          <Flex justify="space-between">
            <Button mt="2" onClick={onSubmit} variant="outline">
              Atšaukti
            </Button>
            <Button mt="2" onClick={onSubmit}>
              Pridėti
            </Button>
          </Flex>
        </Box>
      )}
    </>
  );
}
