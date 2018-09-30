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

    let nameAddressKey = this.generateKey(contact);

    if(_.has(dictionary.nameAddresses, nameAddressKey))
      return true;

    //Use Levenshtein to check the existing dictionary keys to see if they are close enough to consider it a duplicate.
    //A distance of 2 is probably close enough.
    let isDuplicate = false;
    let distanceForMatch = 2;

    _.forOwn(dictionary.nameAddresses, (val, key) =>{
      isDuplicate = levenshtein(key, nameAddressKey) <= distanceForMatch;

      if(isDuplicate)
        return false;
    });

    return isDuplicate;
  }

  static addDuplicateContact(contact, dictionary) {
    if(!contact)
      throw 'No contact passed in';

    if(!dictionary)
      throw 'No dictionary passed in';

    let key = this.generateKey(contact);

    if(!_.has(dictionary.nameAddresses, key))
      dictionary.nameAddresses[key] = true;
  }
}
