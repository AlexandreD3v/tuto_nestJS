import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    private products: Product[] = [];
    private seqId: number = 1;

    insertProduct(title: string, desc: string, price: number){
        const prodId = this.seqId;
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        this.seqId++
        return prodId;
    }

    getProducts(){
        return [...this.products];
    }

    getProductsById(productId: number){
        const product = this.products.find(prod => prod.id === productId)

        if(!product) throw new NotFoundException('Não foi possível encontrar o ID');

        return {...product};
    };
 }