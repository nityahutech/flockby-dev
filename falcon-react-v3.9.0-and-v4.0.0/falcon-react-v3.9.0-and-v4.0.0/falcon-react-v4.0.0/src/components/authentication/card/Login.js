import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from 'components/authentication/LoginForm';

import AuthCardLayout from 'layouts/AuthCardLayout';

const Login = () => {
  return (
    <AuthCardLayout
      leftSideContent={
        <p className="text-white">
          Don't have an account?
          <br />
          <Link
            className="text-white text-decoration-underline"
            to="/authentication/card/register"
          >
            Get started!
          </Link>
        </p>
      }
    >
      <h3
        style={{
          color: '#4695FF',
          height: '75px',
          width: '266.15px',
          fontSize: '2.0736rem',
          fontWeight: '800'
        }}
      >
        flockby
      </h3>
      <LoginForm layout="card" hasLabel />
    </AuthCardLayout>
  );
};

export default Login;
