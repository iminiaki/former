import * as z from 'zod';

const FormElementDto = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  options: z.array(z.string()).optional(),
});

const FormElementWithValueDto = FormElementDto.extend({
  value: z.string(),
});

export const CreateSubmittedFormDto = z.object({
  email: z.string().email(),
  data: z.array(FormElementWithValueDto).min(1),
});

export type CreateSubmittedFormDto = z.infer<typeof CreateSubmittedFormDto>;
