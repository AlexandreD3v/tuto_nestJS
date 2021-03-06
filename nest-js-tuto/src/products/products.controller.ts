import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";

import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService){

    }
    
    @Post()
    addProduct(
        @Body('title') prodTitle:string,
        @Body('desc') prodDesc:string,
        @Body('price') prodPrice:number
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

    @Get(':id')
    getProductById(
        @Param('id') prodId: number
    ){
        return this.productsService.getProductsById(prodId);
    }

    @Patch(':id')
    updateProducts(
        @Param('id') prodId: number, 
        @Body('title') prodTitle:string,
        @Body('desc') prodDesc:string,
        @Body('price') prodPrice:number 
    ){
        this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id') prodId: number){
        this.productsService.deleteProduct(prodId);
        return null;
    }
} 
