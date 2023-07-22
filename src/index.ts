import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'

const init = async () => {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;

    app.use(express.json());

    // Create Graphql server
    const gqlServer = new ApolloServer({
      typeDefs: `
        type Query {
            hello: String
            say(name: String): String
        }
      `, // Schema
      resolvers: {
        Query: {
            hello: () => `Hey there I am graphql server`,
            say: (_,{name}:{name: string}) => `Hey ${name}, How are you ?`
        },
      }, // 
    });

    //start the gql server
    await gqlServer.start();

    app.get('/', (req, res) => {
      res.json({ message: 'Home Page' });
    });

    app.use('/graphql', expressMiddleware(gqlServer));

    app.listen(PORT, () => {
      console.log(`Server listening on port : ${PORT}`);
    });
}

init();
