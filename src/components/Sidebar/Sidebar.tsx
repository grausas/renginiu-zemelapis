import React from "react";
import { Box } from "@chakra-ui/react";

interface Sidebar {
  children: React.ReactNode;
}

const Sidebar = ({ children }: Sidebar) => {
  return (
    <Box
      position="relative"
      top={{ base: "30px", md: "50px" }}
      pt="4"
      pb={{ base: "1", md: "4" }}
      w={{ base: "100%", md: "400px" }}
      h={{ base: "auto", md: "100%" }}
      bg="brand.grey"
      borderRight="1px solid"
      borderColor="gray.200"
      zIndex="1"
    >
      {children}
    </Box>
  );
};

export default Sidebar;
