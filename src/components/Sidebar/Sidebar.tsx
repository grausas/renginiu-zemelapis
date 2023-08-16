import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

interface Sidebar {
  children: React.ReactNode;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const Sidebar = ({ children, isOpen, onOpen, onClose }: Sidebar) => {
  return (
    <>
      {isOpen && (
        <Box
          position="relative"
          top={{ base: "30px", md: "50px" }}
          pt="4"
          pb={{ base: "1", md: "4" }}
          w={{ base: "100%", md: "20px" }}
          h={{ base: "auto", md: "100%" }}
          bg="brand.grey"
          zIndex="1"
          boxShadow={{ base: "md", md: "2xl" }}
          display={{ base: "none", md: "flex" }}
        >
          <Flex
            position="absolute"
            right="-14px"
            top="45%"
            bg="brand.white"
            borderRadius="50%"
            zIndex="1"
            p="0.5"
            justify="center"
            align="center"
            onClick={onClose}
            _hover={{
              cursor: "pointer",
            }}
          >
            <ArrowForwardIcon boxSize={6} />
          </Flex>
        </Box>
      )}
      {!isOpen && (
        <Box
          position="relative"
          top={{ base: "30px", md: "50px" }}
          pt="4"
          pb={{ base: "1", md: "4" }}
          w={{ base: "100%", md: "400px" }}
          h={{ base: "auto", md: "100%" }}
          bg="brand.grey"
          zIndex="1"
          boxShadow={{ base: "md", md: "2xl" }}
        >
          <Flex
            display={{ base: "none", md: "flex" }}
            position="absolute"
            right="-14px"
            top="45%"
            bg="brand.white"
            borderRadius="50%"
            zIndex="1"
            p="0.5"
            justify="center"
            align="center"
            onClick={onOpen}
            _hover={{
              cursor: "pointer",
            }}
          >
            <ArrowBackIcon boxSize={6} />
          </Flex>
          {children}
        </Box>
      )}
    </>
  );
};

export default Sidebar;
