import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAtom } from 'jotai';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { authenticateUser } from '@/lib/authenticate';
import { getFavourites } from '@/lib/userData';
import { favouritesAtom } from '@/store';
import PageHeader from '@/components/PageHeader';

export default function Login() {
  const router = useRouter();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [, setFavouritesList] = useAtom(favouritesAtom);

  async function updateAtom() {
    setFavouritesList(await getFavourites());
  }

  async function submitForm(event) {
    event.preventDefault();

    setLoginError(false);

    const success = await authenticateUser(user, password);

    if (success) {
      await updateAtom();
      router.push('/');
    } else {
      setLoginError(true);
    }
  }

  return (
    <>
      <PageHeader
        text="Login"
        subtext="Login to your account:"
      />

      {loginError && (
        <Alert variant="danger">
          Unable to login. Please check your username and password.
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

        <Button type="submit">
          Login
        </Button>
      </Form>
    </>
  );
}