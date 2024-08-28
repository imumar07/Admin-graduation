// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Container,
  Box,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";

const BoxSystemProps = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [usernameError, setusernameError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [usernameInput, setusernameInput] = useState("");
  const [passwordInput, setpasswordInput] = useState("");

  const handleusernameInputChange = (event) => {
    const rollNoData = event.target.value;
    setusernameInput(rollNoData);
  };



  const notifySuccess = () => {
    toast.success("Login Successful", {
      position: "top-center",
      autoClose: 800,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const handlepasswordInputChange = (event) => {
    setpasswordInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;

    // Roll Number Validation
    if (usernameInput !== "admin") {
      setusernameError("* Please enter a username");
      isValid = false;
    } else {
      setusernameError("");
    }

    // Aadhar Number Validation
    if (passwordInput !== "svec@123") {
      setpasswordError("* Please enter a password");
      isValid = false;
    } else {
      setpasswordError("");
    }

    if (isValid) {
      setLoading(true);
      notifySuccess();

      setTimeout(() => {
        navigate("/tableComponent");
      }, 1000);
    }
  };

  return (
    <Container>
      <BlurFade delay={0.25} inView>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none pt-3">
          Please Login
        </h2>
      </BlurFade>
      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition:Bounce
          />
        </>
        <FormControl
          sx={{
            mb: 2,
            width: "300px",
            "& .MuiInput-underline:after": {
              borderBottomColor: "black",
            },
          }}
        >
          <InputLabel htmlFor="roll-number-input" style={{ color: "black" }}>
            Username
          </InputLabel>
          <Input
            id="roll-number-input"
            aria-describedby="roll-number-helper-text"
            style={{ color: "black" }}
            name="usernameInput"
            value={usernameInput}
            onChange={handleusernameInputChange}
          />
          <p className="required-para-element">{usernameError}</p>
        </FormControl>

        <FormControl
          sx={{
            mb: 2,
            width: "300px",
            "& .MuiInput-underline:after": {
              borderBottomColor: "black",
            },
          }}
        >
          <InputLabel htmlFor="aadhar-number-input" style={{ color: "black" }}>
            Password
          </InputLabel>
          <Input
            id="aadhar-number-input"
            type="password"
            aria-describedby="aadhar-number-helper-text"
            name="passwordInput"
            style={{ color: "black" }}
            value={passwordInput}
            onChange={handlepasswordInputChange}
          />
          <p className="required-para-element">{passwordError}</p>
        </FormControl>

        <Button
          variant="contained"
          style={{ backgroundColor: "black" }}
          type="submit"
          onClick={handleSubmit}
        >
          {loading ? <CircularProgress color="inherit" /> : "Submit"}
        </Button>
      </Box>
    </Container>
  );
};

export default BoxSystemProps;
