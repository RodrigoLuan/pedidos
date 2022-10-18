export class Address {
    _id: string;
    address: string;
    price: string;
    constructor( 
        _id: string,
        address: string,
        price: string,
        ){
        this._id = _id;
        this.address= address;
        this.price = price;
    }
};