export class Nft{
    id?: number;
    name?: string;
    description?: string;
    creationDate?: Date;
    imageUrl?: string;
    price?: number;

    constructor(id?: number, name?: string, description?: string, creationDate?: Date, imageUrl?: string, price?: number){
        this.id = id;
        this.name = name;
        this.description = description;
        this.creationDate = creationDate;
        this.imageUrl = imageUrl;
        this.price = price;
    }
}
