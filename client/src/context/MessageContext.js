import React, { createContext, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import brandBtnStyle from "../utils/brandBtnStyle";
import messageStyle from "../utils/messageStyle";
export const MessageContext = createContext({});

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export const MessageProvider = (props) => {
  const [message, setMessage] = useState({
    status: "",
    msg: "",
    callback: () => {},
  });
  const [open, setOpen] = useState(false);

  const handleCloseMessage = (event, reason) => {
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
    handleCloseMessage();
  };

  return (
    <MessageContext.Provider value={{ showMessage, handleCloseMessage }}>
      {props.children}
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={open}
          autoHideDuration={8000}
          TransitionComponent={TransitionUp}
          onClose={handleCloseMessage}
        >
          <SnackbarContent
            message={message.msg}
            style={messageStyle}
            action={
              <>
                {message.status === "warning" && (
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={triggerCallback}
                      style={{
                        ...brandBtnStyle,
                        backgroundColor: "#57cfcb",
                        marginRight: "10px",
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={handleCloseMessage}
                      style={{
                        ...brandBtnStyle,
                        backgroundColor: "#ed5f5f",
                        marginRight: "10px",
                      }}
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
                    onClick={handleCloseMessage}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </>
            }
          />
        </Snackbar>
      </div>
    </MessageContext.Provider>
  );
};
