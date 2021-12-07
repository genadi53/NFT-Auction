import {
  TextField,
  FormControl,
  Button,
  Grid,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Link from "../link/Link";
import styles from "./Login.module.scss";
import classNames from "classnames";

export default function Login() {
  return (
    <div className={classNames(styles["login-form"])}>
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        <Typography
          className={classNames(styles.heading)}
          variant="h4"
          gutterBottom
        >
          Login Form
        </Typography>
        <FormControl variant="standard">
          <Grid
            container
            rowSpacing={2}
            justifyContent={"center"}
            sx={{ padding: "38px" }}
          >
            <Grid item xs={10}>
              <TextField
                className={classNames(styles.input)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                placeholder="Username or Email"
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                className={classNames(styles.input)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
                // label="Password"
                fullWidth
                type="password"
                placeholder="Password"
              />
            </Grid>
            <Grid item xs={10}>
              <Button
                className={classNames(styles.button)}
                fullWidth
                variant="contained"
                type="submit"
              >
                LOGIN
              </Button>
            </Grid>
          </Grid>
        </FormControl>

        <Typography
          className={classNames(styles.bottomText)}
          variant="body2"
          gutterBottom
        >
          Don't have an account?{" "}
          <Link href={"#"} className={classNames(styles.link)}>
            Register today!
          </Link>
        </Typography>
      </Box>
    </div>
  );
}
