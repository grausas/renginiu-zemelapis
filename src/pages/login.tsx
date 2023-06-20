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
  Text,
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

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
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
        {/* <Box
          position="absolute"
          bg="brand.white"
          left="-35%"
          top="10%"
          boxShadow="md"
          px="2"
          opacity={0.8}
        >
          <Text
            fontSize={{ base: "md", md: "5xl" }}
            textTransform="uppercase"
            color="brand.dark"
          >
            Vilniaus miesto renginių žemėlapis
          </Text>
        </Box> */}
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
