import { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { CategoryData } from "../../utils/Category";

type FilterProps = {
  handleFilter: (category: string[]) => void;
};

type CategoryItem = {
  id: number;
  value: number;
  text: string;
  color: string;
  icon: string;
};

export default function Filter({ handleFilter }: FilterProps) {
  // state to keep track of selected categories and checked checkboxes
  const [category, setCategory] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    CategoryData.map(() => false)
  );
  // filter by category, add checkboxes to array to save state after modal closed
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = event.target.checked;
    setCheckedItems(newCheckedItems);
    const newCategory = event.target.checked
      ? [...category, event.target.value]
      : category.filter((item) => item !== event.target.value);
    setCategory(newCategory);
  };
  // Function to clear all filters and checkboxes
  const clearFilter = () => {
    setCategory([]);
    setCheckedItems(CategoryData.map(() => false));
  };
  // call handleFilter when category changes
  useEffect(() => {
    handleFilter(category);
  }, [category]);

  const renderCategory = (category: CategoryItem, index: number) => (
    <Flex key={category.id}>
      <Checkbox
        value={category.value}
        onChange={(e) => handleChange(e, index)}
        isChecked={checkedItems[index]}
      >
        {category.text}
      </Checkbox>
    </Flex>
  );

  return (
    <Popover closeOnBlur={false} placement="right-end" isLazy>
      <PopoverTrigger>
        <Flex>
          <Button
            leftIcon={<HamburgerIcon />}
            color="brand.dark"
            bg="brand.white"
            variant="outline"
            px="6"
            fontSize="xs"
            shadow="md"
            textTransform="uppercase"
            w="100%"
          >
            {category.length === 0 ? "Filtrai" : category.length + " filtrai"}
          </Button>
        </Flex>
      </PopoverTrigger>
      <PopoverContent ml="5px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Filtrai</PopoverHeader>
        <PopoverBody>
          <Text>Kategorijos</Text>
          {CategoryData.map(renderCategory)}
        </PopoverBody>
        <PopoverFooter
          border="0"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          <Button variant="outline" size="sm" onClick={clearFilter}>
            Panaikinti filtrus
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
