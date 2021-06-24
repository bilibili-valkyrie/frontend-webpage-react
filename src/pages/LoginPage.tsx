import {
  TextField,
  CardContent,
  Container,
  Grid,
  Typography,
  Button,
  Switch,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import loginout from "../api/loginout";
import user from "../api/user";
import background from "../assets/background.png";
import MyCard from "../components/MyCard";
import TopBar from "../components/TopBar";
import request from "../controller/request";

const LoginPage = (): JSX.Element => {
  const [username, setUsername] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [islogin, setIslogin] = React.useState<boolean>(false);
  const history = useHistory();

  const handleLoginClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const res = await loginout.login(username, password);
    request.setToken(res.token);
    localStorage.setItem("userToken", res.token);
    history.push("/");
  };

  const handleSignUpClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    await user.signUp(username, name, password);
    const res = await loginout.login(username, password);
    request.setToken(res.token);
    localStorage.setItem("userToken", res.token);
  };

  return (
    <div
      style={{
        background: `url(${background}) center center no-repeat fixed`,
        backgroundSize: "cover",
        height: "100vh",
        width: "100%",
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <TopBar />
      <Container maxWidth="xs">
        <MyCard style={{ marginTop: 128 }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              {islogin ? "登录" : "注册"}
            </Typography>
            <Grid container alignContent="center" spacing={1} justify="center">
              <Grid item>
                <Switch
                  checked={islogin}
                  onChange={(event) => {
                    setIslogin(event.target.checked);
                  }}
                />
              </Grid>
              <Grid item style={{ width: "100%" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="username"
                  label="用户名"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Grid>
              {!islogin && (
                <Grid item style={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="username"
                    label="昵称"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Grid>
              )}
              <Grid item style={{ width: "100%" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="password"
                  label="密码"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Grid>
              {islogin ? (
                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleLoginClick}
                  >
                    登录
                  </Button>
                </Grid>
              ) : (
                <Grid item>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleSignUpClick}
                  >
                    注册
                  </Button>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </MyCard>
      </Container>
    </div>
  );
};

export default LoginPage;
