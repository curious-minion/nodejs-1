const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join('db', "contacts.json");



const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts;
    }
    catch (error) {
        console.log(error.message)
    }
};


const getContactById = async (id) => {
    try {
        const contacts = await listContacts();
        // const idx = contacts.findIndex(contact => contact.id === id);
        const contact = contacts.find(contact => contact.id === Number(id));
        if (!contact) {
            return null;
        }
        return contact;
    }
    catch (error) {
        console.log(error.message);
    }
};

const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        const idx = contacts.findIndex(item => item.id === Number(contactId));
        if (!idx) {
            return null;
        }

        contacts.splice(idx, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return true;
    }
    catch (error) {
        console.log(error.message);
    }

};

const addContact = async ({ name, email, phone }) => {
    try {
        const contacts = await listContacts();
        const newContact = { id: v4(), name, email, phone };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return newContact;
    } catch (error) {
        console.log(error.message);
    }
};


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}