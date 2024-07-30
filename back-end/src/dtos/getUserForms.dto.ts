import * as z from "zod";

export const getUserFormsDto = z.object({
    name: z.string().min(1),
    password: z.string().min(1),
});

export type GetUserFormsDto = z.infer<typeof getUserFormsDto>;
