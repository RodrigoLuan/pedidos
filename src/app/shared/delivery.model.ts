export class Delivery {
    _id: string;
    address: string;
    price: string;
    company: string;
    constructor( 
        _id: string,
        address: string,
        price: string,
        company: string,
        ){
        this._id = _id;
        this.address= address;
        this.price = price;
        this.company = company;
    }
};
