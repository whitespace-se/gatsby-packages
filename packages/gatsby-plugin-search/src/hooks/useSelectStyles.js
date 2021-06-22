export default function useSelectStyles() {
  return {
    option: (provided, state) => {
      return {
        ...provided,
        backgroundColor:
          state.isFocused || state.isSelected
            ? "var(--select-field-active-background-color, #000000)"
            : "var(--select-field-background-color, #ffffff)",
        borderBottom: "1px solid var(--select-field-divider-color, #dfe1e4)",
        color:
          state.isFocused || state.isSelected
            ? "var(--select-field-active-color, #ffffff)"
            : "var(--select-field-color, #2A2E3B)",
        padding: "0.5rem 1rem",
        "&:hover": {
          backgroundColor:
            "var(--select-field-hover-background-color, #000000)",
          color: "var(--select-field-hover-color, #ffffff)",
        },
      };
    },
    menuList: (provided, state) => {
      return {
        ...provided,
        padding: 0,
        fontSize: "var(--select-field-font-size)",
      };
    },
    control: (provided, state) => {
      return {
        ...provided,
        borderColor: "#DFE1E4",
        color: "#3D4148",
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
    clearIndicator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided, state) => {
      return {
        ...provided,
        color: "var(--select-field-color, #2A2E3B)",
        "&:hover": {
          color: "var(--select-field-active-color, #0070c9)",
          cursor: "pointer",
        },
      };
    },
    placeholder: (provided, state) => {
      return {
        ...provided,
        color: "var(--select-field-color, #2A2E3B)",
      };
    },
    multiValue: (provided, state) => {
      return {
        ...provided,
        background: "var(--select-field-active-background-color, #000000)",
        color: "var(--select-field-active-color, #ffffff)",
        borderRadius: 4,
      };
    },
    multiValueRemove: (provided, state) => {
      return {
        ...provided,
        color: "var(--select-field-color)",
        "&:hover": {
          backgroundColor:
            "var(--select-field-active-background-color, #000000)",
          color: "var(--select-field-active-color, #ffffff)",
          cursor: "pointer",
        },
      };
    },
    multiValueLabel: (provided, state) => {
      return {
        ...provided,
        color: "var(--select-field-color)",
        fontSize: "var(--select-field-muliti-font-size, 0.8125rem)",
        fontWeight: "var(--select-field-font-weight, 400)",
      };
    },
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };
}
