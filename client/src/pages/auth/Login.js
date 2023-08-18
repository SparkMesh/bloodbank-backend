import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "./../../components/shared/Spinner";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex sm:flex-row flex-col h-screen gap-8 justify-start items-center bg-gray-100">
          <div className="col-md-8 form-banner">
            <img
            className="h-30"
            src="./assets/images/banner1.jpg" alt="loginImage" />
          </div>
          <div className="sm:mr-8">
            <Form
              formTitle={"Login Page"}
              submitBtn={"Login"}
              formType={"login"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;