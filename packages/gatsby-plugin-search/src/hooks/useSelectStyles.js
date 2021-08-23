export default function useSelectStyles() {
  return {
    option: (provided, state) => {
      return {
        ...provided,
        backgroundColor:
          state.isFocused || state.isSelected
            ? "var(--select-field-option-active-background-color, #000000)"
            : "var(--select-field-option-background-color, #ffffff)",
        borderBottom: "1px solid var(--select-field-divider-color, #dfe1e4)",
        color:
          state.isFocused || state.isSelected
            ? "var(--select-field-option-active-color, #ffffff)"
            : "var(--select-field-option-color, #2A2E3B)",
        padding: "0.5rem 1rem",
        "&:hover": {
          backgroundColor:
            "var(--select-field-option-hover-background-color, #000000)",
          color: "var(--select-field-option-hover-color, #ffffff)",
        },
      };
    },
    menuList: (provided) => {
      return {
        ...provided,
        padding: 0,
        fontSize: "var(--select-field-menu-font-size, 1rem)",
      };
    },
    control: (provided) => {
      return {
        ...provided,
        borderColor: "var(--select-field-control-border-color, #DFE1E4)",
        color: "var(--select-field-control-color, #3D4148)",
        fontSize: "var(--select-field-font-size, 0.875rem)",
        fontWeight: "var(--select-field-font-weight, 400)",
      };
    },
    indicatorSeparator: (provided, state) => {
      return {
        ...provided,
        backgroundColor: "var(--select-field-divider-color, #dfe1e4)",
        display: state.isMulti ? "flex" : "none",
      };
    },
    clearIndicator: (provided) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided) => {
      return {
        ...provided,
        color: "var(--select-field-dropdown-color, #2A2E3B)",
        "&:hover": {
          color: "var(--select-field-dropdown-hover-color, #0070c9)",
          cursor: "pointer",
        },
      };
    },
    placeholder: (provided) => {
      return {
        ...provided,
        color: "var(--select-field-color, #2A2E3B)",
      };
    },
    multiValue: (provided) => {
      return {
        ...provided,
        background: "var(--select-field-multi-background-color, #000000)",
        color: "var(--select-field-multi-color, #ffffff)",
        borderRadius: 4,
      };
    },
    multiValueRemove: (provided) => {
      return {
        ...provided,
        color: "var(--select-field-multi-cross-color, #2A2E3B)",
        "&:hover": {
          backgroundColor:
            "var(--select-field-multi-cross-hover-background-color, #000000)",
          color: "var(--select-field-multi-cross-hover-color, #ffffff)",
          cursor: "pointer",
        },
      };
    },
    multiValueLabel: (provided) => {
      return {
        ...provided,
        color: "var(--select-field-multi-color, #2A2E3B)",
        fontSize: "var(--select-field-multi-font-size, 0.8125rem)",
        fontWeight: "var(--select-field-multi-font-weight, 400)",
      };
    },
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };
}
