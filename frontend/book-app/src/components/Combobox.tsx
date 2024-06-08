/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Autocomplete,
  TextField,
  Box,
  IconButton,
  ListItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import type { ReactElement } from "react";

export interface ComboboxProps<T = unknown> {
  placeholder?: string;
  defaultOption?: OptionProps<T>;
  defaultValue?: string;
  disabled?: boolean;
  keepDropdownOpen?: boolean;
  label?: string;
  options: OptionProps<T>[];
  required?: boolean;
  triggerRerender?: boolean;
  getSelectedOption?: (option: OptionProps<T>) => void;
  isActiveOption?: (
    option: OptionProps<T>,
    selectedOption: OptionProps<T>
  ) => boolean;
  renderOption: (option: OptionProps<T>, optionIndex: number) => ReactElement;
  renderOptionString: (option: T | null) => string;
  onChange: (value: string, option?: OptionProps<T>) => void;
  noOptionsText?: string;
}

type OptionProps<T = unknown> = T;

function CustomCombobox<T = unknown>(props: ComboboxProps<T>) {
  const {
    options = [],
    defaultOption,
    placeholder,
    disabled,
    defaultValue,
    label,
    required,
    triggerRerender,
    renderOption,
    renderOptionString,
    getSelectedOption,
    onChange,
    noOptionsText = "No option matches your query",
    ...restProps
  } = props;

  const [value, setValue] = useState<string>(defaultValue || "");
  const [selectedItem, setSelectedItem] = useState<OptionProps<T> | null>(
    defaultOption || null
  );

  const [filteredOptions, setFilteredOptions] =
    useState<OptionProps<T>[]>(options);

  const handleChange = (event: any, option: OptionProps<T> | null) => {
    setSelectedItem(option);
    onChange(option ? renderOptionString(option) : "", option || undefined);
    if (option) {
      getSelectedOption?.(option);
    }
  };

  const handleInputChange = (
    event: React.SyntheticEvent,
    value: string,
    reason: any
  ) => {
    setValue(value);
    onChange(value, selectedItem || undefined);
    setFilteredOptions(
      options.filter((option) =>
        renderOptionString(option).toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleChangeInputValue = useCallback(() => {
    setValue(defaultValue || "");
    setSelectedItem(defaultOption || null);
    setFilteredOptions(options);
  }, [defaultValue, defaultOption, options]);

  const renderCount = useRef(0);

  useEffect(() => {
    if (triggerRerender && renderCount.current > 2) {
      renderCount.current = 2;
    }

    if (renderCount.current <= 2) {
      renderCount.current += 1;
      handleChangeInputValue();
    }
  }, [defaultValue, triggerRerender, handleChangeInputValue]);

  return (
    <Box my={2} sx={{ minWidth: 400 }}>
      {label ? (
        <label
          style={{
            display: "block",
            marginBottom: "0.25rem",
            color: disabled ? "#9ca3af" : "#6b7280",
          }}
        >
          {label}
        </label>
      ) : null}
      <Autocomplete
        value={selectedItem}
        onChange={handleChange}
        inputValue={value}
        onInputChange={handleInputChange}
        options={filteredOptions}
        disabled={disabled}
        getOptionLabel={(option) => renderOptionString(option)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  <IconButton disabled={disabled}>
                    <SearchIcon style={{ color: "#6b7280" }} />
                  </IconButton>
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
        renderOption={(props, option, { selected }) => (
          <ListItem
            {...props}
            key={renderOptionString(option)} // Use a unique key
            selected={selected}
          >
            {/* @ts-ignore */}
            {renderOption(option, props.id)}{" "}
            {/* Ensure a unique key for rendering */}
          </ListItem>
        )}
        noOptionsText={noOptionsText}
        {...restProps}
      />
    </Box>
  );
}

export default CustomCombobox;
