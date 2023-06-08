import { Box, Text } from "@chakra-ui/react";

const Sidebar = () => {
  return (
    <Box
      position="absolute"
      left={0}
      px="3"
      pt="80px"
      top={0}
      w="300px"
      h="100%"
      bg="#eee"
    >
      <Text>Sidebar</Text>
    </Box>
  );
};

export default Sidebar;
