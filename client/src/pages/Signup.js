import React, { useState } from 'react'
import {Container, Row, Col, Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'
import { useSignupUserMutation } from '../services/appApi'

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupUser, { isLoading, data, isError, error }] = useSignupUserMutation();
  const navigate = useNavigate();
  const handleSignup = (e) => {
    e.preventDefault();
    signupUser({ email, password }).then(({error}) => {
      if(!error) {
        navigate('/')
      } else {
        e.preventDefault()
      }
    })
  }

  if(data){
    console.log(data)
  }

  return (
    <Container style={{ minHeight: "100vh" }}>
      <Row>
        <Col md={7} className='d-flex align-items-center justify-content-center'>
          <Form className="signupForm" onSubmit={handleSignup}>
            <h1>Create Account</h1>
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
              Signup
            </Button>
            <div className="py-4">
              <p>
                Already have an account?
                <Link to='/login'>Login</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className="signupbgContainer">
        </Col>
      </Row>
    </Container>
  )
}