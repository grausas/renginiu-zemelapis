import { Box, Text, Icon, Flex } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

export default function NoResults() {
  return (
    <Box
      textAlign="center"
      mt="8"
      border="1px solid"
      borderColor="gray.200"
      p="4"
      borderRadius="md"
    >
      <Flex align="center" justify="center">
        <Icon as={WarningIcon} mr="2" color="orange" boxSize="5" />
        <Text fontSize="xl" lineHeight="2">
          Rezultatų nerasta
        </Text>
      </Flex>
      <Text>Pabandykite pakeisti filtrus ir bandyti iš naujo</Text>
    </Box>
  );
}
