import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import NextLink from "next/link";
import Cookies from "js-cookie";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import UseStyles from "../utils/styles";

export default function Register() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    // if user is Logged In redirect him to the Index page
    if (userInfo) {
      router.push("/");
    }
  }, []);

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const classes = UseStyles();

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    // e.preventDefault();
    closeSnackbar();

    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords Don't Match!!", { variant: "error" });
      return;
    }

    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });

      dispatch({
        type: "USER_LOGIN",
        payload: data,
      });

      Cookies.set("userInfo", JSON.stringify(data));
      router.push(redirect || "/");
    } catch (error) {
      enqueueSnackbar(
        error.response.data ? error.response.data.message : error.message,
        { variant: "error" }
      );
    }
  };

  return (
    <Layout title="Register">
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component="h1" variant="h1">
          Register
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 3,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Name"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === "minLength"
                        ? "Provide a valid Name"
                        : "Name is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: "email" }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === "pattern"
                        ? "Email is invalid"
                        : "Email is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: "password" }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === "minLength"
                        ? "Password should be atleast 6 characters long"
                        : "Password is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          {/* <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              inputProps={{ type: "password" }}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            ></TextField>
          </ListItem> */}

          <ListItem>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  inputProps={{ type: "password" }}
                  error={Boolean(errors.confirmPassword)}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.type === "minLength"
                        ? "Confirm Password should be atleast 6 characters long"
                        : "Confirm Password is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Create An Account
            </Button>
          </ListItem>
          <ListItem>
            Already Have an Account? &nbsp;
            <NextLink href={`/login?redirect=${redirect || "/"}`} passHref>
              <Link>Login</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
