import { Flex, Text, Image } from "@chakra-ui/react";
import { CategoryData } from "../../utils/Category";
import ImagePreview from "../ImagePreview/ImagePreview";

interface Popup {
  popupData: __esri.ViewHit[];
}

export default function Popup({ popupData }: Popup) {
  console.log("popupData", popupData);
  return popupData?.map((item: any) => (
    <>
      <Flex
        overflowY="auto"
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

        <Text fontWeight="500" my="2" textAlign="center">
          {console.log("item", item)}
          {item.graphic.attributes.PAVADINIMAS}
        </Text>
        <Text>Organizatorius: {item.graphic.attributes.ORGANIZATORIUS}</Text>
        <Text>Pradžia: {new Date(
          item.graphic.attributes.RENGINIO_PRADZIA
        ).toLocaleString("lt-LT")}</Text>
        <Text>Pabaiga: {new Date(
          item.graphic.attributes.RENGINIO_PABAIGA
        ).toLocaleString("lt-LT")} </Text>
        <Text>{item.graphic.attributes.APRASYMAS}</Text>
        <Text>{item.graphic.attributes.PASTABOS}</Text>
        <Text>{item.graphic.attributes.WEBSITE}</Text>
        {item.graphic.attachments && <ImagePreview url={item.graphic.attachments[0].url} />}
      </Flex>
    </>
  ));
}
