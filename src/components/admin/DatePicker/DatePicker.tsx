import { forwardRef } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import lt from "date-fns/locale/lt";
// import { useColorMode } from "@chakra-ui/react";
import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";

import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
registerLocale("lt", lt);

type CustomDateInputProps = {
  onClick?: () => void;
  value?: string;
  props?: any;
};

const customDateInput = (
  { onClick, value, props }: CustomDateInputProps,
  ref: React.Ref<any>
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
  dropdownMode?: "scroll" | "select";
  timeFormat?: string;
  timeIntervals?: number;
  dateFormat: string;
  minDate?: any;
  maxDate?: any;
  minTime?: any;
  maxTime?: any;
  onChange: (date: Date) => void;
  selectedDate: Date | undefined;
  showPopperArrow?: boolean;
  inputType?: string;
  adjustDateOnChange?: boolean;
}

export default function DatePicker({
  selectedDate,
  onChange,
  inputType,
  ...props
}: Props) {
  return (
    <>
      <InputGroup className="light-theme" zIndex="11">
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
        <ReactDatePicker
          selected={selectedDate}
          onChange={onChange}
          className="react-datapicker__input-text"
          customInput={inputType === "date" ? <CustomInput /> : <Input />}
          showPopperArrow={false}
          locale="lt"
          timeCaption="Laikas"
          adjustDateOnChange
          {...props}
        />
      </InputGroup>
    </>
  );
}
