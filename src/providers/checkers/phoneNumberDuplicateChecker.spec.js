import PhoneNumberDuplicateChecker from './phoneNumberDuplicateChecker';
import Contact from "../../model/contact";

describe('PhoneNumberDuplicateChecker', () => {
  it('will properly identify a unique phone number', () => {
    let contact = new Contact();
    contact.phone = '555-555-5555';

    let dictionary = { phoneNumbers: {} };

    let isDuplicate = PhoneNumberDuplicateChecker.checkContact(contact, dictionary);

    expect(isDuplicate).toBe(false);
  });

  it('will add a unique phone number to the dictionary', () => {
    let contact = new Contact();
    contact.phone = '555-555-5555';

    let dictionary = { phoneNumbers: {} };

    PhoneNumberDuplicateChecker.checkContact(contact, dictionary);

    expect(dictionary.phoneNumbers[contact.phone]).toBe(true);
  });
  it('will properly identify a unique phone number', () => {
    let contact = new Contact();
    contact.phone = '555-555-5555';

    let dictionary = { phoneNumbers: {} };

    let isDuplicate = PhoneNumberDuplicateChecker.checkContact(contact, dictionary);

    expect(isDuplicate).toBe(false);
  });
});
