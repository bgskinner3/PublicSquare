import React, { useState } from 'react';
import { LOGIN_USER } from '../graphql/mutations';
import { SIGIN_UP_USER } from '../graphql/mutations';
import { useMutation, gql } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { JWT_SECRET } from '../constants';

const Login = () => {
  const navigate = useNavigate();
  // const authToken = localStorage.getItem(JWT_SECRET);
  const [formState, setFormState] = useState({
    login: true,
    username: '',
    password: '',
  });

  const [login] = useMutation(LOGIN_USER);

  const [signup] = useMutation(SIGIN_UP_USER);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (formState.login) {
        const { data } = await login({
          variables: {
            username: formState.username,
            password: formState.password,
          },
        });
        const {
          login: { token, user },
        } = data;
        console.log('login', token)
        localStorage.setItem(JWT_SECRET, token);
        navigate('/');
      }
      
      if (!formState.login) {
        const { data } = await signup({
          variables: {
            username: formState.username,
            password: formState.password,
          },
        });
        const {
          signup: { token, user },
        } = data;
        console.log('datttaaa', data)
        console.log('userrrrr', user.id)

        localStorage.setItem(JWT_SECRET, token);
       
        
      
        navigate('/');
      }
    } catch (e) {
      const error = 'jfkd'
      console.error('SHIEEEET ', e);
     return error
     
    }
  };


  return (
    <Form onSubmit={handleSubmit} name={{ ...formState }} className="container">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="username"
          type="text"
          placeholder="Enter username"
          onChange={(e) =>
            setFormState({
              ...formState,
              username: e.target.value,
            })
          }
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="pointer mr2 button">
        {formState.login ? 'login' : 'create account'}
      </Button>
      <Button
        variant="primary"
        type="button"
        onClick={() =>
          setFormState({
            ...formState,
            login: !formState.login,
          })
        }
      >
        {formState.login
          ? 'need to create an account?'
          : 'already have an account?'}
      </Button>
     
    </Form>
  );
};

export default Login;
