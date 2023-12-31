<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    // return all products
    public function index()
    {
        $products = Product::all();
            
     return view('index', compact('products'));
    }

    // create new product
    public function store(Request $request)
    {
        $data = $request->validate([
            "name" => "required|unique:products|max:255|min:3|",
            "price" => "required|numeric|between:0,99999.99",
            "stock" => "required|numeric|between:0,99999"
        ]);

        $product = Product::create($data);

        return redirect()->route("product.index")->with("success", "Product created successfully");
    }
    // find product by id
    public function show($id)
    {
        $product = Product::find($id);
        if($product){
            return response()->json($product);
        }
        return response()->json(["message"=>"Product not found"],404);
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
    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if(!$product){
            return response()->json(["message"=>"Product not found"], 404);
        }

        $data = $request->validate([
            "name" => "required||max:255|min:3|",
            "price" => "required|numeric|between:0,99999.99",
            "stock" => "required|numeric|between:0,99999"
        ]);

        $product->update($data);
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
