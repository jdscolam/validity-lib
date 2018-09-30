import _ from 'lodash';

export default class EmailDuplicateChecker{
  static checkContact(contact, dictionary){
    if(!contact)
      throw 'No contact passed in';

    if(!dictionary)
      throw 'No dictionary passed in';

    if(!_.has(dictionary, 'emails')){
      dictionary.emails = {};

      return null;
    }

    return _.has(dictionary.emails, contact.email) ? dictionary.emails[contact.email] : null;
  }

  static addContact(contact, dictionary) {
    if(!contact)
      throw 'No contact passed in';

    if(!dictionary)
      throw 'No dictionary passed in';

    if(!_.has(dictionary.emails, contact.email))
      dictionary.emails[contact.email] = contact.uuid;
  }

  static setMasterUuid(masterUuid, contact, dictionary) {
    if(!contact)
      throw 'No contact passed in';

    if(!dictionary)
      throw 'No dictionary passed in';

    dictionary.emails[contact.email] = masterUuid;
  }
}
