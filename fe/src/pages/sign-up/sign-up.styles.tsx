export const Button = () => ({
  fontFamily: "San Francisco",
  backgroundColor: "#28ae60",
  "&:hover": {
    backgroundColor: "#28ae60",
  },
});

export const TextField = () => ({
  fontFamily: "San Francisco",
  "& label.Mui-focused": {
    color: "#28ae60",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#28ae60",
      color: "#28ae60",
    },
  },
});
