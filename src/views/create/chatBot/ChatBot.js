import React, { createRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ques } from "./ques";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useWeb3React } from "@web3-react/core";
import { TextField } from "@mui/material";

const ChatBot = ({ chatbotAnswers, setchatbotAnswers, setOpen, open, handleClose, handleOpen, ref, image }) => {
  const handleInputChange = (e, que) => {
    e.preventDefault();
    if (e.target.value.length == 0) {
      delete chatbotAnswers[que];
    } else {
      setchatbotAnswers({ ...chatbotAnswers, [que]: e.target.value });
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    height: "90%",
    justifyContent: "space-evenly",
    display: "flex",
    flexWrap: "wrap",
    overflow: "scroll",
  };

  return (
    <>
      {/* <div>
        <button style={{ marginBottom: "10px" }} onClick={getImage}>
          Take screenshot
        </button>
      </div> */}
      {/* <img width={"100px"} src={image} alt={"Screenshot"} />
      <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {ques.map((que) => (
            <TextField
              sx={{ m: 1, width: "50ch" }}
              onChange={(e) => handleInputChange(e, que)}
              id="outlined-basic"
              label={`${que}`}
              variant="filled"
              size="small"
              margin="normal"
              value={chatbotAnswers[que]}
            />
          ))}
          <Button onClick={handleClose} sx={{ width: "100px", backgroundColor: "rgb(94,53,177)" }} variant="contained">
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ChatBot;
