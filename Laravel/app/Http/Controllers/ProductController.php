<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;

class ProductController extends Controller
{
    // return all products
    public function index()
    {
        $products = Products::all();
        return response()->json($products);
    }

    // create new product
    public function store(Request $request)
    {
        $product = new Products();
        $product->name = $request->name;
        $product->price = $request->price;
        $product->stock = $request->stock;
        $product->save();
        return response()->json($product);
    }
    // find product by id
    public function show($id)
    {
        $product = Products::find($id);
        if($product){
            return response()->json($product);
        }
        return response()->json(["message"=>"Product not found"],404);
    }


    // intreaba pe sandor de naming convention update vs edit
    public function update(Request $request, $id)
    {
        if (Products::where("id", $id)->exists()) {
            $product = Products::find($id);
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
        if(Products::where("id", $id)->exists()) {
            $product = Products::find($id);
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
