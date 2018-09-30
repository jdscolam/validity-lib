import NameAddressDuplicateChecker from './nameAddressDuplicateChecker';
import Contact from '../../model/contact';

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
});
