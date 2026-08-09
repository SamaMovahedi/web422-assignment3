import MainNav from './MainNav';
import { Container } from 'react-bootstrap';

export default function Layout({ children }) {
  return (
    <>
      <MainNav />
      <Container style={{ paddingTop: '20px', maxWidth: '1100px' }}>
        {children}
      </Container>
    </>
  );
}