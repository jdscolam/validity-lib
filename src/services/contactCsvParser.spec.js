import ContactCsvParser from './contactCsvParser';
import _ from "lodash";

describe('ContactCsvParser', () => {
  it('parses an individual contact', () => {
    let record = '9,Merrily,Jerram,"Cummings, Batz and Romaguera",mjerram8@umich.edu,66735 Lakeland Center,Apt 13,64101,Kansas City,Missouri,MO,816-717-3307';
    let recordArray = _.split(record, ',');

    let contact = ContactCsvParser.parseRecord(record);

    expect(contact).not.toBeNull();
    expect(contact.id).toBe(recordArray[0]);
    expect(contact.firstName).toBe(recordArray[1]);
    expect(contact.lastName).toBe(recordArray[2]);
    expect(contact.company).toBe(_.replace(recordArray[3], '"', ''));
    expect(contact.email).toBe(recordArray[4]);
    expect(contact.address1).toBe(recordArray[5]);
    expect(contact.address2).toBe(recordArray[6]);
    expect(contact.zip).toBe(recordArray[7]);
    expect(contact.city).toBe(recordArray[8]);
    expect(contact.stateLong).toBe(recordArray[9]);
    expect(contact.state).toBe(recordArray[10]);
    expect(contact.phone).toBe(recordArray[11]);
  });

  //TODO:  Add tests that reflect record validation/verification (i.e. is this a real record that we should worry about)

  it('prepares records for processing', () => {
    let records = 'id,first_name,last_name,company,email,address1,address2,zip,city,state_long,state,phone\n' +
      '1,Donalt,Canter,Gottlieb Group,dcanter0@nydailynews.com,9 Homewood Alley,,50335,Des Moines,Iowa,IA,515-601-4495\n' +
      '2,Daphene,McArthur,"West, Schimmel and Rath",dmcarthur1@twitter.com,43 Grover Parkway,,30311,Atlanta,Georgia,GA,770-271-7837\n' +
      '3,Akim,McAlpine,"Quitzon, Schaefer and Gleason",amcalpine2@goo.gl,4 Kipling Drive,,93721,Fresno,California,CA,209-867-8571\n' +
      '4,Kale,Gipp,Klein Group,kgipp3@360.cn,4985 Menomonie Drive,,94975,Petaluma,California,CA,707-840-2551\n' +
      '4,Kale,Gipp,The Klein Group,kgipp3@360.cn,4985 Menomonie Drive,,94975,Petaluma,California,CA,707-840-2551';

    let preparedRecords = ContactCsvParser.prepareRecords(records);

    expect(_.isArray(preparedRecords)).toBeTruthy();
    expect(preparedRecords.length).toBe(5);
  });

  //TODO: Add tests around further pre-processing and validation of the records string, possibly standardizing newlines, etc.

  it('parses multiple records', () => {
    let records = 'id,first_name,last_name,company,email,address1,address2,zip,city,state_long,state,phone\n' +
      '7,Evelin,Amburgy,Hettinger Group,eamburgy6@adobe.com,683 Forest Dale Trail,,55114,Saint Paul,Minnesota,MN,612-487-2958\n' +
      '8,Filide,Ricci,Kautzer-Feest,fricci7@xrea.com,4 Manitowish Parkway,,28055,Gastonia,North Carolina,NC,704-110-9832\n' +
      '9,Merrily,Jerram,"Cummings, Batz and Romaguera",mjerram8@umich.edu,66735 Lakeland Center,Apt 13,64101,Kansas City,Missouri,MO,816-717-3307\n' +
      '10,Betty,Berends,Schmitt-Haley,bberends9@hugedomains.com,6 Mayfield Court,Apt 3,91125,Pasadena,California,CA,626-102-3818';

    let contacts = ContactCsvParser.parseRecords(records);

    expect(_.isArray(contacts)).toBeTruthy();
    expect(contacts.length).toBe(4);
  });
});
