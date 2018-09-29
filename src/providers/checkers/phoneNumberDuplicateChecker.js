export default class PhoneNumberDuplicateChecker{
  static checkContact(contact, dictionary, isDuplicate){
    if(!contact)
      throw 'No contact passed in';

    if(!dictionary)
      throw 'No dictionary passed in';

    if(_.has(dictionary.phoneNumbers, contact.phone))
      return true;

    dictionary.phoneNumbers[contact.phone] = true;

    return false;
  }
}
