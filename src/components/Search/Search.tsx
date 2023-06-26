import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function Search() {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.400" />
      </InputLeftElement>
      <Input
        variant="filled"
        placeholder="Ieškoti renginio"
        fontSize="sm"
        shadow="md"
        bg="brand.white"
      />
    </InputGroup>
  );
}
