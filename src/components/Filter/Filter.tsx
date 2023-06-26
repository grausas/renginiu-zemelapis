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
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { CategoryData } from "../../utils/Category";
import CategoryIcon from "../../assets/categories.png";

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

  const COLORS_SMOOTH = {
    bg: "#ececef",
    bgHovered: "#F5FAF5",
    borderColor: "#76A9FF",
    hoverBorderColor: "#C4DAFF",
    controlColorChecked: "#cf2300",
    controlColor: "#9696A0",
    focusColor: "#A9D3AB",
  };

  const renderCategory = (category: CategoryItem, index: number) => (
    <Flex
      key={category.id}
      // borderRadius="md"
      // px={4}
      borderColor="gray.300"
      borderRadius="md"
      borderWidth="1px"
      align="center"
      mb="2px"
    >
      <Image
        src={category.icon}
        boxSize="5"
        mr="1"
        position="absolute"
        zIndex="1"
        left="5"
      />
      <Checkbox
        sx={{
          h: "auto",
          pr: 3,
          pl: 8,
          py: 1,
          w: "100%",
          // flexDirection: "row-reverse",
          // justifyContent: "space-between",

          // bg: "brand.grey",
          transition: "all 150ms",
          _checked: {
            bg: COLORS_SMOOTH.bg,
          },
          "span[class*='checkbox__control']:not([data-disabled])": {
            display: "none",
            borderColor: "gray.300",
            borderRadius: "99px",
            borderWidth: "2px",
            h: "20px",
            w: "20px",
            "& svg": {
              w: "1.6em",
            },
            _checked: {
              bg: COLORS_SMOOTH.controlColorChecked,
              borderColor: COLORS_SMOOTH.controlColorChecked,
            },
            _focus: {
              boxShadow: `0 0 0 2px ${COLORS_SMOOTH.focusColor}`,
              _checked: {
                boxShadow: `0 0 0 2px ${COLORS_SMOOTH.focusColor}`,
              },
            },
          },
          _hover: {
            transition: "all 350ms",
            bg: COLORS_SMOOTH.bgHovered,
            _checked: {
              bg: COLORS_SMOOTH.bg,
            },
          },
        }}
        value={category.value}
        isChecked={checkedItems[index]}
        onChange={(e) => handleChange(e, index)}
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
        {/* <PopoverHeader>Filtrai</PopoverHeader> */}
        <PopoverBody>
          <Flex py="1" mb="1">
            <Image src={CategoryIcon} boxSize="6" mr="1" />
            <Text textTransform="uppercase">Kategorijos</Text>
          </Flex>
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
