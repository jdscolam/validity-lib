import _ from 'lodash';

export default class PhoneNumberDuplicateChecker{
  static checkContact(contact, dictionary){
    if(!contact)
      throw 'No contact passed in';

    if(!dictionary)
      throw 'No dictionary passed in';

    if(!_.has(dictionary, 'phoneNumbers')){
      dictionary.phoneNumbers = {};

      return null;
    }

    return _.has(dictionary.phoneNumbers, contact.phone) ? dictionary.phoneNumbers[contact.phone] : null;
  }

  static addContact(contact, dictionary) {
    if(!contact)
      throw 'No contact passed in';

    if(!dictionary)
      throw 'No dictionary passed in';

    if(!_.has(dictionary.phoneNumbers, contact.phone))
      dictionary.phoneNumbers[contact.phone] = contact.uuid;
  }

  static setMasterUuid(masterUuid, contact, dictionary) {
    if(!contact)
      throw 'No contact passed in';

    if(!dictionary)
      throw 'No dictionary passed in';

    dictionary.phoneNumbers[contact.phone] = masterUuid;
  }
}
