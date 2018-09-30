import _ from 'lodash';
import uuid from 'uuid/v4';
import Contact from "../model/contact";

export default class ContactCsvParser {

  static parseRecord(record) {
    if(!_.isString(record))
      return null;

    //TODO: Add validation that the record is really a record of the correct size, etc.

    let recordArray = _.split(record, ',');

    let contact = new Contact();
    contact.id = recordArray[0];
    contact.uuid = uuid();
    contact.firstName = recordArray[1];
    contact.lastName = recordArray[2];
    contact.company = _.replace(recordArray[3], '"', '');
    contact.email = recordArray[4];
    contact.address1 = recordArray[5];
    contact.address2 = recordArray[6];
    contact.zip = recordArray[7];
    contact.city = recordArray[8];
    contact.stateLong = recordArray[9];
    contact.state = recordArray[10];
    contact.phone = recordArray[11];

    return contact;
  }

  static prepareRecords(records) {
    if(!_.isString(records))
      return [];

    //TODO: Further pre-processing and validation of the records string, possibly standardizing newlines, etc.

    let recordsArray = _.split(records, '\n');

    if(recordsArray.length <= 1)
      return [];

    return _.drop(recordsArray);
  }

  static parseRecords(records) {
    if(!_.isString(records))
      return [];

    let preparedRecords = this.prepareRecords(records);

    if(!_.isArray(preparedRecords) || preparedRecords.length === 0)
      return [];

    //NOTE:  I am intentionally duplicating this variable because it makes it easier to debug
    // noinspection UnnecessaryLocalVariableJS
    let parsedRecords = _.map(preparedRecords, x => this.parseRecord(x));

    return parsedRecords;
  }
}
