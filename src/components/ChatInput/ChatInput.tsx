import { Box, Button, Grid, IconButton, Modal } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { ChatInputProp } from "../../utils/props.type";
import { useState } from "react";
import { RecordAudio, SendAudio } from "../../utils/AudioRecorder";
import { chatService } from "../../services/chat.services";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #3f3f3f",
  boxShadow: 24,
  p: 4,
  color: "#000000",
  borderRadius: 5,
  textAlign: "center",
};

export const ChatInput = (props: ChatInputProp) => {
  const validationSchema = Yup.object({
    user: Yup.string().required("Please enter your name!"),
    message: Yup.string().required("Please enter a message!"),
  });

  const initialValues = {
    user: `${props.user.firstname} ${props.user.lastname}`,
    message: "",
  };

  const renderError = (message: string) => (
    <p className="text-danger">{message}</p>
  );

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const sendAudioHandler = () => {
    SendAudio(initialValues.user);
    handleClose();
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onMessageSent}
    >
      <Form>
        <Grid container className="container mt-3">
          <Grid item xs={4}>
            <div className="d-flex">
              <label htmlFor="user" className="form-label me-3">
                Name:
              </label>
              <Field
                name="user"
                type="text"
                className="form-control"
                placeholder="Enter your name"
                disabled
              />
            </div>
            <ErrorMessage name="user" render={renderError} />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <div className="d-flex">
              <label htmlFor="message" className="form-label me-3">
                Message:
              </label>
              <Field
                name="message"
                type="text"
                className="form-control"
                placeholder="Enter your message"
              />
            </div>
            <ErrorMessage name="message" render={renderError} />
          </Grid>
          <Grid item xs={2}>
            <IconButton color="primary" onClick={handleOpen}>
              <MicIcon />
            </IconButton>
            <Modal open={open} onClose={handleClose}>
              <Box sx={style}>
                <audio controls id="ownAudio" className="d-none"></audio>
                <Button variant="contained" onClick={RecordAudio}>
                  Record
                </Button>
                <Button
                  variant="contained"
                  className="d-none ms-2"
                  id="sendAudioBtn"
                  onClick={sendAudioHandler}
                >
                  Send
                </Button>
              </Box>
            </Modal>
            <IconButton color="primary" type="submit">
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};
