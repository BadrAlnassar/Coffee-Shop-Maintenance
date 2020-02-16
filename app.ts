import { createConnection, getConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";


// createConnection method will automatically read connection options
// from your ormconfig file or environment variables
getConnectionOptions().then(connectionOptions => {
  return createConnection(Object.assign(connectionOptions, {
      namingStrategy: new SnakeNamingStrategy()
  }));
})
const app = require("express")();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = require('./routes/shopRoutes');

app.use("/api", router);

app.listen(3000, () => {
  console.log("run")
})