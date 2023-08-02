import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Button,
  Checkbox,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";
import { CategoryData } from "../../utils/Category";
import CategoryIcon from "../../assets/categories.png";
import FilterIcon from "../../assets/filter.png";
import DatePicker from "../admin/DatePicker/DatePicker";

type FilterProps = {
  handleFilter: (
    category: string[],
    startDate: number,
    endDate: number
  ) => void;
  dateStart: number;
  dateEnd: number;
};

type CategoryItem = {
  id: number;
  value: number;
  text: string;
  color: string;
  icon: string;
};

const Filter = React.memo(
  ({ handleFilter, dateStart, dateEnd }: FilterProps) => {
    // state to keep track of selected categories and checked checkboxes
    const [category, setCategory] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [checkedItems, setCheckedItems] = useState<boolean[]>(
      CategoryData.map(() => false)
    );

    useMemo(() => {
      setStartDate(new Date(dateStart));
      setEndDate(new Date(dateEnd));
    }, [dateStart, dateEnd]);

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
      setStartDate(new Date());
      setEndDate(new Date());
    };
    // call handleFilter when category changes
    useEffect(() => {
      const formatStartDate = new Date(startDate.setHours(0, 0, 0)).getTime();
      const formatEndDate = new Date(endDate.setHours(23, 59, 59)).getTime();
      handleFilter(category, formatStartDate, formatEndDate);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, startDate, endDate]);

    const COLORS_SMOOTH = {
      bgHovered: "#F5FAF5",
      controlColorChecked: "#cf2300",
      focusColor: "#A9D3AB",
    };

    const renderCategory = (category: CategoryItem, index: number) => (
      <Flex
        key={category.id}
        position="relative"
        borderColor="gray.300"
        borderRadius="md"
        borderWidth="1px"
        align="center"
        mb="1"
      >
        <Image
          src={category.icon}
          boxSize="4"
          position="absolute"
          left="1"
          zIndex="1"
        />
        <Checkbox
          sx={{
            h: "auto",
            pr: 2,
            pl: 4,
            py: 1,
            w: "100%",
            _checked: {
              bg: category.color,
              color: "brand.white",
              borderRadius: "md",
            },
            span: {
              fontSize: "sm",
            },
            "span[class*='checkbox__control']:not([data-disabled])": {
              display: "none",
              borderColor: "gray.300",
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
              bg: COLORS_SMOOTH.bgHovered,
              borderRadius: "md",
              _checked: {
                bg: category.color,
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
          <Button
            bg="brand.white"
            variant="outline"
            fontSize="xs"
            fontWeight="400"
            shadow="md"
            textTransform="uppercase"
            w={{ base: "30%", md: "40%" }}
            h="0"
            py="4"
          >
            <Image src={FilterIcon} boxSize="3" mr="1" />
            {category.length === 0 ? "Filtrai" : category.length + " Filtrai"}
          </Button>
        </PopoverTrigger>
        <PopoverContent ml="5px">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Flex w="100%" gap="2">
              <Box fontSize="sm">
                <Text>Data nuo</Text>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  showMonthDropdown
                  showMonth
                  showYearDropdown
                  dropdownMode="select"
                  selectedDate={startDate}
                  onChange={(date) => setStartDate(date)}
                  inputType="date"
                  minDate={new Date().setDate(new Date().getDate() - 30)}
                  maxDate={new Date().setDate(new Date().getFullYear() + 1)}
                />
              </Box>
              <Box>
                <Text fontSize="sm">Data iki</Text>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  showMonthDropdown
                  showMonth
                  showYearDropdown
                  dropdownMode="select"
                  selectedDate={endDate}
                  onChange={(date) => setEndDate(date)}
                  inputType="date"
                  minDate={startDate}
                  maxDate={new Date().setDate(new Date().getFullYear() + 1)}
                />
              </Box>
            </Flex>
            <Flex py="1" mb="1" align="center">
              <Image src={CategoryIcon} boxSize="4" mr="1" />
              <Text fontSize="sm">Kategorijos</Text>
            </Flex>
            {CategoryData.map(renderCategory)}
          </PopoverBody>
          <PopoverFooter
            border="0"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            pt="0"
          >
            {category.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearFilter}>
                Panaikinti {category.length > 0 ? category.length : ""} filtrus
              </Button>
            )}
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    );
  }
);

export default Filter;
