import NameAddressDuplicateChecker from './nameAddressDuplicateChecker';
import Contact from '../../model/contact';
import EmailDuplicateChecker from "./emailDuplicateChecker";

describe('NameAddressDuplicateChecker', () => {
  it('generates a key from the name address and zip', () => {
    let result = 'JN SM0 555 Some Street 12345';

    let contact = new Contact();
    contact.firstName = 'Jon';
    contact.lastName = 'Smith';
    contact.address1 = '555 Some Street';
    contact.zip = '12345';

    let nameAddressKey = NameAddressDuplicateChecker.generateKey(contact);

    expect(nameAddressKey).toBe(result);
  });

  it('will identify a unique name address combo by key', () => {
    let contact = new Contact();
    contact.firstName = 'Jon';
    contact.lastName = 'Smith';
    contact.address1 = '555 Some Street';
    contact.zip = '12345';

    let dictionary = { nameAddresses: { } };

    let isDuplicate = NameAddressDuplicateChecker.checkContact(contact, dictionary);

    expect(isDuplicate).toBe(false);
  });

  it('will identify a duplicate name address combo by key', () => {
    let contact = new Contact();
    contact.firstName = 'Jon';
    contact.lastName = 'Smith';
    contact.address1 = '555 Some Street';
    contact.zip = '12345';

    let dictionary = { nameAddresses: { 'JN SM0 555 Some Street 12345': true } };

    let isDuplicate = NameAddressDuplicateChecker.checkContact(contact, dictionary);

    expect(isDuplicate).toBe(true);
  });

  it('will identify a duplicate name address combo by key with similar spellings', () => {
    let contact1 = new Contact();
    contact1.firstName = 'Jon';
    contact1.lastName = 'Smith';
    contact1.address1 = '555 Some Street';
    contact1.zip = '12345';

    let contact2 = new Contact();
    contact2.firstName = 'John';
    contact2.lastName = 'Smith';
    contact2.address1 = '555 Some Street';
    contact2.zip = '12345';

    let contact3 = new Contact();
    contact3.firstName = 'John';
    contact3.lastName = 'Smythe';
    contact3.address1 = '555 Some Street';
    contact3.zip = '12345';

    let dictionary = { nameAddresses: { 'JN SM0 555 Some Street 12345': true } };

    let isDuplicate1 = NameAddressDuplicateChecker.checkContact(contact1, dictionary);
    let isDuplicate2 = NameAddressDuplicateChecker.checkContact(contact2, dictionary);
    let isDuplicate3 = NameAddressDuplicateChecker.checkContact(contact3, dictionary);

    expect(isDuplicate1).toBe(true);
    expect(isDuplicate2).toBe(true);
    expect(isDuplicate3).toBe(true);
  });

  it('will identify a duplicate name address combo by key with slightly distant spellings', () => {
    let contact1 = new Contact();
    contact1.firstName = 'Jonathan';
    contact1.lastName = 'Smith';
    contact1.address1 = '555 Some Street';
    contact1.zip = '12345';

    let contact2 = new Contact();
    contact2.firstName = 'John';
    contact2.lastName = 'Smythers';
    contact2.address1 = '555 Some Street';
    contact2.zip = '12345';

    let dictionary = { nameAddresses: { 'JN SM0 555 Some Street 12345': true } };

    let isDuplicate1 = NameAddressDuplicateChecker.checkContact(contact1, dictionary);
    let isDuplicate2 = NameAddressDuplicateChecker.checkContact(contact2, dictionary);

    expect(isDuplicate1).toBe(true);
    expect(isDuplicate2).toBe(true);
  });

  it('will add the name address key of a contact in order to identify future duplicates', () => {
    let contact = new Contact();
    contact.firstName = 'Jon';
    contact.lastName = 'Smith';
    contact.address1 = '555 Some Street';
    contact.zip = '12345';

    let dictionary = { nameAddresses: { } };

    NameAddressDuplicateChecker.addContact(contact, dictionary);

    expect(dictionary.nameAddresses['JN SM0 555 Some Street 12345']).toBe(true);
  });
});
