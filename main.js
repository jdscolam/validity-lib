import readFile from 'fs-readfile-promise';
import ContactCsvParser from './src/services/contactCsvParser';
import DuplicateContactProvider from './src/providers/duplicateContactProvider';
import EmailDuplicateChecker from './src/providers/checkers/emailDuplicateChecker';
import PhoneDuplicateChecker from './src/providers/checkers/phoneNumberDuplicateChecker';
import NameAddressDuplicateChecker from './src/providers/checkers/nameAddressDuplicateChecker';

(async () =>{
  console.log('Reading Files');
  const normalData = await readFile('./data/normal.csv');
  const advancedData = await readFile('./data/advanced.csv');

  let normalRecords = ContactCsvParser.parseRecords(normalData.toString());
  let normalContacts = DuplicateContactProvider.process(normalRecords, [EmailDuplicateChecker, PhoneDuplicateChecker, NameAddressDuplicateChecker]);
  let normalContactsJSON = JSON.stringify(normalContacts);

  let advancedRecords = ContactCsvParser.parseRecords(advancedData.toString());
  let advancedContacts = DuplicateContactProvider.process(advancedRecords, [EmailDuplicateChecker, PhoneDuplicateChecker, NameAddressDuplicateChecker]);
  let advancedContactsJSON = JSON.stringify(advancedContacts);

  console.log('\nNormal JSON Contacts\n');
  console.log(normalContactsJSON);
  console.log('\nAdvanced JSON Contacts\n');
  console.log(advancedContactsJSON);
  console.log('\nNormal Contacts Pretty Printing');
  console.log(normalContacts.getPrintableString());
  console.log('Advanced Contacts Pretty Printing');
  console.log(advancedContacts.getPrintableString());
})();
