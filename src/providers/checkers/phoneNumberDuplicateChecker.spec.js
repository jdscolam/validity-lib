import PhoneNumberDuplicateChecker from './phoneNumberDuplicateChecker';
import Contact from '../../model/contact';
import uuid from 'uuid/v4';

describe('PhoneNumberDuplicateChecker', () => {
  it('will identify a unique phone number', () => {
    let contact = new Contact();
    contact.phone = '555-555-5555';

    let dictionary = { phoneNumbers: {} };

    let duplicateUuid = PhoneNumberDuplicateChecker.checkContact(contact, dictionary);

    expect(duplicateUuid).toBeNull();
  });

  it('will identify a duplicate phone number', () => {
    let masterUuid = uuid();

    let contact = new Contact();
    contact.phone = '555-555-5555';

    let dictionary = { phoneNumbers: { '555-555-5555': masterUuid } };

    let duplicateUuid = PhoneNumberDuplicateChecker.checkContact(contact, dictionary);

    expect(duplicateUuid).toBe(masterUuid);
  });

  it('will add the phone number a contact in order to identify future duplicates', () => {
    let contact = new Contact();
    contact.uuid = uuid();
    contact.phone = '555-555-5555';

    let dictionary = { phoneNumbers: { } };

    PhoneNumberDuplicateChecker.addContact(contact, dictionary);

    expect(dictionary.phoneNumbers[contact.phone]).toBe(contact.uuid);
  });

  it('will set the master record id', () => {
    let masterUuid = uuid();

    let contact = new Contact();
    contact.phone = '555-555-5555';

    let dictionary = { phoneNumbers: { } };

    PhoneNumberDuplicateChecker.setMasterUuid(masterUuid, contact, dictionary);

    expect(dictionary.phoneNumbers[contact.phone]).toBe(masterUuid);
  });
});
