import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function Search() {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" alignItems={"center"}>
        <SearchIcon color="gray.400" h="4" mb="1" />
      </InputLeftElement>
      <Input
        placeholder="Ieškoti renginio"
        fontSize="sm"
        shadow="md"
        bg="brand.white"
        pl="8"
        borderRadius="md"
        h="0"
        py="4"
      />
    </InputGroup>
  );
}
