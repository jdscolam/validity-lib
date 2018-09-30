import _ from 'lodash';
import Contacts from "../model/contacts";

export default class DuplicateContactProvider
{
  static process(contactRecords, checkers, dictionary){
    if(!contactRecords)
      return new Contacts();

    if(!_.isArray(checkers) || _.isEmpty(checkers))
      checkers = [];

    if(!_.isObject(dictionary))
      dictionary = {};

    let contacts = new Contacts();

    _.map(contactRecords, contact => {
      if(_.isEmpty(checkers)){
        contacts.uniqueContacts[contact.uuid] = contact;

        return true;
      }

      this.executeCheckers(checkers, contact, contacts, dictionary);
    });

    return contacts;
  }

  static executeCheckers(checkers, contact, contacts, dictionary){
    let masterUuid = null;
    let uuidUpdateFunctions = [];

    _.forEach(checkers, checker => {
      masterUuid = this.checkContact(checker, contact, contacts, dictionary);

      if(masterUuid === null){
        uuidUpdateFunctions.push(checker.setMasterUuid);
        return true;  //continue
      }

      checker.setMasterUuid(masterUuid, contact, dictionary);

      _.forEach(uuidUpdateFunctions, x => x(masterUuid, contact, dictionary));
      uuidUpdateFunctions = [];
    });

    if(masterUuid === null)
      contacts.uniqueContacts[contact.uuid] = contact;
    else
      this.handlePotentialDuplicateContact(masterUuid, contact, contacts);
  }

  static checkContact(checker, contact, contacts, dictionary){
    let masterUuid = checker.checkContact(contact);

    if(masterUuid === null){
      checker.addContact(contact, dictionary);
      return null;
    }

    return masterUuid;
  }

  static handlePotentialDuplicateContact(masterUuid, contact, contacts){
    if(!_.has(contacts.potentialDuplicateContacts, masterUuid)){
      contacts.potentialDuplicateContacts[masterUuid] = contacts.uniqueContacts[masterUuid] ?
        [contacts.uniqueContacts[masterUuid], contact]
        : [contact];

      delete contacts.uniqueContacts[masterUuid];
    }
    else
      contacts.potentialDuplicateContacts[masterUuid].push(contact);
  }
}
