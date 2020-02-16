const router = require("express").Router();
const { createRequest, retrieveRequest, retrieveRequestById, 
    retrieveRequestByEngineerId, retrieveRequestByShopId, changeRequestStatus } = require("../controllers/requestController");

router.route("/").post(createRequest);
router.route("/").get(retrieveRequest);
router.route("/id").get(retrieveRequestById);
router.route("/engineerById").get(retrieveRequestByEngineerId)
router.route("/shopById").get(retrieveRequestByShopId)
router.route("/status").put(changeRequestStatus)

module.exports = router;