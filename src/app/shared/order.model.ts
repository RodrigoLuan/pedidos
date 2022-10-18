export class Order {
    _id: string;
    nameProduct: string;
    description: string;
    category: string;
    amount: string;
    price: string;
    company: string;
    statusConf: boolean;
    statusProd: boolean;
    statusDone: boolean;
    troco: string;
    constructor( 
        _id: string,
        nameProduct: string,
        description: string,
        category: string,
        amount: string,
        price: string,
        troco: string,
        company: string,
        statusConf: boolean,
        statusProd: boolean,
        statusDone: boolean,
        ){
        this._id = _id;
        this.nameProduct= nameProduct;
        this.description = description;
        this.category = category;
        this.amount = amount  ;
        this.price = price  ;
        this.company = company  ;
        this.troco = troco  ;
        this.statusConf = statusConf;
        this.statusProd = statusProd;
        this.statusDone = statusDone;
    }
};

