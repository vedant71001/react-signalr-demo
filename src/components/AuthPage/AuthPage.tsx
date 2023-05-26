import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { AuthPageProp } from "../../utils/props.type";

export const AuthPage = (props:AuthPageProp) => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login onLogin={props.onLogin}/>}>Login</Route>
            <Route path="/register" element={<Register/>}>Register</Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
