import { Text, Flex, Image, Box } from "@chakra-ui/react";
import { sortByDate } from "../../helpers/sortBydate";
import { CategoryData } from "../../utils/Category";
import calendar from "../../assets/calendar.png";

interface CardProps {
  data: __esri.Graphic[];
  handleClick: (feature: __esri.Graphic) => void;
}

export default function Card({ data, handleClick }: CardProps) {
  const sortedData = sortByDate(data);
  return sortedData.map((feature: __esri.Graphic) => {
    const startDate = new Date(
      feature.attributes.RENGINIO_PRADZIA
    ).toLocaleString("lt-LT");
    const endDate = new Date(
      feature.attributes.RENGINIO_PABAIGA
    ).toLocaleString("lt-LT");

    return (
      <Flex
        key={feature.attributes.OBJECTID}
        border="1px solid"
        borderColor="gray.200"
        bg="brand.white"
        p="3"
        borderRadius="md"
        shadow="base"
        mb={{ base: "0", md: "2" }}
        mr={{ base: "1", md: "0" }}
        flexDirection="column"
        onClick={() => {
          handleClick(feature);
        }}
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
                  px="2"
                  py="0.5"
                  borderRadius="md"
                  color="brand.white"
                  w={{ base: "70vw", md: "auto" }}
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
        <Text textAlign="center" py="3" fontWeight="500">
          {feature.attributes.PAVADINIMAS}
        </Text>
        <Flex align="center">
          <Image src={calendar} alt="calendar" w="20px" mr="3" />
          <Box>
            <Text fontSize="sm">{startDate}</Text>
            <Text fontSize="sm">{endDate}</Text>
          </Box>
        </Flex>
      </Flex>
    );
  });
}
