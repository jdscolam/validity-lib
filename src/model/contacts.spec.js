import uuid from 'uuid/v4';
import Contacts from './contacts';
import Contact from './contact';

describe('Contacts', () => {
  it('creates a pretty print string', () => {
    let result = '\nPotential Duplicates\n\n' +
      '\t\u2022\ta,a,a,a,a,a,a,a,a,a,a,a\n' +
      '\t\u2022\tb,b,b,b,b,b,b,b,b,b,b,b\n\n' +
      'Non Duplicates\n\n' +
      '\t\u2022\ta,a,a,a,a,a,a,a,a,a,a,a\n' +
      '\t\u2022\tb,b,b,b,b,b,b,b,b,b,b,b\n\n';

    let contactA = new Contact();
    contactA.id = 'a';
    contactA.uuid = uuid();
    contactA.firstName = 'a';
    contactA.lastName = 'a';
    contactA.company = 'a';
    contactA.email = 'a';
    contactA.address1 = 'a';
    contactA.address2 = 'a';
    contactA.zip = 'a';
    contactA.city = 'a';
    contactA.stateLong = 'a';
    contactA.state = 'a';
    contactA.phone = 'a';

    let contactB = new Contact();
    contactB.id = 'b';
    contactB.uuid = uuid();
    contactB.firstName = 'b';
    contactB.lastName = 'b';
    contactB.company = 'b';
    contactB.email = 'b';
    contactB.address1 = 'b';
    contactB.address2 = 'b';
    contactB.zip = 'b';
    contactB.city = 'b';
    contactB.stateLong = 'b';
    contactB.state = 'b';
    contactB.phone = 'b';

    let contacts = new Contacts();
    contacts.potentialDuplicateContacts[contactA.uuid] = [];
    contacts.potentialDuplicateContacts[contactA.uuid].push(contactA, contactB);
    contacts.uniqueContacts[contactA.uuid] = contactA;
    contacts.uniqueContacts[contactB.uuid] = contactB;

    let printableString = contacts.getPrintableString();

    expect(printableString).toBe(result);
  });
});
