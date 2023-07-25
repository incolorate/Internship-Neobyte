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
            
     return $products;
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

        return response()->json($product);
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


    // intreaba pe sandor de naming convention update vs edit
    public function update(Request $request, $id)
    {
        if (Product::where("id", $id)->exists()) {
            $product = Product::find($id);
            $product->name = is_null($request->name) ? $product->name : $request->name;
            $product->price = is_null($request->price) ? $product->price : $request->price;
            $product->stock = is_null($request->stock) ? $product->stock : $request->stock;
            $product->save();
                return response()->json([
                    "message"=> "Product with the ID {$id} updated", 
                ]);
        } else {
            return response()->json([
                "message" => "Product not found."
            ]);
        }
    }

    public function destroy($id)
    {
        if(Product::where("id", $id)->exists()) {
            $product = Product::find($id);
            $product->delete();
            return response()->json([
                "message" => "Product with the ID {$id} was deleted"

            ]);
        } else {
            return response()->json([
                "message" => "The product with the ID {$id} does not exist"
            ]);
        }
    }
}