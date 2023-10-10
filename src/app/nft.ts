export class Nft{
    id?: number;
    name?: string;
    description?: string;
    creationDate?: Date;
    imageUrl?: string;

    constructor(id?: number, name?: string, description?: string, creationDate?: Date, imageUrl?: string,){
        this.id = id;
        this.name = name;
        this.description = description;
        this.creationDate = creationDate;
        this.imageUrl = imageUrl;
    }
}
