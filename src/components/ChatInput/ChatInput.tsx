import { Button, Grid } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { ChatInputProp } from "../../utils/props.type";

export const ChatInput = (props: ChatInputProp) => {
  const validationSchema = Yup.object({
    user: Yup.string().required("Please enter your name!"),
    message: Yup.string().required("Please enter a message!"),
  });

  const initialValues = {
    user: "",
    message: "",
  };

  const renderError = (message: string) => (
    <p className="text-danger">{message}</p>
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onMessageSent}
    >
      <Form>
        <Grid container className="container">
          <Grid item xs={4}>
            <div className="mb-3 d-flex">
              <label htmlFor="user" className="form-label me-3">
                Name:
              </label>
              <Field
                name="user"
                type="text"
                className="form-control"
                placeholder="Enter your name"
              />
            </div>
            <ErrorMessage name="user" render={renderError} />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <div className="mb-3 d-flex">
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
            <Button variant="contained" type="submit">
              Send
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};
