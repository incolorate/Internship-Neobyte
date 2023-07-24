<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;

class ProductController extends Controller
{
    public function index()
    {
        $products = Products::all();
        return response()->json($products); // Return the products (JSON response, for example)
    }
    public function store(Request $request)
    {
        $product = new Products();
        $product->name = $request->name;
        $product->price = $request->price;
        $product->stock = $request->stock;
        $product->save();
        return response()->json($product); // Return the product (JSON response, for example)
    }
    public function show($id)
    {
        $product = Products::find($id);
        if($product){
            return response()->json($product); // Return the product (JSON response, for example)
        }
        return response()->json(["message"=>"Product not found"],404);
    }

}
