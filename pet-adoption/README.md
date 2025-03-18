
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

- npx prisma db push 
    - (This is to push the DB to the server)

- npx prisma generate 
    - (we use prisma for our DB)


# Environment Variables

Create a new file called `.env` in the root directory of the project and copy the following content: 

```env
DATABASE_URL='postgresql://neondb_owner:npg_arNhxA8mFIQ0@ep-curly-darkness-a81arwqc-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
API_KEY=zrIlC3PXwyRflWWrzr5DspswYINSmAMq8Z0sVOD00hgo93fJzJ
API_SECRET=f1Y4cMVbi1CHhBaS1CQ2BjMmrWNO9BOWxVqHIowq
ACCESS_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ6cklsQzNQWHd5UmZsV1dyenI1RHNwc3dZSU5TbUFNcThaMHNWT0QwMGhnbzkzZkp6SiIsImp0aSI6ImUyNWNjZjI1NmIwOTNiMzEzYzhiNTQ0YjViMzcwZGI4NDZiOGI1NDRjMDhjNDk0ZThlNWQ5NzMxYTgyZWE1NDkxZDY2ZDYxYzE0M2M1MWM5IiwiaWF0IjoxNzQyMzA4NzI4LCJuYmYiOjE3NDIzMDg3MjgsImV4cCI6MTc0MjMxMjMyOCwic3ViIjoiIiwic2NvcGVzIjpbXX0.BFGYeCf7pUfGpTUI79RbcMytTcLbRhvtiZ11UOkztuKSdNtvKGsg02Fpynx5ujhtmpjCkopbHpIVzbH5qN0XOrHxtzbrcgSloJGq6WV-1xm_n_3oQz0tllZEvaiJZK_pGip4inJPzBPT_d93i3HhtLFdfxkw7YjiPHNAi5jhgPA2rXLNwm_U2vEy-AO2ZPQR0LxX6OZCf4zpt445Ij3hixoGWDIEjkPhPA1KuuMKyAC8LswIvN2FjPSUJ5ZMfQJ28eX3LKaivbXI4DgnmCSNGAKVoh8CuOwRCub5SW5KMbizoj0cx4G_nPFK3U-Q-84Jx82telB88dC-4z0FiCh94Q

> [!CAUTION]
> ACCESS_TOKE may expire and send a 401 response, if that happens, open cmd and run the following command:

curl -d "grant_type=client_credentials&client_id=zrIlC3PXwyRflWWrzr5DspswYINSmAMq8Z0sVOD00hgo93fJzJ&client_secret=f1Y4cMVbi1CHhBaS1CQ2BjMmrWNO9BOWxVqHIowq" https://api.petfinder.com/v2/oauth2/token

then copy the new ACCESS_TOKEN and paste it in the .env file.

```

## Run in Local

Now that you have installed the dependencies, run the following command to run the project locally: 

- npm run dev

This command will start the project and generate a "Localhost" link, click on it and it will open a web tab where you can see the web app and all the changes you make on the project.

Now you are ready to start working on the project.
