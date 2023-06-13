import { Text, Flex, Image, Box } from "@chakra-ui/react";
import { sortByDate } from "../../helpers/sortBydate";
import { CategoryData } from "../../utils/Category";

export default function Card({ data }: any) {
  const sortedData = sortByDate(data);
  return sortedData.map((feature: __esri.Graphic) => {
    const startDate = new Date(
      feature.attributes.RENGINIO_PRADZIA
    ).toLocaleString();
    const endDate = new Date(
      feature.attributes.RENGINIO_PABAIGA
    ).toLocaleString();

    return (
      <Flex
        key={feature.attributes.OBJECTID}
        border="1px solid #eee"
        p="3"
        borderRadius="md"
        shadow="base"
        mb="2"
        flexDirection="column"
      >
        {CategoryData.map((category) => {
          if (category.value === feature.attributes.KATEGORIJA) {
            return (
              <Flex justify="center">
                <Flex
                  align="center"
                  justify="center"
                  bg={category.color}
                  px="4"
                  py="0.5"
                  borderRadius="md"
                  color="brand.white"
                >
                  <Image src={category.icon} h="6" mr="1" />
                  <Text
                    fontWeight="500"
                    letterSpacing="1px"
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
        <Text textAlign="center" my="2" fontWeight="500">
          {feature.attributes.PAVADINIMAS}
        </Text>
        <Text fontSize="sm">Nuo: {startDate}</Text>
        <Text fontSize="sm">Iki: {endDate}</Text>
      </Flex>
    );
  });
}
