import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

import api from "../../services/api";

import logoImg from "../../assets/logo.jpg";
import madeWithLove from "../../assets/madewithlove.jpg";

import "./styles.css";

const LoginAdmin = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isVisible, setIsVisible] = useState("password");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("admin/login", { email, password }, {
        headers: {
          Authorization: "af0fb4dadeb3594cd4c9667409c4a44f5571aa46be78344b"
        }
      });

      if(response.data) {
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("accessUserToken", response.data.token);
      }

      history.push("/dashboard");
    } catch(err) {
      if(err.response.status === 401) {
        alert("Combinação de e-mail e senha não conferem, tente novamente!");
      } else {
        alert("Erro inesperado, tente novamente!");
      }
    }
  }

  return (
    <div className="container-login">
      <img src={logoImg} alt="Catnip" className="logo"/>

      <section className="form-section">
        <img src={madeWithLove} alt="Catnip Brechó" className="madewithlove"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu login de administrador</h1>
          
          <input
            id="input"
            placeholder="Seu e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <div className="container-password">
            <input
              placeholder="Sua senha"
              type={isVisible}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            <button 
              type="button"
              className="button-password"
              onMouseUp={() => setIsVisible("password")}
              onMouseDown={() => setIsVisible("text")}
              onMouseLeave={() => setIsVisible("password")}
            >
              {isVisible === "password"
                ? <FiEyeOff
                    size={24} 
                    color="#881f83"
                    style={{marginTop: 8}}
                  />
                : <FiEye 
                    size={24} 
                    color="#881f83"
                    style={{marginTop: 8}}
                  />
              }  
            </button>
          </div>

          <button className="button" type="submit">Entrar</button>
        </form>
      </section>
    </div>
  );
};

export default LoginAdmin;