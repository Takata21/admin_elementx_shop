import React, { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessageBox from '../../components/ErrorMessageBox/ErrorMessageBox';
import { useAuth } from '../../context/provider/AuthContext';
import './Auth.css';
const LoginPage = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { signin, isLoading, errorMessage, isLoggedIn } = useAuth();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await signin(user);
      if (userResponse) {
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const verifyLogin = () => {
      if (isLoggedIn) {
        navigate('/home');
      }
    };
    verifyLogin();
  }, []);
  if (isLoggedIn) {
    return (
      <div className="register">
        <h1>Cargando....</h1>
      </div>
    );
  }
  return (
    <div className="register">
      <Link to="/">
        <img
          src="/assets/ElementxOnlineBack.svg"
          alt=""
          className="register-logo"
          width="300px"
        />
      </Link>
      {errorMessage && <ErrorMessageBox message={errorMessage} />}

      <div className="register-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h4>Iniciar Sesion</h4>

          <div className="form-control-container login-form-control">
            <label htmlFor="email">correo electronico</label>
            <input
              onChange={handleChange}
              id="email"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="form-control-container login-form-control">
            <label htmlFor="password">contraseña</label>
            <input
              onChange={handleChange}
              id="password"
              name="password"
              type="password"
              required
            />
          </div>

          <button
            className="register-btn login-btn"
            type="submit"
            disabled={!user.email || !user.password || isLoading}
          >
            {isLoading ? (
              <>
                <TailSpin />
                <span>cargando</span>
              </>
            ) : (
              <span> Iniciar Sesión</span>
            )}
          </button>
        </form>
        <hr />
        <small>
          ¿No tienes cuenta? Contacta a la adminitracion para crear una
        </small>
      </div>
    </div>
  );
};

export default LoginPage;
