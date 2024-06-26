import { useContext } from "react";
import { Text, Flex, Image, Button } from "@chakra-ui/react";
import logo from "../../assets/vilnius_logo.png";
import { AuthContext } from "../../context/auth";

export default function Header() {
  const auth: any = useContext(AuthContext);

  return (
    <Flex
      as="header"
      position="fixed"
      justifyContent="space-between"
      align="center"
      w="100%"
      bg="brand.dark"
      color="brand.white"
      px="3"
      zIndex="22"
      height={{ base: "40px", md: "60px" }}
      shadow="base"
    >
      <Flex align="center">
        <Image
          src={logo}
          boxSize={{ base: "6", md: "9" }}
          mr={{ base: "2", md: "4" }}
        />
        <Text fontSize={{ base: "sm", md: "xl" }} textTransform="uppercase">
          Vilniaus miesto renginių žemėlapis
        </Text>
      </Flex>
      {auth.user.token && (
        <Button onClick={() => auth.logout()} size={{ base: "sm", md: "md" }}>
          Atsijungti
        </Button>
      )}
    </Flex>
  );
}
