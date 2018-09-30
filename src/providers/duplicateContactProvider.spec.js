import _ from 'lodash';
import uuid from 'uuid/v4';
import DuplicateContactProvider from './duplicateContactProvider'
import Contact from '../model/contact';
import Contacts from '../model/contacts';

describe('DuplicateContactProvider', function() {
  let contactRecords = [];

  beforeEach(function() {
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

    contactRecords = [contactA, contactB];
  });

  it('processes contact records', function() {
    let contacts = DuplicateContactProvider.process(contactRecords);

    expect(contacts).not.toBeNull();
    expect(_.isEmpty(contacts.uniqueContacts)).toBe(false);
    expect(_.values(contacts.uniqueContacts).length).toBe(2);
    expect(contacts.uniqueContacts[contactRecords[0].uuid]).toBe(contactRecords[0]);
    expect(contacts.uniqueContacts[contactRecords[1].uuid]).toBe(contactRecords[1]);
  });

  it('uses each provided checker to check contact records for being potential duplicates', function() {
    let checker1 = { id:1, checkContact: () => null, addContact: () => null, setMasterUuid: () => null};
    let checker2 = { id:2, checkContact: () => null, addContact: () => null, setMasterUuid: () => null};
    let checkers = [checker1, checker2];
    spyOn(checker1, 'checkContact').and.returnValue(null);
    spyOn(checker2, 'checkContact').and.returnValue(null);

    DuplicateContactProvider.process(contactRecords, checkers);

    expect(checker1.checkContact).toHaveBeenCalled();
    expect(checker2.checkContact).toHaveBeenCalled();
  });

  it('adds duplicates to the same bucket', function() {
    let masterUuid = uuid();
    let checker = { checkContact: (contact) => masterUuid};
    let contacts = new Contacts();

    DuplicateContactProvider.handlePotentialDuplicateContact(masterUuid, contactRecords[0], contacts);
    DuplicateContactProvider.handlePotentialDuplicateContact(masterUuid, contactRecords[1], contacts);

    expect(_.isEmpty(contacts.potentialDuplicateContacts)).toBe(false);
    expect(_.isEmpty(contacts.potentialDuplicateContacts[masterUuid])).toBe(false);
    expect(contacts.potentialDuplicateContacts[masterUuid].length).toBe(2);
    expect(contacts.potentialDuplicateContacts[masterUuid][0]).toBe(contactRecords[0]);
    expect(contacts.potentialDuplicateContacts[masterUuid][1]).toBe(contactRecords[1]);
  });

  it('deletes non duplicate master record when a new duplicate is found', function() {
    let masterUuid = uuid();
    contactRecords[0].uuid = masterUuid;
    let contacts = new Contacts();
    contacts.uniqueContacts[masterUuid] = contactRecords[0];

    let contactC = new Contact();
    contactC.id = 'c';
    contactC.uuid = uuid();
    contactC.firstName = 'c';
    contactC.lastName = 'c';
    contactC.company = 'c';
    contactC.email = 'c';
    contactC.address1 = 'c';
    contactC.address2 = 'c';
    contactC.zip = 'c';
    contactC.city = 'c';
    contactC.stateLong = 'c';
    contactC.state = 'c';
    contactC.phone = 'c';
    contactRecords.push(contactC);

    DuplicateContactProvider.handlePotentialDuplicateContact(masterUuid, contactRecords[1], contacts);
    DuplicateContactProvider.handlePotentialDuplicateContact(masterUuid, contactRecords[2], contacts);

    expect(_.isEmpty(contacts.uniqueContacts)).toBe(true);
    expect(_.isEmpty(contacts.potentialDuplicateContacts)).toBe(false);
    expect(_.isEmpty(contacts.potentialDuplicateContacts[masterUuid])).toBe(false);
    expect(contacts.potentialDuplicateContacts[masterUuid].length).toBe(3);
    expect(contacts.potentialDuplicateContacts[masterUuid][0]).toBe(contactRecords[0]);
    expect(contacts.potentialDuplicateContacts[masterUuid][1]).toBe(contactRecords[1]);
    expect(contacts.potentialDuplicateContacts[masterUuid][2]).toBe(contactRecords[2]);
  });

  it('stores relevant contact information into a lookup dictionary', function() {
    let checker1 = { checkContact: (contact) => null, addContact: (x, y) => y.emails[x.email] = x.uuid};
    let checker2 = { checkContact: (contact) => null, addContact: (x, y) => y.phoneNumbers[x.phone] = x.uuid};
    let checkers = [checker1, checker2];
    let dictionary = { emails: {}, phoneNumbers: {}};

    DuplicateContactProvider.process(contactRecords, checkers, dictionary);

    expect(dictionary.emails[contactRecords[0].email]).toBe(contactRecords[0].uuid);
    expect(dictionary.emails[contactRecords[1].email]).toBe(contactRecords[1].uuid);
    expect(dictionary.phoneNumbers[contactRecords[0].phone]).toBe(contactRecords[0].uuid);
    expect(dictionary.phoneNumbers[contactRecords[1].phone]).toBe(contactRecords[1].uuid);
  });

  it('fixes any mis-matched master uuids on duplicates', function() {
    let contactC = new Contact();
    contactC.id = 'c';
    contactC.uuid = uuid();
    contactC.firstName = 'c';
    contactC.lastName = 'c';
    contactC.company = 'c';
    contactC.email = 'c';
    contactC.address1 = 'c';
    contactC.address2 = 'c';
    contactC.zip = 'c';
    contactC.city = 'c';
    contactC.stateLong = 'c';
    contactC.state = 'c';
    contactC.phone = 'c';
    contactRecords.push(contactC);

    let checker1 = { checkContact: (contact) => null, addContact: (x, y) => y.emails[x.email] = x.uuid, setMasterUuid: (masterUuid, contact, dictionary) => dictionary.emails[contact.email] = masterUuid};
    let checker2 = { checkContact: (contact) => null, addContact: (x, y) => y.phoneNumbers[x.phone] = x.uuid, setMasterUuid: (masterUuid, contact, dictionary) => dictionary.phoneNumbers[contact.phone] = masterUuid};
    let checker3 = { checkContact: (contact) => contact.id === contactC.id ? contactRecords[0].uuid : null , addContact: (x, y) => y.firstNames[x.firstName] = x.uuid, setMasterUuid: (masterUuid, contact, dictionary) => dictionary.firstNames[contact.firstName] = masterUuid};
    let checkers = [checker1, checker2, checker3];
    let dictionary = { emails: {}, phoneNumbers: {}, firstNames: {}};

    DuplicateContactProvider.process(contactRecords, checkers, dictionary);

    expect(dictionary.emails[contactRecords[2].email]).toBe(contactRecords[0].uuid);
    expect(dictionary.phoneNumbers[contactRecords[2].phone]).toBe(contactRecords[0].uuid);
    expect(dictionary.firstNames[contactRecords[2].firstName]).toBe(contactRecords[0].uuid);
  });

  it('generates a dictionary if none is provided', function() {
    DuplicateContactProvider.process(contactRecords, []);
  });
});
