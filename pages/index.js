/********************************************************************************
* WEB422 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Sama Movahedi   Student ID: 186144218   Date: 2026-07-09
*
********************************************************************************/

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PageHeader from '@/components/PageHeader';

export default function Home() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submitForm = (data) => {
    router.push({
      pathname: '/books',
      query: Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== '')
      )
    });
  };

  return (
    <>
      <PageHeader
        text="Book Search"
        subtext="Search for books using one or more fields below."
      />

      <Form onSubmit={handleSubmit(submitForm)}>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>

          <Form.Control
            type="text"
            className={errors.author ? 'is-invalid' : ''}
            {...register('author', {
              required: 'Author is required.'
            })}
          />

          <Form.Control.Feedback type="invalid">
            {errors.author?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>

          <Form.Control
            type="text"
            {...register('title')}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Subject</Form.Label>

          <Form.Control
            type="text"
            {...register('subject')}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Language</Form.Label>

          <Form.Control
            type="text"
            {...register('language')}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>First Publish Year</Form.Label>

          <Form.Control
            type="number"
            {...register('first_publish_year')}
          />
        </Form.Group>

        <Button type="submit">
          Search
        </Button>

      </Form>
    </>
  );
}