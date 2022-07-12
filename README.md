# mosano-backend is a backend solution created using NodeJS, Apollo Server(GraphQL) and MongoDB (with mongoose as the ORM) with TypeScript

Application developed using **NodeJS** with **TypeScript**, **Apollo Server(GraphQL)** and **MongoDB** (with **mongoose** as the ORM).

#### Features:

- Generate and verify tokens for authentication, using the library jsonwebtoken, protecting every GraphQL API call.
- All querys and mutations are done with GraphQL, using Apollo Server.
- Uses MongoDB with moongose to store, retrieve and delete information about users.
- Retrieves a static list of countries, stored locally.

#### Notes:

- A single unit test (for the handleToken module) was implemented to showcase knowledge in the matter.
- For simplification, the authentication method doesn't encript the password and the credentials (username and password) are configured as environment variables, there are not username or password restrictions.
- To experiment with the queries and mutations using the Apollo Studio, the authentication headers must be disabled, the easiest way to do this is commenting line 15 on `/src/apollo/config.ts` (note that you should uncomment it so that the frontend authentication works correctly).

```
15      // context: verifyTokenFromRequest,
```

## How to use

1. First, you have to configure a MongoDB cluster to run locally, if you already have this, you can go directly to the step VII of these instructions:

   1. Go to [mongodb.com](https://www.mongodb.com/) and create a new Atlas account (**Try free** button on the right upper corner), wait for the verification email and then log in to your account.
   2. Once in the main view, click the **Build a Database** button in the center of the screen.

   3. In the next view, click **Create** in the rightmost option (free, shared service)

   4. In the next view, leave default options and click on the footer button **Create Cluster**.

   5. You will be directed to the **Security Quickstart** page. For the first option create an user and take note of the username and password chosen.

      ![credentials](/assets/credentials.png)

   6. For the second option, leave the default option (**My Local Environment**), click on **Add My Current IP Adress** and then on **Finish and Close**. Your cluster will deploy, you might have to wait a few minutes for this process to finish.

      ![localenvironment](/assets/localenvironment.png)

   7. **Done!** You have configured your cluster and it should look something like the following image. Before closing the tab, you need to take note on the path of your cluster. Click the **Connect** button in your cluster.

      ![finishedprocess](/assets/finishedprocess.png)

   8. Now select the second option, **Connect your application**.

      ![connecttoapp](/assets/connecttoapp.png)

   9. In the next screen, for the first option choose Nose.js driver and the version 4.1 or later. A string will appear in your second option. Notice the substring shown on the next picture (the one between the **@** and **.mongodb...**). This is your cluster path, take note of that as it will be important to configure your environment variables.

      ![clusterpath](/assets/clusterpath.png)

2. Clone the repository.

```
git clone https://github.com/salgadopietrini/mosano-backend.git
```

3. Create a file named `.env` in the root directory. Access it and configure the following environment variables:

```
    PORT=8000
    NODE_ENV=development
    DB_USER=<username defined when creating the MongoDB cluster>
    DB_PASSWORD=<password defined when creating the MongoDB cluster>
    DB_CLUSTER=<cluster path retrieved on the step 1.9>
    LOGIN_USER=<username you'll use to access the application from the frontend web app, can be any type of string>
    LOGIN_PASS=<password you'll use to access the application from the frontend web app, can be any type of string>
    SECRET_KEY=<define a secret key, can also be any type of string>
```

**Note:** Make sure your `PORT` variable is set to `8000`, it's important for the frontend app to work correctly.

Your environment variables should look something like this:

![env](/assets/env.png)


4. Run `npm install` to install the node modules

```
npm install
```

5. Run `npm run build`. This will create a dist folder where the compiled code from TS is stored.

```
npm run build
```

6. Run `npm start`. The server will start at (http://localhost:8000/). You are now ready to start the frontend app.

```
npm start
```

![runningapp](/assets/runningapp.png)

**Note**: You can also skip steps 5 and 6 and run `npm run dev` instead. This will execute the compiler and start the program, and will execute again every time any file changes.

```
npm run dev
```

7. To run the test run `npm run test`. You'll get the coverage report both in the console and as an html file in `/coverage/index.html`

```
npm run test
```
