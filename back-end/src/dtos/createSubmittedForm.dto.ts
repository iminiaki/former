import * as z from 'zod';
import { elementType } from '../models/formElement.model';

const SingleValueFormElementDto = z.object({
  name: z.string().min(1),
  type: z.enum(['text', 'email', 'number', 'radio', 'dropdown']),
  options: z.array(z.string()).optional(),
  value: z.array(z.string()).length(1),
});

const MultiValueFormElementDto = z.object({
  name: z.string().min(1),
  type: z.literal('checkbox'),
  options: z.array(z.string()).optional(),
  value: z.array(z.string()).nonempty(),
});


const FormElementWithValueDto = z.union([
  SingleValueFormElementDto,
  MultiValueFormElementDto,
]);


export const CreateSubmittedFormDto = z.object({
  email: z.string().email(),
  data: z.array(FormElementWithValueDto).min(1),
});

export type CreateSubmittedFormDto = z.infer<typeof CreateSubmittedFormDto>;
