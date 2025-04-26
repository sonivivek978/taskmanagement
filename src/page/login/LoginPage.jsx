import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const LoginPage = ({onLogin}) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { userName, password } = formData;

    if (userName === 'admin' && password === 'admin123') {
      onLogin();
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
  <Card style={{ width: '25rem', padding: '2rem' }}>
    <h2 className="text-center mb-4">Login</h2>

    {error && <Alert variant="danger">{error}</Alert>}

    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUserName" className="mb-3">
        <Form.Label className="text-start w-100">User Name</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter user name" 
          name="userName" 
          value={formData.userName} 
          onChange={handleChange} 
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className="mb-4">
        <Form.Label className="text-start w-100">Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Login
      </Button>
    </Form>
  </Card>
</Container>

  );
};

export default LoginPage;