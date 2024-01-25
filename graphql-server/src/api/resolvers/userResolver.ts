import { User, UserWithNoPassword } from "@sharedTypes/DBTypes";
import { UserResponse } from "@sharedTypes/MessageTypes";
import { createSecureServer } from "http2";

import { fetchData } from "../../lib/functions";

export default {

    Query: {

        users: async () => {

            const users = await fetchData<UserWithNoPassword[]>(process.env.AUTH_SERVER
                + '/users');

            return users;

        },

        user: async (_parent: undefined, args: {
            user_id:
            string
        }) => {

            const user = await fetchData<UserWithNoPassword>(process.env.AUTH_SERVER
                + '/users/' + args.user_id);

            return user;

        },
    },
    Mutation: {
        createUser: async (
          _parent: undefined,
          args: {input: Pick<User, 'username' | 'email' | 'password'>},
        ) => {
          const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(args.input),
            headers: {'Content-Type': 'application/json'},
          };
          const user = await fetchData<UserResponse>(
            process.env.AUTH_SERVER + '/users',
            options,
          );
          return user;
        },
      },

}