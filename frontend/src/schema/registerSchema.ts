import { z } from 'zod';

export const schema = z.object({
    email: z.string().email(),
    username: z.string(),
    password: z.string(),
    confirm_password: z.string(),
  }).refine(
    (values) => {
      return values.password === values.confirm_password;
    },
    {
      message: "Passwords must match!",
      path: ["confirm_password"],
    }
  );