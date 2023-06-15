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

export default function Filter({ handleFilter }: FilterProps) {
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
    <Popover closeOnBlur={false} placement="right-end">
      <PopoverTrigger>
        <Flex>
          <Button
            leftIcon={<HamburgerIcon />}
            color="brand.dark"
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
