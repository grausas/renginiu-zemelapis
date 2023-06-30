import { Flex, Text, Image } from "@chakra-ui/react";
import { CategoryData } from "../../utils/Category";

export default function Popup({ popupData }: any) {
  return popupData?.map((item: any) => (
    <Flex
      key={item.graphic.attributes.OBJECTID}
      flexDirection={"column"}
      bg="brand.white"
      mb="2"
      mr={{ base: "2", md: "0" }}
      shadow="md"
      p="3"
      borderRadius="md"
      w={{
        base: popupData.length > 1 ? "calc(100%-40px)" : "100vw",
        md: "auto",
      }}
    >
      {CategoryData.map((category) => {
        if (category.value === item.graphic.attributes.KATEGORIJA) {
          return (
            <Flex
              justify="center"
              key={category.id}
              w={{
                base: popupData.length > 1 ? "calc(100%-40px)" : "100vw",
                md: "auto",
              }}
            >
              <Flex
                justify="center"
                bg={category.color}
                align="center"
                px="2"
                py="0.5"
                borderRadius="md"
                color="brand.white"
              >
                <Image src={category.icon} mr="1" boxSize="6" />
                <Text
                  fontWeight="500"
                  letterSpacing="0.8px"
                  fontSize="xs"
                  textTransform="uppercase"
                >
                  {category.text}
                </Text>
              </Flex>
            </Flex>
          );
        }
      })}

      <Text fontWeight="500" my="2">
        {item.graphic.attributes.PAVADINIMAS}
      </Text>
      <Text>Organizatorius: {item.graphic.attributes.ORGANIZATORIUS}</Text>
      <Text>Pradžia: {item.graphic.attributes.RENGINIO_PRADZIA}</Text>
      <Text>Pabaiga: {item.graphic.attributes.RENGINIO_PABAIGA}</Text>
      <Text>{item.graphic.attributes.APRASYMAS}</Text>
      <Text>Gauta {item.graphic.attributes.PASTABOS}</Text>
      <Text>{item.graphic.attributes.WEBSITE}</Text>
    </Flex>
  ));
}
