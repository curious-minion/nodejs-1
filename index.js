const { program } = require("commander");

const contactsOperations = require("./controllers/contacts/index");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const contacts = await contactsOperations.listContacts();
        console.table(contacts);
      } catch (error) {
        console.log(error.message);
      }

      break;

    case "get":
      try {
        const contactById = await contactsOperations.getContactById(id);
        if (!contactById) {
          console.log(`User with the id=${id} was not found`);
        }
        console.log(contactById);
      } catch (error) {
        console.log(error.message);
      }

      break;

    case "add":
      try {
        if (!name || !email || !phone) {
          console.log("Please type in user's name, email and phone number");
          break;
        }
        const newContact = await contactsOperations.addContact({
          name,
          email,
          phone,
        });
        console.log(newContact);
      } catch (error) {
        console.log(error.message);
      }

      break;

    case "remove":
      try {
        const removeContact = await contactsOperations.removeContact(id);

        if (!removeContact) {
          console.log(
            "Please choose the existing user's id to proceed with the deletion"
          );
        }
        console.log(`User with the id: ${id} was deleted`);
      } catch (error) {
        console.log(error.message);
      }

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
