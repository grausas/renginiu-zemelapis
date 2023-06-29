import { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Select,
  Flex,
  Checkbox,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AddFeature } from "../../../helpers/addFeature";
import { CategoryData } from "../../../utils/Category";
import { weekDays } from "../../../utils/WeekDays";
import { queryFeatures } from "../../../queries/queryFeatures";
import { featureLayerPrivate } from "../../../layers";

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
};

export default function Form() {
  const [suggestions, setSuggestions] = useState<__esri.Graphic[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    console.log("e", e);
    const name = e.target.name;
    const value = e.target.value;
    const whereParams = `${name} LIKE '%${value}%'`;
    queryFeatures(featureLayerPrivate(), whereParams).then((data) => {
      setSuggestions(data);
    });
  };

  console.log("suggestions", suggestions);
  console.log("errors", errors);
  const onSubmit = handleSubmit((data) => {
    const dataToSubmit = data.Savaites_dienos.toString();
    data.Savaites_dienos = dataToSubmit;
    AddFeature(data);
  });

  return (
    <Box
      position="absolute"
      bottom="75px"
      maxW="500px"
      w="100%"
      right="50px"
      bg="brand.white"
      p="5"
      borderRadius="md"
      shadow="md"
    >
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
          {errors?.RENGINIO_PRADZIA && <p>{errors.RENGINIO_PRADZIA.message}</p>}
        </Box>
        <FormLabel>Renginio pabaiga *</FormLabel>
        <Input
          type="datetime-local"
          {...register("RENGINIO_PABAIGA", {
            required: "Renginio pabaiga yra būtina",
          })}
        />
        <Box color="red" fontSize="sm">
          {errors?.RENGINIO_PABAIGA && <p>{errors.RENGINIO_PABAIGA.message}</p>}
        </Box>
        <FormLabel>Savaitės dienos</FormLabel>
        <Flex flexWrap="wrap">
          {weekDays.map((day) => (
            <Checkbox
              {...register("Savaites_dienos")}
              key={day.id}
              value={day.id}
              mr="2"
            >
              {day.name}
            </Checkbox>
          ))}
        </Flex>
        <FormLabel>Kategorija</FormLabel>
        <Select {...register("KATEGORIJA")}>
          {CategoryData.map((category) => (
            <option typeof="number" value={category.value} key={category.id}>
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
        <Input {...register("PASTABOS")} />
        <FormLabel>Renginio tinklapis</FormLabel>
        <InputGroup>
          <InputLeftAddon children="https://" />
          <Input {...register("WEBPAGE")} />
        </InputGroup>
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
  );
}
