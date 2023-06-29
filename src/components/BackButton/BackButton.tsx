import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";

interface ButtonProps {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function BackButton({ handleClick }: ButtonProps) {
  return (
    <Button
      leftIcon={<ArrowBackIcon />}
      variant="outline"
      bg="brand.white"
      mb="1"
      size="sm"
      onClick={handleClick}
    >
      Grižti
    </Button>
  );
}
