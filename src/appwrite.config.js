import { Client, Databases } from 'appwrite';

const client = new Client();
const databases = new Databases(client);

client
  .setEndpoint(process.env.REACT_APP_API_ENDPOINT)
  .setProject(process.env.REACT_APP_PROJECT_ID);

export default client;
export { databases };
