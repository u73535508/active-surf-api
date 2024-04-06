const express = require("express");
const {
  getStoragesForMember,
  saveStorage,
  deleteStorage,
  getStoragesInRange,
} = require("../controllers/storage");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();
router.get("/storage/getStoragesInRange", isAuthenticated, getStoragesInRange);
router.get(
  "/storage/getStoragesForMember/:memberId",
  isAuthenticated,
  getStoragesForMember
);
router.post("/storage/saveStorage", isAuthenticated, saveStorage);

router.delete(
  "/storage/deleteStorage/:storageId",
  isAuthenticated,
  deleteStorage
);
module.exports = router;
