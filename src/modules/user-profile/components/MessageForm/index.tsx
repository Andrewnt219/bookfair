import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useToastStore } from '../../../../stores';
import { useCreateMessage } from '../../api';
import {
  createMessageSchema,
  CreateMessageSchema,
} from '../../types/create-message-schema';

export interface MessageFormProps {
  receiverId: string;
}

export const MessageForm = (props: MessageFormProps) => {
  const form = useForm<CreateMessageSchema>({
    resolver: zodResolver(createMessageSchema),
    defaultValues: {
      text: '',
    },
  });
  const toastStore = useToastStore();
  const createMessage = useCreateMessage({
    config: {
      onSuccess() {
        form.reset();
        toastStore.success('Message sent');
      },
      onError(error) {
        toastStore.error(error);
      },
    },
  });

  const { errors } = form.formState;

  const onSubmit = form.handleSubmit((data) => {
    createMessage.mutate({ receiverId: props.receiverId, text: data.text });
  });

  return (
    <Form noValidate validated={form.formState.isValid} onSubmit={onSubmit}>
      <Form.Group controlId="sender-message">
        <Form.Label>Message</Form.Label>
        <Controller
          control={form.control}
          name="text"
          render={({ field }) => (
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Type your message here"
              isInvalid={Boolean(errors.text)}
              {...field}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {errors.text?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        disabled={createMessage.isLoading}
        className="mt-2 d-block ms-auto"
        type="submit"
      >
        Send
      </Button>
    </Form>
  );
};
