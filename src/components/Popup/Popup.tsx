import { Box, Icon, CloseButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export default function Popup({ popupData }: any) {
  const data = popupData[0];
  console.log("data", data);
  return (
    <Box
      position="absolute"
      top="75px"
      right="50px"
      bg="brand.white"
      p="5"
      borderRadius="md"
      shadow="md"
    >
      <Box position="absolute" top="1" right="1">
        <CloseButton size="sm" />
      </Box>
      {data.graphic.attributes.PAVADINIMAS}
    </Box>
  );
}
