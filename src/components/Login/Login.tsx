import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { LoginModel } from "../../models/LoginModel";
import { userService } from "../../services/user.services";
import { AuthPageProp } from "../../utils/props.type";

export default function Login(props: AuthPageProp) {
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Please enter your email id!")
      .email("Please enter valid email!"),
    password: Yup.string().required("Please enter your password!"),
  });

  const initialValue = {
    email: "",
    password: "",
  };

  const loginHandler = (values: LoginModel) => {
    userService.Login(values).then((res) => {
        if(res != "invalidUser"){
            props.onLogin(res);
        }
        else{
            alert("Invalid email or password!");
        }
    })
  };

  const renderError = (message: string) => (
    <p className="text-danger">{message}</p>
  );

  return (
    <div className="login-wrapper">
      <h2 className="text-center">Login</h2>
      <Formik
        initialValues={initialValue}
        onSubmit={loginHandler}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label me-3">
              Email:
            </label>
            <Field
              name="email"
              type="text"
              className="form-control"
              placeholder="Enter your email"
            />
            <ErrorMessage name="email" render={renderError} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label me-3">
              Password:
            </label>
            <Field
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />
            <ErrorMessage name="password" render={renderError} />
          </div>
          <div className="text-center">
            <Button variant="contained" className="w-100" type="submit">Login</Button>
          </div>
        </Form>
      </Formik>
      <Link to="/register">New User? Create new account</Link>
    </div>
  );
}
