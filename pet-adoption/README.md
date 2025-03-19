
# Local Installation Tutorial 

This documentation is to explain how to set up the project for local development.

## Prerequisites
Ensure you have the following installed:

- Node.js (LTS recommended)
- npm or Yarn

If it's not installed follow the tutorial of how to install them:

- Node.js and npm: https://www.geeksforgeeks.org/how-to-download-and-install-node-js-and-npm/
- Yarn (optional): https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable


## npm Installation Dependencies

Once you open the project, open a terminal and navigate to the project directory:

- cd C:\\[your-folders-path]\PetAdoptionSystem\pet-adoption

Now that you are on the project directory, run the following commands (Run them one at a time):

- npm i 
    - (This is to install node-modules required for the project)

- npx prisma generate 
    - (we use prisma for our DB)

- openssl rand -base64 32
    - （generate your JWT secret)
# Environment Variables

Create a new file called `.env` in the root directory of the project and copy the following content: 

```env
DATABASE_URL='postgresql://neondb_owner:npg_arNhxA8mFIQ0@ep-curly-darkness-a81arwqc-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
API_KEY=zrIlC3PXwyRflWWrzr5DspswYINSmAMq8Z0sVOD00hgo93fJzJ
API_SECRET=f1Y4cMVbi1CHhBaS1CQ2BjMmrWNO9BOWxVqHIowq
JWT_SECRET='your jwt secret'
```


## Run in Local

Now that you have installed the dependencies, run the following command to run the project locally: 

- npm run dev

This command will start the project and generate a "Localhost" link, click on it and it will open a web tab where you can see the web app and all the changes you make on the project.

Now you are ready to start working on the project.
