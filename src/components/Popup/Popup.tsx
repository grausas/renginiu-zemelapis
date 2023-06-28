import { Flex, Text } from "@chakra-ui/react";

export default function Popup({ popupData }: any) {
  // const data = popupData[0];
  // console.log("data", data);
  return popupData?.map((item: any) => (
    <Flex
      key={item.graphic.attributes.OBJECTID}
      flexDirection="column"
      bg="brand.white"
      mb="2"
      mr={{ base: "2", md: "0" }}
      shadow="md"
    >
      <h5>{item.graphic.attributes.PAVADINIMAS}</h5>
      <h5>{item.graphic.attributes.ORGANIZATORIUS}</h5>
      <Text w={{ base: "70vw", md: "auto" }}>
        {item.graphic.attributes.KATEGORIJA}
      </Text>
      <Text>{item.graphic.attributes.RENGINIO_PRADZIA}</Text>
      <Text>{item.graphic.attributes.RENGINIO_PABAIGA}</Text>
      <Text>{item.graphic.attributes.PASTABOS}</Text>
      <Text>{item.graphic.attributes.APRASYMAS}</Text>
    </Flex>
  ));
}
