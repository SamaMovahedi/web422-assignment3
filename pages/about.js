import BookDetails from '../components/Bookdetails';
import PageHeader from '@/components/PageHeader';

export default function About({ book }) {
  return (
    <>
      <PageHeader text="About the Developer - Sama Movahedi" />

      <p>
        I am a student learning web development using Next.js and React.
        I chose this book because I enjoy storytelling.
      </p>

      <BookDetails
        book={book}
        workId="OL453657W"
        showFavouriteBtn={false}
      />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://openlibrary.org/works/OL453657W.json');
  const data = await res.json();

  return {
    props: {
      book: data
    }
  };
}