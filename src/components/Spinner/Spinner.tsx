import { Spinner as Loader } from "@chakra-ui/react";

export default function Spinner() {
  return (
    <Loader
      color="orange"
      size={{ base: "lg", md: "xl" }}
      position="absolute"
      top="calc(50% - 25px)"
      left="calc(50% - 25px)"
      label="loading..."
      zIndex={2}
    />
  );
}
