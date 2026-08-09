/*********************************************************************************
* WEB422 – Assignment 2
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Sama Movahedi Student ID: 186144218 Date: 2026-07-09
*
********************************************************************************/

import useSWR from 'swr';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import PageHeader from '@/components/PageHeader';

export default function Books() {
  const [page, setPage] = useState(1);
  const router = useRouter();

  let queryString = { ...router.query };

  let qParts = [];

  Object.entries(queryString).forEach(([key, value]) => {
    qParts.push(`${key}:${value}`);
  });

  if (qParts.length > 0) {
    queryString = qParts.join(' AND ');
  }

  const { data, error } = useSWR(
    queryString
      ? `https://openlibrary.org/search.json?q=${encodeURIComponent(queryString)}&page=${page}&limit=10&fields=key,title,first_publish_year`
      : null
  );

  const previous = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const next = () => {
    setPage(page + 1);
  };

  if (error) return <p>Error loading books</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <>
      <PageHeader
        text="Search Results"
        subtext={Object.keys(router.query)
          .map((key) => `${key}: ${router.query[key]}`)
          .join(' | ')}
      />

      <Table striped hover className="table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
          </tr>
        </thead>

        <tbody>
          {data.docs.map((book) => (
            <tr
              key={book.key}
              onClick={() => router.push(book.key)}
              style={{ cursor: 'pointer' }}
            >
              <td>{book.title}</td>
              <td>{book.first_publish_year || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev onClick={previous} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}