import { createConnection, getConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Shop } from "./entities/Shop";

// createConnection method will automatically read connection options
// from your ormconfig file or environment variables
getConnectionOptions().then(connectionOptions => {
  return createConnection(Object.assign(connectionOptions, {
      namingStrategy: new SnakeNamingStrategy()
  }));
}).then(async() => {
  // let body = {
    // name: "Feras", 
    // location: "Riyadh",
    // ownerName: "Badr", 
    // ownerPhoneNumber: "0552113",
    // email: "badr@gmail.com",
    // hash: "test"
  // };
  
  // let shop = await Shop.createShop(new Shop(body.name, body.location, body.ownerName,
  //                                           body.ownerPhoneNumber, body.email, body.hash));
  // console.log(shop);
  
  
});
const app = require("express")();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = require('./routes/shopRoutes');

app.use("/api", router);

app.listen(3000, () => {
  console.log("run")
})