import _ from 'lodash';

export default class Contact{
  constructor(){
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.company = '';
    this.email = '';
    this.address1 = '';
    this.address2 = '';
    this.zip = '';
    this.city = '';
    this.stateLong = '';
    this.state = '';
    this.phone = '';
  }

  getPrintableString() {
    let escapedCompany = _.includes(this.company, ',') ? '"' + this.company + '"' : this.company;

    //NOTE:  Leaving an additional variable as it is easier to debug
    // noinspection UnnecessaryLocalVariableJS
    let printString = `${this.id},${this.firstName},${this.lastName},${escapedCompany},${this.email},${this.address1},${this.address2},${this.zip},${this.city},${this.stateLong},${this.state},${this.phone}`;

    return printString;
  }
}
