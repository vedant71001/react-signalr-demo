import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "./Register.css";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { UserModel } from "../../models/UserModel";
import { userService } from "../../services/user.services";

export default function Register() {
    const history = useNavigate();
  const validationSchema = Yup.object({
    firstname: Yup.string().required("Please enter your first name!"),
    lastname: Yup.string().required("Please enter your last name!"),
    email: Yup.string()
      .required("Please enter your email id!")
      .email("Please enter valid email!"),
    password: Yup.string().min(8,"Minimum 8 characters required!").required("Please enter your password!"),
    confirmpassword: Yup.string()
      .required("Please confirm your password!")
      .oneOf([Yup.ref("password")], "Password do not match"),
  });

  const initialValue = {
    firstname:"",
    lastname:"",
    email: "",
    password: "",
    confirmpassword: ""
  };

  const registerHandler = (values: typeof initialValue) => {
    let user: UserModel = {
        userId: 0,
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password
    }
    userService.Register(user).then((res)=>{
        if(res){
            history("/");
        }
    })
  };

  const renderError = (message: string) => (
    <p className="text-danger">{message}</p>
  );

  return (
    <div className="login-wrapper">
      <h2 className="text-center">Register</h2>
      <Formik
        initialValues={initialValue}
        onSubmit={registerHandler}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label me-3">
              First Name:
            </label>
            <Field
              name="firstname"
              type="text"
              className="form-control"
              placeholder="Enter your email"
            />
            <ErrorMessage name="firstname" render={renderError} />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label me-3">
              Last Name:
            </label>
            <Field
              name="lastname"
              type="text"
              className="form-control"
              placeholder="Enter your email"
            />
            <ErrorMessage name="lastname" render={renderError} />
          </div>

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
          <div className="mb-3">
            <label htmlFor="confirmpassword" className="form-label me-3">
              Confirm Password:
            </label>
            <Field
              name="confirmpassword"
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />
            <ErrorMessage name="confirmpassword" render={renderError} />
          </div>
          <div className="text-center">
            <Button variant="contained" className="w-100" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </Formik>
      <Link to="/">Already have account? Sign in</Link>
    </div>
  );
}
