import { Text, Flex, Image, Box } from "@chakra-ui/react";
import { sortByDate } from "../../helpers/sortBydate";
import { CategoryData } from "../../utils/Category";
import calendar from "../../assets/calendar.png";
import { formatStartDate, formatEndDate } from "../../helpers/formatDate";

interface CardProps {
  data: __esri.Graphic[];
  handleClick: (feature: __esri.Graphic) => void;
}

export default function Card({ data, handleClick }: CardProps) {
  const sortedData = sortByDate(data);
  return sortedData.map((feature: __esri.Graphic) => {
    const startDate = new Date(
      feature.attributes.RENGINIO_PRADZIA
    ).toLocaleString("lt-LT", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const endDate = new Date(
      feature.attributes.RENGINIO_PABAIGA
    ).toLocaleString("lt-LT", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <Flex
        key={feature.attributes.OBJECTID}
        border="1px solid"
        borderColor="gray.200"
        bg="brand.white"
        p={{ base: "2", md: "3" }}
        borderRadius="md"
        shadow="base"
        mb={{ base: "0", md: "2" }}
        mr={{ base: "1", md: "0" }}
        flexDirection="column"
        onClick={() => {
          handleClick(feature);
        }}
        _hover={{ bg: "gray.50", cursor: "pointer" }}
      >
        {CategoryData.map((category) => {
          if (category.value === feature.attributes.KATEGORIJA) {
            return (
              <Flex justify="center" key={category.id}>
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
        <Text
          textAlign="center"
          py={{ base: "1", md: "3" }}
          fontWeight="500"
          fontSize={{ base: "sm", md: "md" }}
        >
          {feature.attributes.PAVADINIMAS}
        </Text>
        <Flex align="center">
          <Image src={calendar} alt="calendar" w="20px" mr="3" />
          <Box fontSize="sm">
            <Text>
              {feature.attributes.ILGALAIKIS === 1
                ? formatStartDate(startDate, endDate)
                : startDate}
            </Text>
            <Text>
              {feature.attributes.ILGALAIKIS === 1
                ? formatEndDate(startDate, endDate)
                : endDate}
            </Text>
          </Box>
        </Flex>
      </Flex>
    );
  });
}
