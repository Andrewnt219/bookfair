import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { Rating } from 'react-simple-star-rating';
import { firebaseAuth } from '../../../../lib/firebase';
import { useToastStore } from '../../../../stores';
import { useCreateReview } from '../../api';
import { createReviewSchema, CreateReviewSchema } from '../../types';

export interface CreateReviewFormProps {
  transactionId: string;
  onSubmit?(data: CreateReviewSchema): void;
}

export const CreateReviewForm = (props: CreateReviewFormProps) => {
  const queryClient = useQueryClient();
  const form = useForm<CreateReviewSchema>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      rating: 0,
      body: '',
      transactionId: props.transactionId,
    },
  });
  const { errors } = form.formState;
  const toastStore = useToastStore();
  const createReviewMutation = useCreateReview({
    config: {
      onSuccess() {
        toastStore.success('Thank you for your review');
        queryClient.invalidateQueries([
          'expanded-transaction',
          props.transactionId,
        ]);
      },
      onError(error) {
        toastStore.error(error);
      },
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    createReviewMutation.mutate(data);
    props.onSubmit?.(data);
  });

  return (
    <Form noValidate validated={form.formState.isValid} onSubmit={onSubmit}>
      <Stack gap={2}>
        <Form.Group controlId="review-title">
          <Form.Label>Title</Form.Label>
          <Controller
            control={form.control}
            name="title"
            render={({ field }) => (
              <Form.Control
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

        <Form.Group controlId="review-rating">
          <Form.Label>Rating</Form.Label>
          <Controller
            control={form.control}
            name="rating"
            render={({ field }) => (
              <Rating
                size={32}
                allowHalfIcon
                allowHover
                onClick={field.onChange}
                ratingValue={field.value}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="review-body">
          <Form.Label>Body</Form.Label>
          <Controller
            control={form.control}
            name="body"
            render={({ field }) => (
              <Form.Control
                as="textarea"
                isInvalid={Boolean(errors.body)}
                placeholder="Awesome service!"
                {...field}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.body?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">Rate</Button>
      </Stack>
    </Form>
  );
};
