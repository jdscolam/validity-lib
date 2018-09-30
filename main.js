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
  let normalResults = DuplicateContactProvider.process(normalRecords, [EmailDuplicateChecker, PhoneDuplicateChecker, NameAddressDuplicateChecker]);
  let normalContactsJSON = JSON.stringify(normalResults.contacts);

  let advancedRecords = ContactCsvParser.parseRecords(advancedData.toString());
  let advancedResults = DuplicateContactProvider.process(advancedRecords, [EmailDuplicateChecker, PhoneDuplicateChecker, NameAddressDuplicateChecker]);
  let advancedContactsJSON = JSON.stringify(advancedResults.contacts);

  console.log('\nNormal JSON Contacts\n');
  console.log(normalContactsJSON);
  console.log('\nAdvanced JSON Contacts\n');
  console.log(advancedContactsJSON);
  console.log('\nNormal Contacts Pretty Printing');
  console.log(normalResults.contacts.getPrintableString());
  console.log('Advanced Contacts Pretty Printing');
  console.log(advancedResults.contacts.getPrintableString());
})();
