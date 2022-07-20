import { zodResolver } from '@hookform/resolvers/zod';
import { sentenceCase } from 'change-case';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { businessRules } from '../../../constants';
import { useToastStore } from '../../../stores';
import { WithQueryData } from '../../../ui';
import { useGetListing } from '../../listing/api';
import { useDbUserQuery } from '../../user-profile';
import { useCreateViolation } from '../data/useCreateViolation';
import {
  createViolationSchema,
  CreateViolationSchema,
} from '../types/create-violation-schema';

export interface ListingReportRouteProps {
  listingId: string;
}

export const ListingReportRoute = (props: ListingReportRouteProps) => {
  const listingQuery = useGetListing({ listingId: props.listingId });
  const sellerQuery = useDbUserQuery(listingQuery.data?.userId);
  const toastStore = useToastStore();
  const router = useRouter();
  const createViolation = useCreateViolation({
    config: {
      onError(error) {
        toastStore.error(error);
      },
      onSuccess() {
        toastStore.success('Thank you for watching over the community');
        router.push('/listing');
      },
    },
  });
  const form = useForm<CreateViolationSchema>({
    resolver: zodResolver(createViolationSchema),
    defaultValues: {
      description: '',
      type: 'spam',
      isAccepted: false,
    },
  });

  const { errors } = form.formState;

  const onSubmit = form.handleSubmit((data) => {
    createViolation.mutate({
      description: data.description,
      type: data.type,
      listingId: props.listingId,
    });
  });

  return (
    <section>
      <h1>Report a violation</h1>
      <div className="p-3 shadow rounded">
        <dl>
          <dt>Listing&apos;s name</dt>
          <WithQueryData query={listingQuery}>
            {(listing) => (
              <dd>
                <Link href={`/listing/${listing.id}`}>
                  <a>{listing.title}</a>
                </Link>
              </dd>
            )}
          </WithQueryData>
          <dt>Posted by</dt>
          <WithQueryData query={sellerQuery}>
            {(seller) => (
              <dd>
                <Link href={`/listing/${seller.uid}`}>
                  <a>{seller.displayName}</a>
                </Link>
              </dd>
            )}
          </WithQueryData>
        </dl>

        <Form noValidate validated={form.formState.isValid} onSubmit={onSubmit}>
          <Stack gap={2}>
            <Form.Group controlId="report-type">
              <Form.Label>Incident type</Form.Label>
              <Controller
                control={form.control}
                name="type"
                render={({ field }) => (
                  <Form.Select isInvalid={Boolean(errors.type)} {...field}>
                    {businessRules.VIOLATION_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {sentenceCase(type)}
                      </option>
                    ))}
                  </Form.Select>
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.type?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="report-description">
              <Form.Label>Detail</Form.Label>
              <Controller
                control={form.control}
                name="description"
                render={({ field }) => (
                  <Form.Control
                    as="textarea"
                    rows={3}
                    type="text"
                    isInvalid={Boolean(errors.description)}
                    {...field}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="report-accept">
              <Controller
                control={form.control}
                name="isAccepted"
                render={({ field: { value, ...field } }) => (
                  <Form.Check
                    type="checkbox"
                    label={
                      <span>
                        I have read the{' '}
                        <Link href="/guidelines">
                          <a target="_blank">community guidelines</a>
                        </Link>
                      </span>
                    }
                    isInvalid={Boolean(errors.isAccepted)}
                    feedback={errors.isAccepted?.message}
                    feedbackType="invalid"
                    checked={value}
                    {...field}
                  />
                )}
              />
            </Form.Group>

            <div className="mt-3 d-flex justify-content-end">
              <Button
                type="submit"
                disabled={createViolation.isLoading}
                variant="primary"
              >
                Report
              </Button>
            </div>
          </Stack>
        </Form>
      </div>
    </section>
  );
};
