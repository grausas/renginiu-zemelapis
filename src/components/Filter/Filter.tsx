import { useState, useEffect } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { CategoryData } from "../../utils/Category";

type FilterProps = {
  handleFilter: (category: string[]) => void;
};

export default function Filter({ handleFilter }: FilterProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState(
    CategoryData.map(() => false)
  );
  console.log("categoryFilter", category);
  console.log("checkedItems", checkedItems);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    console.log("e", event);
    setCheckedItems([
      ...checkedItems.slice(0, index),
      event.target.checked,
      ...checkedItems.slice(index + 1),
    ]);
    if (event.target.checked) {
      setCategory([...category, event.target.value]);
    } else {
      setCategory(category.filter((item) => item !== event.target.value));
    }
  };
  useEffect(() => {
    handleFilter(category);
  }, [category]);

  return (
    <>
      <Button
        leftIcon={<HamburgerIcon />}
        color="brand.dark"
        variant="outline"
        px="6"
        fontSize="xs"
        shadow="md"
        textTransform="uppercase"
        onClick={onOpen}
      >
        Filtrai
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filtravimas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {CategoryData.map((category: any, index: number) => (
              <Flex key={category.id}>
                <Checkbox
                  value={category.value}
                  onChange={(e) => handleChange(e, index)}
                  isChecked={checkedItems[index]}
                >
                  {category.text}
                </Checkbox>
              </Flex>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} size="sm" onClick={onClose}>
              Uždaryti
            </Button>
            <Button variant="ghost" size="sm">
              Panikinti filtrus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
