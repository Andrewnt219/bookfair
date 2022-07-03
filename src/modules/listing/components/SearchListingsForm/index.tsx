import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { useSearchListingForm } from './useSearchListingForm';

export const SearchListingsForm = () => {
  const { form, searchListingsMutation } = useSearchListingForm();

  const { errors } = form.formState;

  const onSubmit = form.handleSubmit((data) =>
    searchListingsMutation.mutate(data.search)
  );

  return (
    <Form noValidate validated={form.formState.isValid} onSubmit={onSubmit}>
      <Form.Group controlId="listing-title">
        <Form.Label>Search term</Form.Label>
        <Controller
          control={form.control}
          name="search"
          render={({ field }) => (
            <Form.Control
              type="text"
              isInvalid={Boolean(errors.search)}
              placeholder="PRJ566 books"
              {...field}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {errors.search?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button className="mt-3 d-flex justify-content-end" type="submit">
        Search
      </Button>
    </Form>
  );
};
