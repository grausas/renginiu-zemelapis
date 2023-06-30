import { ChangeEvent, useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import { AddFeature } from "../../../helpers/addFeature";
import { CategoryData } from "../../../utils/Category";
import { weekDays } from "../../../utils/WeekDays";
import { queryFeatures } from "../../../queries/queryFeatures";
import { featureLayerPrivate } from "../../../layers";
import FileUpload from "../FileUpload/FileUpload";

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

  const {
    register,
    handleSubmit,
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
            <FormLabel>Renginio pradžia *</FormLabel>
            <Input
              lang="lt-LT"
              type="datetime-local"
              {...register("RENGINIO_PRADZIA", {
                required: "Renginio pradžia yra būtina",
              })}
            />
            <Box color="red" fontSize="sm">
              {errors?.RENGINIO_PRADZIA && (
                <p>{errors.RENGINIO_PRADZIA.message}</p>
              )}
            </Box>
            <FormLabel>Renginio pabaiga *</FormLabel>
            <Input
              type="datetime-local"
              {...register("RENGINIO_PABAIGA", {
                required: "Renginio pabaiga yra būtina",
              })}
              min={watch().RENGINIO_PRADZIA}
            />
            <Box color="red" fontSize="sm">
              {errors?.RENGINIO_PABAIGA && (
                <p>{errors.RENGINIO_PABAIGA.message}</p>
              )}
            </Box>
            <FormLabel>Savaitės dienos</FormLabel>
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
            <FormLabel>Kategorija</FormLabel>
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
            <FormLabel>Pavadinimas *</FormLabel>
            <Input
              {...register("PAVADINIMAS", {
                required: "Pavadinimas yra būtinas",
              })}
              onChange={handleChange}
            />
            <Box color="red" fontSize="sm">
              {errors?.PAVADINIMAS && <p>{errors.PAVADINIMAS.message}</p>}
            </Box>
            <FormLabel>Organizatorius *</FormLabel>
            <Input
              {...register("ORGANIZATORIUS", {
                required: "Organizatorius yra būtinas",
              })}
            />
            <Box color="red" fontSize="sm">
              {errors?.ORGANIZATORIUS && <p>{errors.ORGANIZATORIUS.message}</p>}
            </Box>
            <FormLabel>Gauta</FormLabel>
            <Input {...register("PASTABOS")} />
            <FormLabel>Aprašymas</FormLabel>
            <Input {...register("WEBPAGE")} />
            <FormLabel>Renginio tinklapis</FormLabel>
            <InputGroup>
              <InputLeftAddon children="https://" />
              <Input {...register("WEBPAGE")} />
            </InputGroup>
            <FormLabel>Priedai</FormLabel>
            {/* <FileUpload /> */}
            <Input type="file" {...register("Att")} />
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
