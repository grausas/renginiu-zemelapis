import { Text, Flex, Box } from "@chakra-ui/react";

export default function Card({ data }) {
  return data.map((feature: any) => {
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
        borderRadius="sm"
        shadow="base"
        mb="2"
      >
        <Text>{startDate} - </Text>
        <Text>{endDate}</Text>
      </Flex>
    );
  });
}
