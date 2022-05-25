import { useDataUrlFileReader } from '../../../../utils';
import { useUserAbsolutePhotoUrlQuery } from './useAbsoluteUserPhotoUrlQuery';

import { useForm } from './useForm';
import { useSubmitMutation } from './useSubmitMutation';

export const useUserProfileUpdateForm = () => {
  const form = useForm();
  const submitMutation = useSubmitMutation();
  const dataUrlFileReader = useDataUrlFileReader();
  const userAbsolutePhotoUrlQuery = useUserAbsolutePhotoUrlQuery();

  return { dataUrlFileReader, submitMutation, form, userAbsolutePhotoUrlQuery };
};
