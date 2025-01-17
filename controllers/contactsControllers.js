const { getAllContacts, addContact, delContact } = require("../services/contactServices");

const getAllController = async (req, res) => {
  const { _id: owner } = req.user;
  const getAll = await getAllContacts(owner);

  res.json(getAll);
};

const addContactController = async (req, res) => {
  const { _id: owner } = req.user;
  const addOneContact = await addContact(req.body, owner);

  res.status(201).json(addOneContact);
};

const delContactController = async (req, res) => {
  const { contactId } = req.params;

  const delOneContact = await delContact(contactId);

  if (!delOneContact) {
    res.status(404).json({
      message: "Not found",
    });
    return;
  }

  res.json({
    message: "Contact deleted",
  });
};

module.exports = {
  getAllController,
  addContactController,
  delContactController,
};
