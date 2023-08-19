const Contact = require("../db/models/contactModel");

const getAllContacts = async (owner) => {
  const result = await Contact.find({ owner });
  console.log(result);
  return result;
};

const addContact = async (data, owner) => {
  const result = await Contact.create({ ...data, owner });

  console.log(result);

  return result;
};

const delContact = async (id) => {
  const result = await Contact.findByIdAndRemove(id);

  return result;
};

module.exports = { getAllContacts, addContact, delContact };
