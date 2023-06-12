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
      w={{ base: "100%", md: "400px" }}
      h={{ base: "calc(100% - 120px)", md: "calc(100% - 60px)" }}
      bg="brand.white"
      borderRight="1px solid"
      borderColor="gray.200"
    >
      {children}
    </Box>
  );
};

export default Sidebar;
