import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { useToastStore } from '../../../../stores';
import { useSearchListingForm } from './useSearchListingForm';

export const SearchListingsForm = () => {
  const { form, searchListingsMutation, createAlertMutation, authUser } =
    useSearchListingForm();

  const toastStore = useToastStore();

  const { errors } = form.formState;

  const onSubmit = form.handleSubmit((data) => {
    if (search.length === 0) {
      toastStore.error('Search term is required');
      return;
    }
    searchListingsMutation.mutate(data.search);
  });

  const search = form.watch('search');
  const onCreateAlertClick = () => {
    if (!authUser?.email) {
      toastStore.error('Login to create an alert');
      return;
    }
    if (search.length === 0) {
      toastStore.error('Search term is required');
      return;
    }
    createAlertMutation.mutate({ search });
  };

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

      <div className="d-flex gap-1">
        <Button
          className="mt-3 d-flex justify-content-end"
          type="submit"
          disabled={searchListingsMutation.isLoading}
        >
          Search
        </Button>

        <Button
          onClick={onCreateAlertClick}
          variant="secondary"
          className="mt-3 d-flex justify-content-end"
          disabled={createAlertMutation.isLoading}
        >
          Create Alert
        </Button>
      </div>
    </Form>
  );
};
