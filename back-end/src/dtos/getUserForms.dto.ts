import * as z from "zod";

export const userDto = z.object({
    name: z.string().min(1),
    password: z.string().min(1),
});

export type UserDto = z.infer<typeof userDto>;
