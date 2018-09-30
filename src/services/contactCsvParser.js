import _ from 'lodash';
import uuid from 'uuid/v4';
import Contact from "../model/contact";

export default class ContactCsvParser {

  static parseRecord(recordArray) {

    //TODO: Add validation that the record is really a record of the correct size, etc.

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

    let recordsArray = this.csvToArray(records);

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

  //NOTE:  Attribution for this function goes to @niry on Stack Overflow (https://stackoverflow.com/questions/8493195/how-can-i-parse-a-csv-string-with-javascript-which-contains-comma-in-data)
  static csvToArray(text) {
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
    for (l of text) {
      if ('"' === l) {
        if (s && l === p) row[i] += l;
        s = !s;
      } else if (',' === l && s) l = row[++i] = '';
      else if ('\n' === l && s) {
        if ('\r' === p) row[i] = row[i].slice(0, -1);
        row = ret[++r] = [l = '']; i = 0;
      } else row[i] += l;
      p = l;
    }
    return ret;
  };
}
