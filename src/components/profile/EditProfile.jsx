import {
  Stack,
  Grid,
  Avatar,
  Box,
  CardContent,
  Card,
  TextField,
  Typography,
  Button,
  Select,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCountry, selectedCountry } from "../../redux/actions";
import UploadImage from "../upload/UploadImage";
import useImage from "../utils/useImage";
import { putProfile } from "../../redux/actions";
import Swal from "sweetalert2";
import "./editProfile.css";
import FormControl from "@mui/material/FormControl";

const EditProfile = ({ id, handleChangeRenderProfileEdit, setChanges }) => {
  let selectedCountryForm = useSelector((state) => state.selectedCountry);
  useEffect(() => {}, [selectedCountryForm]);
  let allCountries = useSelector((state) => state.countries);
  let allCountriesArray = allCountries ? Object.values(allCountries) : [];
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [cover, setCover] = useState("");
  const { uploadImage } = useImage(setImage);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm();

  function handleCountrySelectChange(e) {
    let countryName = e.target.value;
    dispatch(selectedCountry(countryName));
  }

  const onSubmit = handleSubmit((data) => {
    data.id = id;
    data.image = image;
    data.coverImage = cover;
    dispatch(putProfile(data)).then(() => {
      setChanges(Math.random());
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
        title: "User Updated",
      });
      handleChangeRenderProfileEdit();
    });
  });
  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);

  return (
    <Grid item sx={{ width: "100%", textAlign: "center" }}>
      <Stack sx={{ marginBottom: "10px", marginLeft: "45px" }}>
        <Avatar
          sx={{ width: 250, height: 250, opacity: 0.6 }}
          src={image ?? ""}
          alt="Profile image"
        />
      </Stack>
      <Stack marginBottom="-20px">
        <Stack
          sx={{
            display: "flex",
            textAlign: "left",
            marginLeft: "12px",
            marginBottom: "-8px",
          }}
        ></Stack>
        <Stack
          sx={{
            alignItems: "center",
            marginTop: "5px",
          }}
        >
          <input
            className="file-selectProfile"
            id="exampleFile"
            name="file"
            type="file"
            onChange={uploadImage}
          />
        </Stack>
      </Stack>
      <TextField
        sx={{ width: "320px", marginBottom: "10px" }}
        variant="outlined"
        type="text"
        name="name"
        label="Change your name"
        // onSubmit={onSubmit}
        {...register("name", {
          maxLength: 20,
          minLength: 3,
        })}
      />
      {errors?.name?.type === "maxLength" && (
        <Typography marginTop="-25px" variant="overline" color="red">
          Name is To long
        </Typography>
      )}
      {errors?.name?.type === "minLength" && (
        <Typography marginTop="-25px" variant="overline" color="red">
          Name is to short
        </Typography>
      )}
      <TextField
        sx={{ width: "320px", marginBottom: "10px" }}
        variant="outlined"
        type="text"
        name="lastname"
        label="Change your last Name"
        // onSubmit={onSubmit}
        {...register("lastname", {
          maxLength: 20,
          minLength: 3,
        })}
      />
      {errors?.lastname?.type === "maxLength" && (
        <Typography marginTop="-25px" variant="overline" color="red">
          Last name is To long
        </Typography>
      )}
      {errors?.lastname?.type === "minLength" && (
        <Typography marginTop="-25px" variant="overline" color="red">
          Last name is to short
        </Typography>
      )}
      <TextField
        sx={{ width: "320px", marginBottom: "10px" }}
        variant="outlined"
        type="text"
        name="nickname"
        label="Change your nick name"
        // onSubmit={onSubmit}
        {...register("nickname")}
      />
      <FormControl>
        <InputLabel id="country">Country</InputLabel>
        <Controller
          name="country"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              labelId="country"
              sx={{ width: "320px", marginBottom: "10px" }}
              variant="outlined"
              label="Choose your country"
              onChange={handleCountrySelectChange}
              {...field}
            >
              {allCountriesArray.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      <TextField
        sx={{ width: "320px", marginBottom: "10px" }}
        variant="outlined"
        type="email"
        name="Email"
        label="Change your email"
        // onSubmit={onSubmit}
        {...register("Email", {
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: "Invalid Email",
          },
        })}
      />
      {errors?.Email && (
        <Typography marginTop="-25px" variant="overline" color="red">
          {errors.Email.message}
        </Typography>
      )}
      <Stack
        sx={{
          display: "flex",
          textAlign: "left",
          marginLeft: "12px",
          marginBottom: "5px",
        }}
      >
        <Typography variant="overline" color="GrayText" mb="-10px">
          Select your new front page image
        </Typography>
        <UploadImage image={cover} setImage={setCover} />
      </Stack>
      <Button
        variant="contained"
        color="success"
        endIcon={<SaveAltIcon />}
        sx={{ width: "320px" }}
        onClick={onSubmit}
        disabled={!isDirty || !isValid}
      >
        Save Changes
      </Button>
    </Grid>
  );
};
export default EditProfile;
