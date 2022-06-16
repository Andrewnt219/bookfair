import React from 'react';
import { Form, Stack } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { useCreateListingForm } from './useCreateListingForm';

export const CreateListingForm = () => {
  const { form, submitMutation } = useCreateListingForm();

  const { errors } = form.formState;

  const onSubmit = form.handleSubmit((data) => submitMutation.mutate(data));

  return (
    <Form noValidate validated={form.formState.isValid} onSubmit={onSubmit}>
      <Stack gap={2}>
        <Form.Group controlId="listing-title">
          <Form.Label>Title</Form.Label>
          <Controller
            control={form.control}
            name="title"
            render={({ field }) => (
              <Form.Control
                type="text"
                isInvalid={Boolean(errors.title)}
                placeholder="Title"
                {...field}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="listing-price">
          <Form.Label>Price</Form.Label>
          <Controller
            control={form.control}
            name="price"
            render={({ field }) => (
              <Form.Control
                type="number"
                isInvalid={Boolean(errors.price)}
                placeholder="99.99"
                {...field}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.price?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="listing-description">
          <Form.Label>Description</Form.Label>
          <Controller
            control={form.control}
            name="description"
            render={({ field }) => (
              <Form.Control
                as="textarea"
                type="text"
                isInvalid={Boolean(errors.description)}
                placeholder="Lorem ipsum"
                {...field}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="listing-files">
          <Form.Label>Files</Form.Label>
          <Controller
            control={form.control}
            name="photos"
            render={({ field: { value, onChange, ...field } }) => (
              <Form.Control
                type="file"
                multiple
                isInvalid={Boolean(errors.photos)}
                placeholder="Lorem ipsum"
                onChange={(ev) =>
                  onChange((ev.target as HTMLInputElement).files)
                }
                {...field}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.photos?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <button type="submit">Submit</button>
      </Stack>
    </Form>
  );
};
