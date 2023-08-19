const express = require("express");

const {
  getAllController,
  addContactController,
  delContactController,
} = require("../controllers/contactsControllers");

const isValidId = require("../middlewares/isValidId");
const authenticate = require("../middlewares/authenticate");

const contactValidator = require("../middlewares/validateContact");

const router = express.Router();

router.get("/", authenticate, getAllController);

router.post("/", authenticate, contactValidator, addContactController);

router.delete("/:contactId", authenticate, isValidId, delContactController);

module.exports = router;
