import { Text, Flex, Image, Box } from "@chakra-ui/react";
import { sortByDate } from "../../helpers/sortBydate";
import { CategoryData } from "../../utils/Category";

interface CardProps {
  data: __esri.Graphic[];
}

export default function Card({ data }: CardProps) {
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
        border="1px solid"
        borderColor="gray.200"
        p="3"
        borderRadius="md"
        shadow="base"
        mb="2"
        flexDirection="column"
        // position="relative"
      >
        {CategoryData.map((category) => {
          if (category.value === feature.attributes.KATEGORIJA) {
            return (
              <Flex justify="center" key={category.id}>
                {/* <Box
                  position="absolute"
                  top="calc(50% - 30%)"
                  right="0"
                  bg={category.color}
                  w="4px"
                  h="60%"
                  borderLeftRadius="xl"
                />
                <Box
                  position="absolute"
                  top="calc(50% - 30%)"
                  left="0"
                  bg={category.color}
                  w="4px"
                  h="60%"
                  borderRightRadius="xl"
                /> */}
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
