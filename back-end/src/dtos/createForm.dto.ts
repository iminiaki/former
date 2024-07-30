import * as z from "zod";

const FormElementDto = z.object({
    name: z.string().min(1),
    type: z.string().min(1),
    options: z.array(z.string()).optional(),
});

export const formDto = z.object({
    name: z.string().min(1),
    description: z.string(),
    elements: z.array(FormElementDto).min(1),
});

export type FormDto = z.infer<typeof formDto>;
