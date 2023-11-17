import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postLogin, setAuthenticated, setUserData } from "../../redux/actions";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";
import { Button, Card, Stack, Typography, TextField } from "@mui/material";


const Login = () => {
  const { loginWithGoogle, resetPassword } = useAuth();
  const [error, setError] = useState("");
  //para uso del form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm();
  //para uso de redux
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      setTimeout(() => {
        navigate("/user/profile");
      },2000)
    } catch (error) {
      setError(error.message);
    }
  };
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    dispatch(postLogin(data)).then((response) => {
      if (response.data.login === false) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Sorry you don't have account",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
        //permanencia de usuario
        localStorage.setItem("login", JSON.stringify(response.data));
        //Autenticación para pasar al profile
        dispatch(setAuthenticated(true));
        //Toma de datos para pasarlos al profile
        dispatch(setUserData(response.data));
        //Migración al profile
        navigate("/user/profile");
      }
    });
    reset();
  });
  return (
    <Card sx={{ py:4, mt:4, width: "400px", minHeight: '70vh' }}>
      <Stack
        sx={{ display: "flex", alignItems: "center", justifyContent: "center"}}
      >
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack marginTop="20px" marginBottom="20px">
            <Typography variant="h5">Sign in to Arcade World</Typography>
          </Stack>
          <Stack>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#fff", color: "#000", width: "320px" }}
              onClick={handleGoogleLogin}
            >
              <img
                width="20px"
                height="20px"
                style={{ padding: "0.5rem" }}
                className="googleIcon"
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="google-logo"
              />
              Continue with Google
            </Button>
          </Stack>
          <Typography variant="overline">or</Typography>
          <Stack sx={{display:'flex', flexDirection:'column'}}>
            <TextField
              sx={{ width: "320px", marginBottom: "30px" }}
              variant="outlined"
              type="text"
              name="nick_email"
              label="Username"
              onSubmit={onSubmit}
              {...register("nick_email", {
                required: {
                  value: true,
                  message: "User required",
                },
                maxLength: 20,
                minLength: 3,
              })}
            />
            {errors.nick_email?.type === "required" && (
              <Typography
                marginTop="-25px"
                variant="overline"
                color='red'
              >
                Name is required
              </Typography>
            )}
            {errors.nick_email?.type === "maxLength" && (
              <Typography
                marginTop="-25px"
                variant="overline"
                color='red'
              >
                Name is To logn
              </Typography>
            )}
            {errors.nick_email?.type === "minLength" && (
              <Typography
                marginTop="-25px"
                variant="overline"
                color='red'
              >
                Name is to short
              </Typography>
            )}
          </Stack>
          <Stack sx={{display:'flex', flexDirection:'column'}}>
            <TextField
              sx={{ width: "320px", marginBottom: "30px" }}
              variant="outlined"
              type="password"
              name="Password"
              label="Password"
              className="loginInput"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <Typography
                marginTop="-25px"
                variant="overline"
                color='red'
              >
                {errors.password.message}
              </Typography>
            )}
          </Stack>

          <Button
            variant="contained"
            sx={{ backgroundColor: "#000", width: "320px" }}
            onClick={onSubmit}
            disabled={!isDirty || !isValid}
          >
            Log in
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};
export default Login;
