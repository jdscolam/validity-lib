import uuid from 'uuid/v4';
import EmailDuplicateChecker from './emailDuplicateChecker';
import Contact from '../../model/contact';

describe('EmailDuplicateChecker', () => {
  it('will identify a unique email', () => {
    let contact = new Contact();
    contact.email = 'test@test.com';

    let dictionary = { emails: {} };

    let duplicateUuid = EmailDuplicateChecker.checkContact(contact, dictionary);

    expect(duplicateUuid).toBeNull();
  });

  it('will identify a duplicate email', () => {
    let masterUuid = uuid();

    let contact = new Contact();
    contact.email = 'test@test.com';

    let dictionary = { emails: { 'test@test.com': masterUuid } };

    let duplicateUuid = EmailDuplicateChecker.checkContact(contact, dictionary);

    expect(duplicateUuid).toBe(masterUuid);
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

  it('will create emails dictionary entry if non exists', () => {
    let contact = new Contact();
    contact.email = 'test@test.com';

    let dictionary = { };

    let duplicateUuid = EmailDuplicateChecker.checkContact(contact, dictionary);

    expect(duplicateUuid).toBeNull();
    expect(_.has(dictionary, 'emails')).toBe(true);
    expect(_.isEmpty(dictionary.emails)).toBe(true);
  });
});
