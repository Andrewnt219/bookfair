import { DayjsAble } from '@bookfair/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { sentenceCase } from 'change-case';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, ButtonGroup, Form, FormSelect, Stack } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { businessRules } from '../../../../constants';
import {
  createReportSchema,
  CreateReportSchema,
} from '../../types/create-report-schema';

export const CreateReportForm = () => {
  const form = useForm<CreateReportSchema>({
    resolver: zodResolver(createReportSchema),
    defaultValues: {
      startDate: '',
      endDate: dayjs().format('YYYY-MM-DD'),
      type: 'listings-report',
    },
  });
  const router = useRouter();

  const { errors } = form.formState;

  const onSubmit = form.handleSubmit((data) => {
    router.push({
      pathname: `/admin/stats/${data.type}`,
      query: {
        startDate: data.startDate,
        endDate:
          data.endDate?.trim().length === 0
            ? dayjs().format('YYYY-MM-DD')
            : data.endDate,
      },
    });
  });

  const setDateRange = (startDate: DayjsAble, endDate: DayjsAble = dayjs()) => {
    form.setValue('startDate', dayjs(startDate).format('YYYY-MM-DD'));
    form.setValue('endDate', dayjs(endDate).format('YYYY-MM-DD'));
  };

  const onOneWeekClick = () => {
    setDateRange(dayjs().subtract(7, 'day'));
  };

  const onOneMonthClick = () => {
    setDateRange(dayjs().subtract(1, 'month'));
  };

  const onOneQuarterClick = () => {
    setDateRange(dayjs().subtract(3, 'month'));
  };

  const onOneYearClick = () => {
    setDateRange(dayjs().subtract(1, 'year'));
  };

  return (
    <Form noValidate validated={form.formState.isValid} onSubmit={onSubmit}>
      <Stack gap={2}>
        <ButtonGroup size="sm">
          <Button variant="secondary" onClick={onOneWeekClick}>
            Last week
          </Button>
          <Button variant="secondary" onClick={onOneMonthClick}>
            Last month
          </Button>
          <Button variant="secondary" onClick={onOneQuarterClick}>
            Last quarter
          </Button>
          <Button variant="secondary" onClick={onOneYearClick}>
            Last year
          </Button>
        </ButtonGroup>

        <Form.Group controlId="report-type">
          <Form.Label>Report type</Form.Label>
          <Controller
            control={form.control}
            name="type"
            render={({ field }) => (
              <Form.Select
                title="Promotion's duration"
                {...field}
                isInvalid={Boolean(errors.type)}
              >
                {businessRules.reportTypes.map((type) => (
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

        <Form.Group controlId="report-startDate">
          <Form.Label>Start date</Form.Label>
          <Controller
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <Form.Control
                type="date"
                isInvalid={Boolean(errors.startDate)}
                placeholder="Start Date"
                {...field}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.startDate?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="report-endDate">
          <Form.Label>End date</Form.Label>
          <Controller
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <Form.Control
                type="date"
                isInvalid={Boolean(errors.endDate)}
                placeholder="End Date"
                {...field}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.endDate?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={form.formState.isSubmitting}
          className="mt-3"
          type="submit"
        >
          Generate
        </Button>
      </Stack>
    </Form>
  );
};
