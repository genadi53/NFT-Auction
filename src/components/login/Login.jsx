import { Grid, Button, TextField, InputAdornment } from "@mui/material";
import styles from "./Login.module.scss";
import classNames from "classnames";
import LockIcon from "@mui/icons-material/Lock";
import Email from "@mui/icons-material/Email";

export default function Login() {
  return (
    <Grid
      container
      spacing={2}
      className={classNames(styles.containerGrid)}
      sx={{ backgroundColor: "white", margin: 1 }}
    >
      <Grid item xs={12}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} className={classNames(styles.buttonContainer)}>
        <Button variant="contained" fullWidth color="success">
          Login
        </Button>
      </Grid>
    </Grid>
  );
}
