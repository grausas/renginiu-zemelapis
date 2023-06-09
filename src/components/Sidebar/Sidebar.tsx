import React from "react";
import { Box } from "@chakra-ui/react";
interface Sidebar {
  children: React.ReactNode;
}

const Sidebar = ({ children }: Sidebar) => {
  return (
    <Box
      position="fixed"
      left="0"
      top="50px"
      pt="4"
      w="400px"
      h="calc(100% - 60px)"
      bg="brand.white"
    >
      {children}
    </Box>
  );
};

export default Sidebar;
