import { useRouter } from 'next/router';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { registerUser } from '@/lib/authenticate';
import PageHeader from '@/components/PageHeader';

export default function Register() {
  const router = useRouter();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [registerError, setRegisterError] = useState(false);

  async function submitForm(event) {
    event.preventDefault();

    setRegisterError(false);

    const success = await registerUser(user, password, password2);

    if (success) {
      router.push('/login');
    } else {
      setRegisterError(true);
    }
  }

  return (
    <>
      <PageHeader
        text="Register"
        subtext="Register for an account:"
      />

      {registerError && (
        <Alert variant="danger">
          Unable to register. Please check your information and try again.
        </Alert>
      )}

      <Form onSubmit={submitForm}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>

          <Form.Control
            type="text"
            value={user}
            onChange={(event) => setUser(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>

          <Form.Control
            type="password"
            value={password2}
            onChange={(event) => setPassword2(event.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit">
          Register
        </Button>
      </Form>
    </>
  );
}