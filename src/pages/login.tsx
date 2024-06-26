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
  FormErrorMessage,
} from "@chakra-ui/react";
import { AuthContext } from "../context/auth";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const auth = useContext(AuthContext);

  const handleLogin = () => {
    if (!user.username || !user.password) {
      setError(true);
      return;
    }
    auth.login(user);
  };

  const handleShowClick = () => setShowPassword(!showPassword);

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
          <FormControl
            id="email"
            isRequired
            isInvalid={error && !user.username}
          >
            <FormLabel>Prisijungimo vardas</FormLabel>
            <Input
              type="username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            {error && user.username === "" && (
              <FormErrorMessage>
                Prisijungimo vardas reikalingas
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            id="password"
            isRequired
            isInvalid={error && !user.password}
          >
            <FormLabel>Slaptažodis</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleLogin();
                  }
                }}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                  {showPassword ? "Slėpti" : "Rodyti"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {error && (
              <FormErrorMessage>Slaptažodis reikalingas</FormErrorMessage>
            )}
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
