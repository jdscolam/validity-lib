import _ from 'lodash';
import metaphone from 'metaphone';
import levenshtein from 'js-levenshtein';

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

    if(!_.has(dictionary, 'nameAddresses')){
      dictionary.nameAddresses = {};

      return null;
    }

    let nameAddressKey = this.generateKey(contact);

    if(_.has(dictionary.nameAddresses, nameAddressKey))
      return dictionary.nameAddresses[nameAddressKey];

    //Use Levenshtein to check the existing dictionary keys to see if they are close enough to consider it a duplicate.
    //A distance of 2 is probably close enough.
    let duplicateUuid = null;
    let distanceForMatch = 2;

    _.forOwn(dictionary.nameAddresses, (val, key) =>{
      duplicateUuid = levenshtein(key, nameAddressKey) <= distanceForMatch ? val : null;

      if(duplicateUuid)
        return false;
    });

    return duplicateUuid;
  }

  static addContact(contact, dictionary) {
    if(!contact)
      throw 'No contact passed in';

    if(!dictionary)
      throw 'No dictionary passed in';

    let key = this.generateKey(contact);

    if(!_.has(dictionary.nameAddresses, key))
      dictionary.nameAddresses[key] = contact.uuid;
  }

  static setMasterUuid(masterUuid, contact, dictionary) {
    if(!contact)
      throw 'No contact passed in';

    if(!dictionary)
      throw 'No dictionary passed in';

    let key = this.generateKey(contact);

    dictionary.nameAddresses[key] = masterUuid;
  }
}
