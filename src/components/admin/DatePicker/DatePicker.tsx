import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
// import { useColorMode } from "@chakra-ui/react";
import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";

import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";

const customDateInput = (
  { onClick, value, onChange, props }: any,
  ref: any
) => (
  <Input
    autoComplete="off"
    background="white"
    value={value}
    onClick={onClick}
    readOnly
    {...props}
    ref={ref}
  />
);
customDateInput.displayName = "DateInput";

const CustomInput = forwardRef(customDateInput);

// const icon =
//   inputType === "date" ? (
//     <CalendarIcon fontSize="sm" />
//   ) : (
//     <TimeIcon fontSize="sm" />
//   );

interface Props {
  isClearable?: boolean;
  onChange: (date: Date) => any;
  selectedDate: Date | undefined;
  showPopperArrow?: boolean;
}

export default function DatePicker({
  selectedDate,
  onChange,
  inputType,
  ...props
}: Props) {
  return (
    <>
      <InputGroup className="light-theme">
        <ReactDatePicker
          selected={selectedDate}
          onChange={onChange}
          className="react-datapicker__input-text"
          customInput={inputType === "date" ? <CustomInput /> : <Input />}
          showPopperArrow={false}
          {...props}
        />
        <InputRightElement
          color="gray.500"
          children={
            inputType === "date" ? (
              <CalendarIcon fontSize="sm" />
            ) : (
              <TimeIcon fontSize="sm" />
            )
          }
        />
      </InputGroup>
    </>
  );
}
