import { Button } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Filter() {
  return (
    <Button
      leftIcon={<HamburgerIcon />}
      color="brand.dark"
      variant="outline"
      px="6"
      fontSize="xs"
      shadow="md"
      textTransform="uppercase"
    >
      Filtrai
    </Button>
  );
}
