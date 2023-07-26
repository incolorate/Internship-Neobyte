<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Requests\ProductRequest;

class ProductController extends Controller
{
    // return all products
    public function index()
    {
        $products = Product::all();
            
        return view('index', compact('products'));
    }

    // create new product
    public function store(ProductStoreRequest $request)
    {
        $product = Product::create($request->all());
        return redirect()->route("product.index")->with("success", "Product created successfully");
    }

    // Display product detail page. 
    public function show(Product $product)
    {
        return $product;
    }

    public function edit($id)
    {
        $product = Product::find($id);
        if($product){
            return view('edit', compact('product'));
        }
        return response()->json(["message"=>"Product not found"],404);
    }
    // intreaba pe sandor de naming convention update vs edit
    public function update(ProductUpdateRequest $request, Product $product)
    {
        $product->update($request->all());

        return redirect()->route("product.index");
    }

    public function destroy($id)
    {
        $product = Product::find($id);
          
        if(!$product){
            return response()->json(["message"=>"Product not found"], 404);
        }

        $product->delete();
        
        return redirect()->route("product.index")->with("success", "Product deleted successfully");
    }
}
