import uuid from 'uuid/v4';
import EmailDuplicateChecker from './emailDuplicateChecker';
import Contact from '../../model/contact';

describe('EmailDuplicateChecker', () => {
  it('will identify a unique email', () => {
    let contact = new Contact();
    contact.email = 'test@test.com';

    let dictionary = { emails: {} };

    let isDuplicate = EmailDuplicateChecker.checkContact(contact, dictionary);

    expect(isDuplicate).toBe(false);
  });

  it('will identify a duplicate email', () => {
    let contact = new Contact();
    contact.email = 'test@test.com';

    let dictionary = { emails: { 'test@test.com': uuid() } };

    let isDuplicate = EmailDuplicateChecker.checkContact(contact, dictionary);

    expect(isDuplicate).toBe(true);
  });

  it('will add the email of the contact in order to identify future duplicates', () => {
    let contact = new Contact();
    contact.email = 'test@test.com';

    let dictionary = { emails: { } };

    EmailDuplicateChecker.addContact(contact, dictionary);

    expect(dictionary.emails[contact.email]).toBe(contact.uuid);
  });

  it('will set the master record id', () => {
    let masterUuid = uuid();

    let contact = new Contact();
    contact.email = 'test@test.com';

    let dictionary = { emails: { } };

    EmailDuplicateChecker.setMasterUuid(masterUuid, contact, dictionary);

    expect(dictionary.emails[contact.email]).toBe(masterUuid);
  });
});
