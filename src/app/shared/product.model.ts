

export class Product {
    _id: string;
    nameProduct: string;
    description: string;
    category: string;
    amount: string;
    price: string;
    company: string;
    productId: string;
    constructor( 
        _id: string,
        nameProduct: string,
        description: string,
        category: string,
        amount: string,
        price: string,
        company: string,
        productId: string
        ){
        this._id = _id;
        this.nameProduct= nameProduct;
        this.description = description;
        this.category = category;
        this.amount = amount  ;
        this.price = price  ;
        this.company = company  ;
        this.productId = productId;
    }
};

