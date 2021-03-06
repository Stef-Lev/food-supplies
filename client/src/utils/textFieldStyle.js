const textFieldStyle = {
  root: {
    borderRadius: "18px",
    marginBottom: "20px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(0, 0, 0, 0.23)",
        borderRadius: "18px",
      },
      "&.Mui-focused fieldset": {
        color: "red",
        border: "2px solid #57CFCB",
        borderRadius: "18px",
      },
      "&.MuiFormLabel-root.Mui-focused": {
        color: "red",
        borderRadius: "18px",
      },
    },
    "& label": {
      "&.Mui-focused": {
        color: "#57CFCB",
      },
    },
  },
  filters: {
    borderRadius: "18px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(0, 0, 0, 0.23)",
        borderRadius: "18px",
      },
      "&.Mui-focused fieldset": {
        color: "red",
        backgroundColor: "transparent",
        border: "2px solid #57CFCB",
        borderRadius: "18px",
      },
      "&.MuiFormLabel-root.Mui-focused": {
        color: "red",
        backgroundColor: "transparent",
        borderRadius: "18px",
      },
    },
    "& label": {
      "&.Mui-focused": {
        color: "#57CFCB",
        backgroundColor: "transparent",
      },
    },
    "& .MuiSelect-select": {
      "&:focus": {
        backgroundColor: "transparent",
      },
    },
  },
  datePicker: {
    backgroundColor: "red",
    "& fieldset": {
      border: "solid 2px #0070D8",
    },
    "& .MuiInputBase-root": {
      height: (params) => (params.height ? params.height : "auto"),
      color: (params) => (params.color ? params.color : "inherit"),
    },
  },
};

export default textFieldStyle;
