const router = require("express").Router();
const { createShop, retrieveShops, retrieveShopsById, retrieveShopsByEmail, login, changeLocation, rateEngineer } = require("../controllers/shopController")

router.route("/").post(createShop);
router.route("/").get(retrieveShops);
router.route("/id").get(retrieveShopsById);
router.route("/email").get(retrieveShopsByEmail);
router.route("/login").get(login);
router.route("/location").put(changeLocation);
router.route("/rateEngineer").post(rateEngineer);

module.exports = router;