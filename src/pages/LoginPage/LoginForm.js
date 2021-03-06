import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useHistory } from "react-router-dom";
import { Form } from "../../components/Form/Form";
//import { validateEmail } from "../../constants/validateEmail";
import Input from "../../components/Input/Input";
import Snackbar from "../../components/Snackbar/Snackbar";
import { BASE_URL } from "../../constants/urls";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { LinearProgressGlobal } from "../../GlobalStyle";
import { goToHome } from "../../routes/Coordinator";
import {Section} from "./styled"

export const LoginForm = () => {
  const history = useHistory();
  const [form, onChange] = useForm({ login: "", password: "" });
  const [error, setError] = useState({});
  const [snack, setSnack] = useState({ text: "", success: false });
  const [loading, setLoading] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    setError({});
    const currentError = {};

    if (form.email === "") {
      currentError.login = "E-mail não foi inserido";
    } /* else if (!validateEmail(form.login)) {
      currentError.email = "E-mail inválido";
    } */
    if (form.password === "") {
      currentError.password = "Senha não foi inserida";
    } else if (form.password.length < 6) {
      currentError.password = "Senha precisa ter no mínimo 6 caracteres";
    }
    setError({ ...currentError });
  };

  const login = () => {
    setSnack({ text: "" });
    setLoading(true);
    axios
      .post(`${BASE_URL}/user/login`, form)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        goToHome(history);
      })
      .catch((error) => {
        setLoading(false);
        setSnack({ text: "E-mail e/ou senha incorreta", success: false });
        console.log(error.response ? error.response.data : error.message);
      });
  };

  return (
    <Section>
      <Form onSubmit={handleClick} title="Entrar">
        <Input
          label="login"
          placeholder="email@email.com ou nickname"
          type={"email"}
          name={"login"}
          value={form.login}
          onChange={onChange}
          error={error["login"]}
          required={true}
        />
        <Input
          label="Senha"
          placeholder="Mínimo 6 caracteres"
          type={"password"}
          name={"password"}
          value={form.password}
          onChange={onChange}
          error={error["password"]}
          required={true}
        />
        <Button variant="contained" color="primary" onClick={login}>
          Login
        </Button>
        {loading && <LinearProgressGlobal />}
      </Form>
      {snack.text && <Snackbar text={snack.text} success={snack.success} />}
    </Section>
  );
};
