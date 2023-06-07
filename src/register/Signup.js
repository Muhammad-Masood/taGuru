import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link, Box, Divider } from "@mui/material";
import styled from "@emotion/styled";

import SocialAuth from "./components/SocialAuth";
import SignupForm from "./components/SignupForm";
import Logo from "./components/Logo";
import { motion } from "framer-motion";
import BasicExample from "views/Header/Navbar";

//////////////////////////////////
const RootStyle = styled("div")({
  background: "radial-gradient(circle at 10% 20%, rgb(0, 0, 0) 0%, rgb(64, 64, 64) 90.2%)",
  height: "100vh",
  display: "grid",
  placeItems: "center",
});

const HeadingStyle = styled(Box)({
  textAlign: "center",
});

const ContentStyle = styled(Box)({
  maxWidth: 480,
  padding: 25,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  borderRadius: "20px",
  background: "radial-gradient(circle at 10% 20%, rgb(87, 108, 117) 0%, rgb(37, 50, 55) 100.2%)",
  "& input": {
    color: "black",
  },
});

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    y: 40,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const Signup = () => {
  const [auth, setAuth] = useState(false);
  return (
    <RootStyle>
      <div style={{ position: "absolute", top: "5%", right: "5%" }}>
        <BasicExample />
      </div>
      <Container maxWidth="sm">
        <ContentStyle>
          <HeadingStyle component={motion.div} {...fadeInUp}>
            {/* <Logo /> */}

            <Typography sx={{ color: "text.secondary", mb: 5, color: "white" }}>Create New Account</Typography>
          </HeadingStyle>

          {/* <Box component={motion.div} {...fadeInUp}>
            <SocialAuth />
          </Box>

          <Divider sx={{ my: 3 }} component={motion.div} {...fadeInUp}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              OR
            </Typography>
          </Divider> */}

          <SignupForm auth={auth} setAuth={setAuth} />

          <Typography
            component={motion.p}
            {...fadeInUp}
            variant="body2"
            align="center"
            sx={{ color: "text.secondary", mt: 2, color: "white" }}
          >
            By registering, I agree to{" "}
            <Link underline="always" href="#">
              Terms of Service
            </Link>{" "}
            &{" "}
            <Link underline="always" href="#">
              Privacy Policy
            </Link>
            .
          </Typography>

          <Typography component={motion.p} {...fadeInUp} variant="body2" align="center" sx={{ mt: 3, color: "white" }}>
            Have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/login">
              Login
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default Signup;
