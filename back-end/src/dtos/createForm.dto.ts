import * as z from "zod";

const FormElementDto = z.object({
    name: z.string().min(1),
    type: z.string().min(1),
    options: z.array(z.string()).optional(),
});

export const CreateFormDto = z.object({
    name: z.string().min(1),
    description: z.string(),
    elements: z.array(FormElementDto).min(1),
});

export type CreateFormDto = z.infer<typeof CreateFormDto>;
