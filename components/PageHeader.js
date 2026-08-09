import Card from 'react-bootstrap/Card';

export default function PageHeader({ text, subtext }) {
  return (
    <>
      <Card className="bg-light shadow-sm">
        <Card.Body>
          <h2>{text}</h2>

          {subtext && (
            <p className="mb-0 text-muted">
              {subtext}
            </p>
          )}
        </Card.Body>
      </Card>

      <br />
    </>
  );
}