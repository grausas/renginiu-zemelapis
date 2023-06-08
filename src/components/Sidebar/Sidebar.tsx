import React from "react";
import { Box } from "@chakra-ui/react";
interface Sidebar {
  children: React.ReactNode;
}

const Sidebar = ({ children }: Sidebar) => {
  return (
    <Box
      position="absolute"
      left={0}
      px="3"
      pt="80px"
      top={0}
      w="400px"
      h="100%"
      bg="brand.white"
    >
      {children}
    </Box>
  );
};

export default Sidebar;
