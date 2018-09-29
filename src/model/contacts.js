import _ from 'lodash';

export default class Contacts{
  constructor(){
    this.potentialDuplicateContacts = [];
    this.uniqueContacts = [];
  }

  getPrintableString() {
    let potentialDuplicates = _.join(_.map(this.potentialDuplicateContacts, x => '\t\u2022\t' +  x.getPrintableString() + '\n'), '');
    let uniqueContacts = _.join(_.map(this.uniqueContacts, x => '\t\u2022\t' + x.getPrintableString() + '\n'), '');

    //NOTE:  Leaving an additional variable as it is easier to debug
    // noinspection UnnecessaryLocalVariableJS
    let printString = '\nPotential Duplicates\n\n' +
      potentialDuplicates + '\n' +
      'Non Duplicates\n\n' +
      uniqueContacts + '\n';

    return printString;
  }
}
