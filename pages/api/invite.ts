import { createYoga, createSchema } from "graphql-yoga";

const typeDefs = `
  type FormData {
    name: String
    email: String
  }
  type Result {
    status: Int!
    message: String
  }
  type Query {
    getFormData(name: String, email: String): FormData
  }
  type Mutation {
    postInviteFormData(name: String!, email: String!): Result
  }
`;

const resolvers = {
  Query: {
    getFormData: (_: any, args: Record<string, string>) => {
      return {
        name: args.name,
        email: args.email,
      };
    },
  },
  Mutation: {
    postInviteFormData: async (_: any, args: Record<string, string>) => {
      // url is located in .env file
      return await fetch(process.env.INVITATION_ENDPOINT || "", {
        method: "POST",
        body: JSON.stringify({
          name: args.name,
          email: args.email,
        }),
      })
        .then((response) =>
          response
            .json()
            .then((data) => ({ status: response.status, message: data }))
        )
        .then((result) => {
          // assuming status 200 will give result "Registered"
          // assuming status 400 will give result "{errorMessage: 'Bad Request: Email is already in use'}"
          if (result.status === 400) {
            result.message = result.message.errorMessage;
          }
          return result;
        })
        .catch((error) => console.log(JSON.stringify(error)));
    },
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

export default createYoga({
  schema,
  graphqlEndpoint: "/api/invite",
});
