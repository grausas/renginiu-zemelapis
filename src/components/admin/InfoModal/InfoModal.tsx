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
      <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
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
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Ilgalaikis renginys - toks renginys kuris vyksta nepertraukiamai
                nuo nurodytos pradžios datos ir laiko iki nurodytos pabaigos
                datos ir laiko.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Jeigu norite sukurti renginį kuris vyks nepertraukiamai nuo
                šiandien 15:00 iki rytojaus 10:00, turite pažymėti varnelę
                ilgalaikis renginys.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Norint sukurti renginį kuris vyksta tam tikromis dienomis ir tik
                tam tikromis valandomis, reikia pasirinkti datas ir pažymėti
                savaitės dienas, kuriomis renginys vyksta.
              </ListItem>
            </List>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
