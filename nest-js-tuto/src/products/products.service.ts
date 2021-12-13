import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    private products: Product[] = [];
    private seqId: number = 1;

    insertProduct(
        title: string,
        desc: string, 
        price: number
    ){
        const prodId = this.seqId;
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        this.seqId++
        return prodId;
    }

    getProducts(){
        return [...this.products];
    }

    getProductsById(
        prodId: number
    ){
        const product = this.findProduct(prodId)[0];

        return {...product};
    };

    updateProduct(
        prodId: number, 
        title: string, 
        desc: string, 
        price: number
    ){
        const [product, index]= this.findProduct(prodId);
        const updtProduct =  {...product}
        let changed = false;

        if(title){
            updtProduct.title = title;
            changed = true;
        } 
        if(desc) {
            updtProduct.desc = desc;
            changed = true;
        }
        if(price){
            updtProduct.price = price;
            changed = true;
        } 

        if(changed){
            this.products[index] = updtProduct;
        }
    }

    deleteProduct(prodId: number){
        const index =  this.findProduct(prodId)[1];

        this.products.splice(index, 1);
    }

    private findProduct(id: number): [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.id === id);
        const product = this.products[productIndex];

        if(!product) throw new NotFoundException('Não foi possível encontrar o ID');

        return [product, productIndex];
    }
 }