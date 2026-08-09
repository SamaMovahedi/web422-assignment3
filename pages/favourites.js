import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PageHeader from '@/components/PageHeader';
import BookCard from '@/components/BookCard';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  if (favouritesList.length === 0) {
    return (
      <>
        <PageHeader>Favourites</PageHeader>
        <p>Nothing Here</p>
      </>
    );
  }

  return (
    <>
      <PageHeader>Favourites</PageHeader>

      <Row className="gy-4">
        {favouritesList.map((workId) => (
          <Col lg={3} md={6} key={workId}>
            <BookCard workId={workId} />
          </Col>
        ))}
      </Row>
    </>
  );
}