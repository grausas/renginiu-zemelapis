import { Box, useRadio, Input, Flex, UseRadioProps } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface ExtendedUseRadioProps extends UseRadioProps {
  children: React.ReactElement | string;
  loading: boolean;
}

export default function FilterByDate(
  props: ExtendedUseRadioProps
): React.ReactElement {
  const { getInputProps, getRadioProps } = useRadio(props);
  const { loading } = props;

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <Input {...input} disabled={loading} />
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
