import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function Search() {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" alignItems={"center"}>
        <SearchIcon color="gray.400" />
      </InputLeftElement>
      <Input
        variant="filled"
        placeholder="Ieškoti renginio"
        fontSize={{ base: "sm", md: "md" }}
        shadow="md"
        bg="brand.white"
        pl="8"
        borderRadius="md"
      />
    </InputGroup>
  );
}
