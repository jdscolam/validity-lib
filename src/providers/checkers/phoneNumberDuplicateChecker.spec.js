import PhoneNumberDuplicateChecker from './phoneNumberDuplicateChecker';
import Contact from '../../model/contact';

describe('PhoneNumberDuplicateChecker', () => {
  it('will identify a unique phone number', () => {
    let contact = new Contact();
    contact.phone = '555-555-5555';

    let dictionary = { phoneNumbers: {} };

    let isDuplicate = PhoneNumberDuplicateChecker.checkContact(contact, dictionary);

    expect(isDuplicate).toBe(false);
  });

  it('will identify a duplicate phone number', () => {
    let contact = new Contact();
    contact.phone = '555-555-5555';

    let dictionary = { phoneNumbers: { '555-555-5555': true } };

    let isDuplicate = PhoneNumberDuplicateChecker.checkContact(contact, dictionary);

    expect(isDuplicate).toBe(true);
  });

  it('will add a the phone number of an already identified duplicate contact', () => {
    let contact = new Contact();
    contact.phone = '555-555-5555';

    let dictionary = { phoneNumbers: { } };

    PhoneNumberDuplicateChecker.addDuplicateContact(contact, dictionary);

    expect(dictionary.phoneNumbers[contact.phone]).toBe(true);
  });
});
