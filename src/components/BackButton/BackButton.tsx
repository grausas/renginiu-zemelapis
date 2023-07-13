import { ArrowLeftIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";

interface ButtonProps {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function BackButton({ handleClick }: ButtonProps) {
  return (
    <Button
      leftIcon={<ArrowLeftIcon boxSize="3" />}
      variant="outline"
      bg="brand.white"
      size="sm"
      shadow="sm"
      color="brand.dark"
      fontSize="xs"
      fontWeight="400"
      textTransform="uppercase"
      onClick={handleClick}
      margin="0 auto"
      mb="1"
    >
      Grižti
    </Button>
  );
}
