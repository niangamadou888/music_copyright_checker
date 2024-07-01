export type TUser = {
    data: {
        token: string,
        user: {
            username: string,
            email: string,
            is_email_verified: boolean
        }
    }
  }