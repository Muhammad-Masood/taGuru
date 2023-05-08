import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { contractabi, contractadd } from "views/ConnectWallet/contractinfo";
// import PhoneInput from 'react-phone-number-input';
// import 'react-phone-number-input/style.css';

/////////////////////////////////////////////////////////////
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

const SignupForm = ({ auth, setAuth }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { account, active, library } = useWeb3React();

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("First name required"),
    lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Last name required"),
    email: Yup.string().email("Email must be a valid email address").required("Email is required"),
    phoneNum: Yup.string().required("phoneNum is required"),
    role: Yup.string().required("Role required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNum: "",
      role: true,
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      const { email, firstName, lastName, password, phoneNum, role } = values;
      console.log("start");

      const userrole = role == "false" ? false : true;

      console.log({ userrole });

      // let isCandidate = role == "true" ? true : false

      console.log({ role });
      // console.log({isCandidate});

      if (!active) {
        alert("Connect wallet");
        return;
      }

      console.log({ library, active });
      try {
        const signer = await library?.getSigner(account);
        const cont = await new ethers.Contract(contractadd, contractabi, signer);
        console.log({ cont });

        const signun = await cont.signUpCandidate(`${firstName} ${lastName}`, phoneNum, email, userrole);

        await signun.wait();
        // setAuth(true);
        // navigate("/login", { replace: true });

        navigate("/login", { replace: true });
      } catch (error) {
        alert(error.reason || error.message);
        navigate("/login", { replace: true });
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      {/* {touched.isWalletConnected &&
        <p style={{color: "red"}}>{errors.isWalletConnected}</p>
      } */}
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormControl>
            {/* <FormLabel id="demo-form-control-label-placement">
              Label placement
            </FormLabel> */}
            <RadioGroup
              row
              {...getFieldProps("role")}
              error={Boolean(touched.role && errors.role)}
              helperText={touched.role && errors.role}
              aria-labelledby="demo-form-control-label-placement"
              name="role"
            >
              <FormControlLabel
                style={{ color: "white" }}
                value={true}
                control={<Radio />}
                label="Candidate"
                labelPlacement="Candidate"
              />
              <FormControlLabel
                style={{ color: "white" }}
                value={false}
                control={<Radio />}
                label="Admin"
                labelPlacement="Admin"
              />
            </RadioGroup>
          </FormControl>
          <Stack
            component={motion.div}
            initial={{ opacity: 0, y: 60 }}
            animate={animate}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            <TextField
              fullWidth
              label="First name"
              variant="filled"
              style={{ backgroundColor: "white", borderRadius: "5px" }}
              {...getFieldProps("firstName")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              variant="filled"
              style={{ backgroundColor: "white", borderRadius: "5px" }}
              label="Last name"
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <Stack spacing={3} component={motion.div} initial={{ opacity: 0, y: 40 }} animate={animate}>
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              variant="filled"
              style={{ backgroundColor: "white", borderRadius: "5px" }}
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              type="phoneNum"
              label="Phone Number"
              variant="filled"
              style={{ backgroundColor: "white", borderRadius: "5px" }}
              value={formik.values.phoneNum}
              {...getFieldProps("phoneNum")}
              error={Boolean(touched.phoneNum && errors.phoneNum)}
              helperText={touched.phoneNum && errors.phoneNum}
            />
            <TextField
              variant="filled"
              style={{ backgroundColor: "white", borderRadius: "5px" }}
              fullWidth
              label="Wallet Address"
              value={account || "connect your wallet"}
            />
            {/* <PhoneInput
          international
          defaultCountry="US"
          label="phoneNum"
          placeholder="Phone Number"
          {...getFieldProps("phoneNum")}
          value={formik.values.phoneNum}
          onChange={(value) => formik.setFieldValue("phoneNum", value)}
          error={formik.touched.phoneNum && Boolean(formik.errors.phoneNum)}
          helperText={formik.touched.phoneNum && formik.errors.phoneNum}
          style={{ height: "60px" }}
          inputStyle={{ height: "100%", fontSize: "1.2rem" }}
          onBlur={formik.handleBlur}
          required
        />   */}
            {/* <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              {...getFieldProps("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}>
                      <Icon
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            /> */}
          </Stack>

          <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={animate}>
            <LoadingButton
              fullWidth
              size="large"
              type="null"
              variant="contained"

              // loading={isSubmitting}
            >
              Sign up
            </LoadingButton>
          </Box>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default SignupForm;
