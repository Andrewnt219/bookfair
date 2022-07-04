import React from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { WithQueryData } from '../../../../ui/WithQueryData';
import { DbListing } from '../../types';
import { useEditListingForm } from './useEditListingForm';

export interface EditListingFormProps {
  listing: DbListing;
}

export const EditListingForm = ({ listing }: EditListingFormProps) => {
  const { form, photosQuery, updateListingMutation } = useEditListingForm({
    listing,
  });

  const { errors } = form.formState;

  const onSubmit = form.handleSubmit(({ tags, ...data }) => {
    const tagList = tags?.split(',').map((tag) => tag.trim()) ?? [];
    updateListingMutation.mutate({ ...data, tags: tagList });
  });

  const onReset = () => form.reset();

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
                placeholder={listing.title}
                {...field}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="listing-description">
          <Form.Label>Description</Form.Label>
          <Controller
            control={form.control}
            name="description"
            render={({ field }) => (
              <Form.Control
                type="text"
                isInvalid={Boolean(errors.description)}
                placeholder={listing.description}
                {...field}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description?.message}
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
                placeholder={listing.price.toString()}
                {...field}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.price?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="listing-course">
          <Form.Label>Course&apos;s code</Form.Label>
          <Controller
            control={form.control}
            name="course"
            render={({ field }) => (
              <Form.Control
                type="text"
                isInvalid={Boolean(errors.course)}
                placeholder="PR666"
                {...field}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.course?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="listing-tags">
          <Form.Label>Tags (comma-separated)</Form.Label>
          <Controller
            control={form.control}
            name="tags"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field }) => (
              <Form.Control
                isInvalid={Boolean(errors.tags)}
                placeholder="PR666, book, pick-up"
                {...field}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.tags?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <WithQueryData query={photosQuery}>
          {(photos) => (
            <ul
              className="list-unstyled"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.5rem',
              }}
            >
              {photos.map((src) => (
                <li key={src}>
                  <img
                    src={src}
                    className="w-100"
                    alt="Listing's photos"
                    style={{ objectFit: 'cover', aspectRatio: '1/1' }}
                  />
                </li>
              ))}
            </ul>
          )}
        </WithQueryData>
        <div className="d-flex gap-2 justify-content-end">
          <Button
            disabled={updateListingMutation.isLoading}
            onClick={onReset}
            variant="outline-danger"
          >
            Reset
          </Button>
          <Button type="submit" disabled={updateListingMutation.isLoading}>
            Update
          </Button>
        </div>
      </Stack>
    </Form>
  );
};
