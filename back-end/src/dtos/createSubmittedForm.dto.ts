import * as z from 'zod';

const formElement = z.object({
  name: z.string(),
  type: z.string(),
  options: z.array(z.string()).optional(),
});

const formElementWithValue = formElement.extend({
  value: z.string(),
});

export const CreateSubmittedFormDto = z.object({
  email: z.string().email(),
  data: z.array(formElementWithValue),
});

export type CreateSubmittedFormDto = z.infer<typeof CreateSubmittedFormDto>;
