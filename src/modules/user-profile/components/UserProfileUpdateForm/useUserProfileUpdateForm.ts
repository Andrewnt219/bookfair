import { useDataUrlFileReader } from '../../../../utils';

import { useForm } from './useForm';
import { useSubmitMutation } from './useSubmitMutation';

export const useUserProfileUpdateForm = () => {
  const form = useForm();
  const submitMutation = useSubmitMutation();
  const dataUrlFileReader = useDataUrlFileReader();
  return { dataUrlFileReader, submitMutation, form };
};
