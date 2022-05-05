import React, { createContext, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
export const MessageContext = createContext({});

export const MessageProvider = (props) => {
  const [message, setMessage] = useState({ status: "", msg: "" });
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setMessage({ status: "", msg: "" });
  };

  const showMessage = (status, msg) => {
    setMessage({ status, msg });
    setOpen(true);
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {props.children}
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          message={message.msg}
          action={
            <>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        />
      </div>
    </MessageContext.Provider>
  );
};
