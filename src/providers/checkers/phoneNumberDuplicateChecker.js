export default class PhoneNumberDuplicateChecker{
  static checkContact(contact, dictionary, isDuplicate){
    if(!contact)
      throw 'No contact passed in';

    if(!dictionary)
      throw 'No dictionary passed in';

    return _.has(dictionary.phoneNumbers, contact.phone);


  }
}
