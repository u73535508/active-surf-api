const express = require("express");
const {
  getStoragesForMember,
  saveStorage,
  deleteStorage,
  getStoragesInRange,
} = require("../controllers/storage");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();
router.get("/storage/getStoragesInRange", getStoragesInRange);
router.get(
  "/storage/getStoragesForMember/:memberId",

  getStoragesForMember
);
router.post("/storage/saveStorage", saveStorage);

router.delete(
  "/storage/deleteStorage/:storageId",

  deleteStorage
);
module.exports = router;
