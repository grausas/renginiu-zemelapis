import { useState, useContext } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  FormControl,
  InputRightElement,
  Image,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import { AuthContext } from "../context/auth";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const auth: any = useContext(AuthContext);

  const handleLogin = () => {
    auth.login(user);
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  const basicBoxStyles = {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    marginTop: "50px",
    justifyContent: "center",
    textAlign: "center",
    color: "brand.white",
    textShadow: "0 0 20px black",
    fontWeight: "bold",
    fontSize: { base: "4xl", md: "6xl" },
    px: 4,
  };

  return (
    <Stack
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
      bg={"brand.grey"}
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg="brand.white"
          p="6"
          borderRadius="md"
          shadow="md"
        >
          <Heading fontSize={"2xl"}>Prisijungti prie savo paskyros</Heading>
          <FormControl id="email">
            <FormLabel>Prisijungimo vardas</FormLabel>
            <Input
              type="username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Slaptažodis</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                  {showPassword ? "Slėpti" : "Rodyti"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={6}>
            <Button
              colorScheme={"blue"}
              variant={"solid"}
              onClick={handleLogin}
            >
              Prisijungti
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1} position="relative">
        <Box sx={basicBoxStyles} filter="auto" brightness="80%">
          Vilniaus miesto renginių žemėlapis
        </Box>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1578845832207-b74a206ac25d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
