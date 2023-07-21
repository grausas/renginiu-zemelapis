import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Tooltip,
  ModalBody,
  ModalCloseButton,
  List,
  ListItem,
  ListIcon,
  useDisclosure,
} from "@chakra-ui/react";
import { InfoIcon, CheckCircleIcon } from "@chakra-ui/icons";

export default function InfoModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip label="Informacija kaip kurti renginius">
        <InfoIcon
          color="green"
          boxSize="4"
          onClick={onOpen}
          position="absolute"
          top="2"
          left="2"
          _hover={{
            cursor: "pointer",
          }}
        />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Paaiškinimas kaip kurti naujus renginius</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Nubraižyti žemėlapyje geometriją
              </ListItem>
            </List>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
