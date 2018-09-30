import _ from 'lodash';
import metaphone from 'metaphone';

export default class nameAddressDuplicateChecker{
  static generateKey(contact){
    if(!contact)
      throw 'No contact passed in';

    let metaFirst = metaphone(contact.firstName);
    let metaLast = metaphone(contact.lastName);

    //NOTE:  Leaving an additional variable as it is easier to debug
    // noinspection UnnecessaryLocalVariableJS
    let key = `${metaFirst} ${metaLast} ${contact.address1} ${contact.zip}`;

    return key;
  }

  static checkContact(contact, dictionary){
    if(!contact)
      throw 'No contact passed in';

    if(!dictionary)
      throw 'No dictionary passed in';

    let key = this.generateKey(contact);

    return _.has(dictionary.nameAddresses, key);
  }

  static addDuplicateContact(contact, dictionary) {
    if(!contact)
      throw 'No contact passed in';

    if(!dictionary)
      throw 'No dictionary passed in';

    let key = this.generateKey(contact);

    if(!_.has(dictionary.nameAddresses, key))
      dictionary.emails[contact.key] = true;
  }
}
