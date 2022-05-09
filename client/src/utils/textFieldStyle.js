const textFieldStyle = {
  root: {
    marginBottom: "20px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(0, 0, 0, 0.23)",
      },
      "&.Mui-focused fieldset": {
        color: "red",
        border: "2px solid #57CFCB",
      },
      "&.MuiFormLabel-root.Mui-focused": {
        color: "red",
      },
    },
    "& label": {
      "&.Mui-focused": {
        color: "#57CFCB",
      },
    },
  },
};

export default textFieldStyle;
