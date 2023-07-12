import { forwardRef } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import lt from "date-fns/locale/lt";
// import { useColorMode } from "@chakra-ui/react";
import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";

import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
registerLocale("lt", lt);

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

interface Props {
  showMonthDropdown?: boolean;
  showMonth?: boolean;
  showYearDropdown?: boolean;
  showTimeDropdown?: boolean;
  showTimeSelect?: boolean;
  showTimeSelectOnly?: boolean;
  dropdownMode?: string;
  timeFormat?: string;
  timeIntervals?: number;
  dateFormat: string;
  minDate?: Date;
  onChange: (date: Date) => any;
  selectedDate: Date | undefined;
  showPopperArrow?: boolean;
  inputType?: string;
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
          locale="lt"
          timeCaption="Laikas"
          {...props}
        />
        <InputRightElement
          color="gray.500"
          bg={"white"}
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
