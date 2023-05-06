import React, { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { contractabi, contractadd } from "views/ConnectWallet/contractinfo";
import { useContextAPI } from "index";

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

const LoginForm = ({ setAuth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);

  const { LoggedInUser, setLoggedInUser } = useContextAPI();

  console.log({ LoggedInUser });

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Provide a valid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const { account, active, library } = useWeb3React();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
      role: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const { email, password, role } = values;

      if (!active) {
        console.log("connect wallet");
        alert("Connect wallet");
        return;
      }

      let isCandidate = role == "true" ? true : false;
      console.log(role == "true" ? "cand" : "admin", isCandidate);

      console.log({ library, active });
      const signer = await library?.getSigner(account);
      const cont = await new ethers.Contract(contractadd, contractabi, signer);

      const signun = await cont.verifyLogin(account);
      // console.log(signun[0]);
    },
  });

  const loginfunc = async () => {
    if (!active) {
      console.log("connect wallet");
      alert("Connect wallet");
      return;
    }

    console.log({ account });
    try {
      const signer = await library?.getSigner(account);
      const cont = await new ethers.Contract(contractadd, contractabi, signer);
      const signun = await cont.verifyLogin(account);

      const name = signun[0];
      const email = signun[1];
      const phoneNumber = signun[2];
      const isCand = signun[3];

      const loggedindata = { name, email, phoneNumber, isCand };
      console.log({ loggedindata });
      setLoggedInUser(loggedindata);
      navigate("/display/Display", { replace: true });
    } catch (error) {
      console.log(error.reason || error.message);
      navigate("/signup", { replace: true });
    }
  };

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          component={motion.div}
          animate={{
            transition: {
              staggerChildren: 0.55,
            },
          }}
        >
          {/* <FormControl>
            <RadioGroup
              row
              {...getFieldProps("role")}
              error={Boolean(touched.role && errors.role)}
              helperText={touched.role && errors.role}
              aria-labelledby="demo-form-control-label-placement"
              name="role">
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Candidate"
                labelPlacement="Candidate"
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Admin"
                labelPlacement="Admin"
              />
            </RadioGroup>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email Address"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              {...getFieldProps("password")}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <Icon icon="eva:eye-fill" />
                      ) : (
                        <Icon icon="eva:eye-off-fill" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box> */}
          {/* ss */}
          {/* <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    {...getFieldProps("remember")}
                    checked={values.remember}
                  />
                }
                label="Remember me"
              />

              <Link
                component={RouterLink}
                variant="subtitle2"
                to="#"
                underline="hover"
              >
                Forgot password?
              </Link>
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              {isSubmitting ? "loading..." : "Login"}
            </LoadingButton>
          </Box> */}
          <LoadingButton fullWidth size="large" type="null" variant="contained" onClick={loginfunc}>
            {isSubmitting ? "loading..." : "Login"}
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
};

export default LoginForm;
