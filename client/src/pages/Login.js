import React, { useState } from 'react'
import {Container, Row, Col, Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../services/appApi';
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, {isLoading, isError, error}] = useLoginUserMutation()
  const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault()
    loginUser({email, password}).then(({error}) => {
      if(!error) {
        navigate('/')
      } else {
        e.preventDefault()
      }
    })
  }

  return (
    <Container style={{ paddingTop: "10px", minHeight: "100vh" }}>
      <Row>
        <Col md={7} className='d-flex align-items-center justify-content-center'>
          <Form className="loginForm" onSubmit={handleLogin}>
            <h1>Login</h1>
            {isError && <p className='alert alert-danger text-center'>{error.data}</p>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading}>
              Login
            </Button>
            <div className="py-4">
              <p>
                Dont have an account?
                <Link to='/signup'>Sign up</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className="loginbgContainer">
        </Col>
      </Row>
    </Container>
  )
}
