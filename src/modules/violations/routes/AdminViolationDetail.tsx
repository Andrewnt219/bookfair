import { sentenceCase } from 'change-case';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useQueryClient } from 'react-query';
import { useToastStore } from '../../../stores';
import { WithQueryData } from '../../../ui';
import { ViolationRemoveButton } from '../components/ViolationRemoveButton';
import { useGetExpandedViolation } from '../data/useGetExpandedViolation';
import { useResolveViolation } from '../data/useResolveViolation';

export interface AdminViolationDetailProps {
  violationId: string;
}

export const AdminViolationDetail = (props: AdminViolationDetailProps) => {
  const violationQuery = useGetExpandedViolation({
    violationId: props.violationId,
  });
  const toastStore = useToastStore();
  const router = useRouter();
  const qc = useQueryClient();

  const resolveViolation = useResolveViolation({
    config: {
      onSuccess() {
        qc.invalidateQueries('violations');
        toastStore.success('Rejected violation');
        router.push('/admin/violations');
      },
      onError(error) {
        toastStore.error(error);
      },
    },
  });

  const onRejectClick = () => {
    if (!violationQuery.data) {
      toastStore.enqueue({ message: 'Loading violation...', variant: 'info' });
      return;
    }
    resolveViolation.mutate({
      result: 'rejected',
      id: violationQuery.data.id,
      listingId: violationQuery.data.listing.id,
    });
  };

  return (
    <section>
      <h1>Violation&apos;s detail</h1>
      <WithQueryData query={violationQuery}>
        {(violation) => (
          <div>
            <dl
              className={clsx(
                'border p-3',
                violation.admin && 'border-warning'
              )}
            >
              <dt>Last modified by</dt>
              <dd>
                {violation.admin ? (
                  <a href={`mailto:${violation.admin.email}`}>
                    {violation.admin.displayName}
                  </a>
                ) : (
                  '(None)'
                )}
              </dd>
              <dt>Status</dt>
              <dd>{sentenceCase(violation.result)}</dd>
            </dl>

            <dl className="border p-3">
              <dt>Submitted on</dt>
              <dd>
                {dayjs
                  .unix(violation.createdAt)
                  .format('MMM DD, YYYY - hh:mm:ss A')}
              </dd>
              <dt>Violated listing:</dt>
              <dd>
                <Link href={`/listing/${violation.listing.id}`}>
                  <a>{violation.listing.title}</a>
                </Link>
              </dd>
              <dt>Violation&apos;s type</dt>
              <dd>{sentenceCase(violation.type)}</dd>
              <dt>Violation&apos;s description</dt>
              <dd>{violation.description} </dd>
            </dl>
            <dl className="border p-3">
              <dt>Reporter&apos;s email</dt>
              <dd>
                <a href={`mailto:${violation.reporter.email}`}>
                  {violation.reporter.email}
                </a>
              </dd>
            </dl>
            {violation.result !== 'accepted' && (
              <div className="d-flex gap-1 justify-content-end mt-3">
                <Button
                  disabled={resolveViolation.isLoading}
                  onClick={onRejectClick}
                  variant="secondary"
                >
                  Reject violation
                </Button>
                <ViolationRemoveButton violation={violation} />
              </div>
            )}
          </div>
        )}
      </WithQueryData>
    </section>
  );
};
