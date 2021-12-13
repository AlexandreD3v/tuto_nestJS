import { Controller, Post, Body, Get } from "@nestjs/common";

import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService){

    }
    
    @Post()
    addProduct(
        @Body('title') prodTitle:string,
        @Body('desc') prodDesc:string,
        @Body('price') prodPrice:number,
    ) {
        if(prodTitle){
            const generatedId = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
            return {id: generatedId};
        }
        else{
            return {msg: 'Não há título'};
        }
    }

    @Get()
    getAllProducts(){
        return this.productsService.getProducts();
    }
} 
