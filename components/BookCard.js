import useSWR from 'swr';
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

export default function BookCard({ workId }) {
  const { data, error } = useSWR(
    `https://openlibrary.org/works/${workId}.json`
  );

  if (error || !data) {
    return <Error statusCode={404} />;
  }

  return (
    <Card className="h-100"
        style={{
            width: '15rem',
            margin: '0 auto'
        }}
    >
      <Card.Img
        className="h-100"
        style={{
            width: '15rem',
            margin: '0 auto'
        }}
        onError={(event) => {
          event.target.onerror = null;
          event.target.src =
            'https://placehold.co/400x600?text=Cover+Not+Available';
        }}
        src={
          data?.covers?.[0]
            ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`
            : 'https://placehold.co/400x600?text=Cover+Not+Available'
        }
        alt="Cover Image"
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title
            style={{
                minHeight: '50px'
            }}
        >
          {data.title || ''}
        </Card.Title>

        <Card.Text>
          {data.first_publish_date || 'N/A'}
        </Card.Text>

        <Button
          as={Link}
          href={`/works/${workId}`}
          variant="primary"
          className="mt-auto"
        >
          View Book
        </Button>
      </Card.Body>
    </Card>
  );
}