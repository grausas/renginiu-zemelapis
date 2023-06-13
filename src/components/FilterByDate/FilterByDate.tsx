import { Box, Button, useRadio, Input, Flex } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function FilterByDate(props: any, loading: boolean) {
  const { getInputProps, getRadioProps } = useRadio(props);
  // const loading = true;

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <Input isDisabled={loading} {...input} />
      <Flex
        {...checkbox}
        py={{ base: "1", md: "2" }}
        align="center"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        px={{ base: "5", md: "7" }}
        fontSize="xs"
        shadow="md"
        color="brand.dark"
        textTransform="uppercase"
        _checked={{
          bg: "brand.dark",
          color: "brand.white",
        }}
      >
        {input.checked === true ? <ViewIcon mr="1" /> : <ViewOffIcon mr="1" />}
        {props.children}
      </Flex>
    </Box>
  );
}
