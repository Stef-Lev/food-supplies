import React, { createContext, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
export const MessageContext = createContext({});

export const MessageProvider = (props) => {
  const [message, setMessage] = useState({
    status: "",
    msg: "",
    callback: () => {},
  });
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setMessage({ status: "", msg: "", callback: () => {} });
  };

  const showMessage = (status, msg, callback) => {
    setMessage({ status, msg, callback });
    setOpen(true);
  };

  const triggerCallback = () => {
    message.callback();
    handleClose();
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
          autoHideDuration={20000}
          onClose={handleClose}
          message={message.msg}
          action={
            <>
              {message.status === "warning" && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={triggerCallback}
                    style={{ marginRight: "10px" }}
                  >
                    Yes
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={handleClose}
                  >
                    No
                  </Button>
                </div>
              )}
              {message.status !== "warning" && (
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </>
          }
        />
      </div>
    </MessageContext.Provider>
  );
};
