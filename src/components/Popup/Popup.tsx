import {
  Box,
  CloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

export default function Popup({ popupData }: any) {
  // const data = popupData[0];
  // console.log("data", data);
  return (
    <Accordion
      position="absolute"
      top="75px"
      maxW="400px"
      right="50px"
      bg="brand.white"
      p="5"
      borderRadius="md"
      shadow="md"
    >
      <Box position="absolute" top="1" right="1">
        <CloseButton size="sm" />
      </Box>
      {popupData?.map((item: any) => (
        <AccordionItem key={item.graphic.attributes.OBJECTID}>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {item.graphic.attributes.PAVADINIMAS}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {item.graphic.attributes.KATEGORIJA}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
