import { Box, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { useForm, Resolver } from "react-hook-form";
import { AddFeature } from "../../../helpers/addFeature";

type FormValues = {
  PAVADINIMAS: string;
  PASTABOS: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: !values.PASTABOS ? {} : values,
    errors: !values.PASTABOS
      ? {
          PASTABOS: {
            type: "required",
            message: "Šis laukelis būtinas",
          },
        }
      : {},
  };
};

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: resolver,
  });

  const onSubmit = handleSubmit((data) => AddFeature(data));

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Box
      position="absolute"
      bottom="75px"
      maxW="400px"
      right="50px"
      bg="brand.white"
      p="5"
      borderRadius="md"
      shadow="md"
    >
      {/* register your input into the hook by invoking the "register" function */}

      <FormControl id="email">
        <FormLabel>Pavadinimas</FormLabel>
        <Input {...register("PAVADINIMAS")} />
      </FormControl>

      {/* include validation with required or other standard HTML validation rules */}

      <FormControl id="email">
        <FormLabel>Pastabos</FormLabel>
        <Input {...register("PASTABOS", { required: true })} />
        {errors?.PASTABOS && <p>{errors.PASTABOS.message}</p>}
      </FormControl>
      {/* errors will return when field validation fails  */}
      <Button onClick={onSubmit}>Submit</Button>
    </Box>
  );
}
