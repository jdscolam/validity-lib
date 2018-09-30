import _ from 'lodash';

export default class EmailDuplicateChecker{
  static checkContact(contact, dictionary){
    if(!contact)
      throw 'No contact passed in';

    if(!dictionary)
      throw 'No dictionary passed in';

    return _.has(dictionary.emails, contact.email);
  }

  static addDuplicateContact(contact, dictionary) {
    if(!contact)
      throw 'No contact passed in';

    if(!dictionary)
      throw 'No dictionary passed in';

    if(!_.has(dictionary.emails, contact.email))
      dictionary.emails[contact.email] = true;
  }
}
