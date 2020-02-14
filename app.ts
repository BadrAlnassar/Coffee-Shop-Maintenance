import {createConnection} from "typeorm";

// createConnection method will automatically read connection options
// from your ormconfig file or environment variables
const connection =  async() => {
  await createConnection();
}

connection();
console.log("Application is up and running");