const router = require("express").Router();
const { createEngineer, retrieveEngineer, retrieveEngineerById, retrieveEngineerByEmail, login } = require("../controllers/engineerController")

router.route("/").post(createEngineer);
router.route("/").get(retrieveEngineer);
router.route("/id").get(retrieveEngineerById);
router.route("/email").get(retrieveEngineerByEmail);
router.route("/login").get(login);

module.exports = router;