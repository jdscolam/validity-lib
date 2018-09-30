import readFile from 'fs-readfile-promise';
import _ from 'lodash';
import ContactCsvParser from './src/services/contactCsvParser';
import Contacts from "./src/model/contacts";

(async () =>{
  console.log('Reading Files');
  const normalData = await readFile('./data/normal.csv');
  const advancedData = await readFile('./data/advanced.csv');

  let records = ContactCsvParser.parseRecords(normalData.toString());

  let contacts = new Contacts();
  contacts.uniqueContacts = _.keyBy(records, x => x.uuid);

  let contactsJSON = JSON.stringify(contacts);
  console.log(contactsJSON);
  console.log(contacts.getPrintableString());
})();
