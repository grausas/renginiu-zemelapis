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
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
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
  // filter by category, add checkboxes to array to save state after modal closed
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
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
  // clear checkboxes and all filters
  const clearFilter = () => {
    setCategory([]);
    setCheckedItems(CategoryData.map(() => false));
  };
  useEffect(() => {
    handleFilter(category);
  }, [category]);

  return (
    <>
      <Flex>
        <Button
          leftIcon={<HamburgerIcon />}
          color="brand.dark"
          variant="outline"
          px="6"
          fontSize="xs"
          shadow="md"
          textTransform="uppercase"
          onClick={onOpen}
          w="100%"
        >
          {category.length === 0 ? "Filtrai" : category.length + " filtrai"}
        </Button>
      </Flex>
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
            <Button variant="outline" size="sm" onClick={clearFilter}>
              Panikinti filtrus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
