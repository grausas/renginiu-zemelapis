import { Flex, Button } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Filter() {
  return (
    <Flex px="3" w="100%" justify="space-between">
      <Button
        leftIcon={<ViewIcon />}
        variant="outline"
        px="6"
        fontSize="xs"
        shadow="md"
        size="sm"
        bg="brand.dark"
        color="brand.white"
        textTransform="uppercase"
      >
        Dienos
      </Button>
      <Button
        leftIcon={<ViewOffIcon />}
        color="brand.dark"
        variant="outline"
        px="6"
        fontSize="xs"
        shadow="md"
        size="sm"
        textTransform="uppercase"
      >
        Savaitės
      </Button>
      <Button
        leftIcon={<ViewOffIcon />}
        color="brand.dark"
        variant="outline"
        px="6"
        fontSize="xs"
        shadow="md"
        size="sm"
        textTransform="uppercase"
      >
        Mėnesio
      </Button>
    </Flex>
  );
}
