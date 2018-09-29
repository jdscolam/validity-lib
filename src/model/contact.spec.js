import Contact from './contact';

describe('Contact', () => {
  it('provides a printable string', () => {
    let result = '9,Merrily,Jerram,Cummings,mjerram8@umich.edu,66735 Lakeland Center,Apt 13,64101,Kansas City,Missouri,MO,816-717-3307';
    let contact = new Contact();
    contact.id = '9';
    contact.firstName = 'Merrily';
    contact.lastName = 'Jerram';
    contact.company = 'Cummings';
    contact.email = 'mjerram8@umich.edu';
    contact.address1 = '66735 Lakeland Center';
    contact.address2 = 'Apt 13';
    contact.zip = '64101';
    contact.city = 'Kansas City';
    contact.stateLong = 'Missouri';
    contact.state = 'MO';
    contact.phone = '816-717-3307';

    let printableString = contact.getPrintableString();

    expect(printableString).toBe(result);
  });

  it('adds escape quotes to the company when needed in a printable string', () => {
    let result = '9,Merrily,Jerram,"Cummings, Batz and Romaguera",mjerram8@umich.edu,66735 Lakeland Center,Apt 13,64101,Kansas City,Missouri,MO,816-717-3307';
    let contact = new Contact();
    contact.id = '9';
    contact.firstName = 'Merrily';
    contact.lastName = 'Jerram';
    contact.company = 'Cummings, Batz and Romaguera';
    contact.email = 'mjerram8@umich.edu';
    contact.address1 = '66735 Lakeland Center';
    contact.address2 = 'Apt 13';
    contact.zip = '64101';
    contact.city = 'Kansas City';
    contact.stateLong = 'Missouri';
    contact.state = 'MO';
    contact.phone = '816-717-3307';

    let printableString = contact.getPrintableString();

    expect(printableString).toBe(result);
  });
});
