import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex sm:flex-row flex-col gap-8 h-screen justify-start items-center bg-gray-100">
          <div className="col-md-8 form-banner ">
            <img className="h-30 " src="./assets/images/banner2.jpg" alt="registerImage" />
          </div>
          <div className="sm:mr-8">
            <Form
              formTitle={"Register"}
              submitBtn={"Register"}
              formType={"register"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
