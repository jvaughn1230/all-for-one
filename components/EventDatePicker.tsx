"use client";
import React, { useState, useEffect } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

type EventDatePickerProps = {
  value: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
};

const EventDatePicker = ({ value, onChange }: EventDatePickerProps) => {
  const [date, setDate] = useState<Dayjs | null>(null);

  // Set Date After Mount
  useEffect(() => {
    setDate(value || dayjs());
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Event Date"
        value={date}
        onChange={(newDate) => {
          setDate(newDate);
          onChange(newDate);
        }}
        sx={{
          "& .MuiInputBase-root": {
            backgroundColor: "white",
            borderRadius: 1,
          },
        }}
        slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
      />
    </LocalizationProvider>
  );
};

export default EventDatePicker;
