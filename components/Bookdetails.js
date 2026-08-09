import { Container, Row, Col, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState } from 'react';

export default function BookDetails({
  book,
  workId,
  showFavouriteBtn = true
}) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  const [showAdded, setShowAdded] = useState(
    favouritesList.includes(workId)
  );

  const favouritesClicked = () => {
    if (showAdded) {
      setFavouritesList(current =>
        current.filter(fav => fav !== workId)
      );

      setShowAdded(false);
    } else {
      setFavouritesList(current => [
        ...current,
        workId
      ]);

      setShowAdded(true);
    }
  };

  return (
    <Container style={{ maxWidth: '1100px' }}>
      <Row className="align-items-start">
        <Col lg={4} md={5} sm={12}>
          <img
            style={{
              maxHeight: '500px',
              objectFit: 'contain',
              width: '100%'
            }}
            onError={(event) => {
              event.target.onerror = null;
              event.target.src =
                'https://placehold.co/400x600?text=No+Cover';
            }}
            src={
              book?.covers?.[0]
                ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
                : 'https://placehold.co/400x600?text=No+Cover'
            }
            alt={book?.title}
          />
        </Col>

        <Col lg={8} md={7} sm={12}>
          <h3>{book?.title}</h3>

          {book?.description && (
            <p>
              {typeof book.description === 'string'
                ? book.description
                : book.description.value}
            </p>
          )}

          <h5>Characters</h5>
          <p>{book?.subject_people?.join(', ') || 'N/A'}</p>

          <h5>Places</h5>
          <p>{book?.subject_places?.join(', ') || 'N/A'}</p>

          <h5>Links</h5>

          {book?.links?.map((link, i) => (
            <div key={i}>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.title}
              </a>
            </div>
          ))}

          {showFavouriteBtn && (
            <Button
              variant={showAdded ? 'primary' : 'outline-primary'}
              onClick={favouritesClicked}
              className="mt-3"
            >
              {showAdded ? '+ Favourite (added)' : '+ Favourite'}
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}