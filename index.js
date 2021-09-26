const { program } = require("commander");

const contactsOperations = require("./contacts");

program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const options = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const contacts = await contactsOperations.listContacts();
            console.table(contacts);
            break;

        case 'get':
            const contactById = await contactsOperations.getContactById(id);
            if (!contactById) {
                console.log(`User with the id=${id} was not found`);
            }
            console.log(contactById);
            break;

        case 'add':
            if (!name || !email || !phone) {
                console.log("Please type in user's name, email and phone number");
                break;
            }
            const newContact = await contactsOperations.addContact({ name, email, phone });
            console.log(newContact);
            break;

        case 'remove':
            const removeContact = await contactsOperations.removeContact(id);

            if (!removeContact) {
                console.log("Please choose the existing user's id to proceed with the deletion");
            }
            console.log(`User with the id: ${id} was deleted`);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(options);


