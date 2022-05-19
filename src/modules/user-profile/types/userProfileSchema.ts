import * as yup from 'yup';
import { displayNameSchema } from '../../../schemas';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const MAX_FILE_SIZE = 5000 * 1024;

export const userProfileSchema = yup.object({
  displayName: displayNameSchema.required('Display name is required'),
  avatar: yup
    .mixed()
    .required('Avatar is required')
    .test(
      'fileType',
      'Unsupported file format',
      (file: File) => file && SUPPORTED_FORMATS.includes(file.type)
    )
    .test(
      'fileSize',
      'File size is too big',
      (file: File) => file && file.size <= MAX_FILE_SIZE
    ),
});

export type UserProfileSchema = yup.InferType<typeof userProfileSchema>;
