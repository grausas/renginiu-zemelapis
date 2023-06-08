import { Text, Flex, Image } from "@chakra-ui/react";
import logo from "../../assets/vilnius_logo.png";

export default function Header() {
  return (
    <Flex
      as="header"
      position="fixed"
      align="center"
      w="100%"
      bg="brand.dark"
      color="brand.white"
      px="3"
      zIndex="22"
      height="60px"
    >
      <Image src={logo} maxW="40px" mr="4" />
      <Text fontSize="xl" textTransform="uppercase">
        Vilniaus miesto renginių žemėlapis
      </Text>
    </Flex>
  );
}
