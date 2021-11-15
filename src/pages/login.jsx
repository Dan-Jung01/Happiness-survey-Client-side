import React, { useState } from "react";

import {
  Container,
  Row,
  Form,
  FormGroup,
  Col,
  Input,
  Button,
} from "reactstrap";

const API_URL = "http://131.181.190.87:3000";

function Login() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function login() {
    const url = `${API_URL}/user/login`;

    return fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // if its an error
        if (res.error) {
          setError(res.message);
        } else {
          setError(null);
          setSuccess("Login successful");
        }

        console.log(res);

        if (res.token !== undefined) {
          localStorage.setItem("token", res.token);
          window.location.reload();
        }
      });
  }

  return (
    <div className='flex justify-center'>
      <Container className='flex justify-center items-center'>
        <Col>
          <Row>
            {error != null ? (
              <p className='text-red-600 font-bold flex -mb-36 mt-36'>
                {error}
              </p>
            ) : null}
            {success != null ? (
              <p className='text-red-600 font-bold flex -mb-36 mt-36'>
                {success}
              </p>
            ) : null}

            <h1 className='text-3xl font-bold mt-40 mb-10 text-center text-gray-800'>
              Login
            </h1>
          </Row>
          <Row className='flex justify-center items-center'>
            <Form
            // onSubmit={(event) => {
            //   event.preventDefault();
            //   let email = event.target.elements.userLogin.value;
            //   let password = event.target.elements.userPassword.value;
            //   registerUser(email, password);
            // }}
            >
              <FormGroup>
                <h2 className='text-xl font-bold mb-2 text-gray-800'>ID</h2>
                <Input
                  className='border-b-2 w-72 mb-5'
                  type='email'
                  name='email'
                  id='userLogin'
                  placeholder='Enter your Email'
                  alt='type ID'
                  value={emailValue}
                  onChange={(e) => {
                    setEmailValue(e.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <h2 className='text-xl font-bold mb-2 text-gray-800'>
                  Password
                </h2>
                <Input
                  className='border-b-2 w-72 mb-8'
                  type='password'
                  name='password'
                  id='userPassword'
                  placeholder='Enter your Password'
                  alt='type Password'
                  value={passwordValue}
                  onChange={(e) => {
                    setPasswordValue(e.target.value);
                  }}
                />
              </FormGroup>
              <Button
                className='block bg-yellow-400 px-20 py-2 w-72 rounded-md font-bold text-gray-800 mb-2'
                id='login-button'
                type='button'
                alt='login'
                onClick={login}
              >
                Login
              </Button>
            </Form>
          </Row>
          <Row className='flex justify-center'>
            <p>
              You don't have an account? Register{" "}
              <a
                href='/register'
                className='text-yellow-500 font-bold'
                alt='go to register'
              >
                here
              </a>
            </p>
          </Row>
        </Col>
      </Container>
    </div>
  );
}

export default Login;
