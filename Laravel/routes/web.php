<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
})->name('home');

Route::get('/products', function () {
    $productController = new ProductController();
    $products = $productController->index();
    return view('index', ['products' => $products]);
})->name('product.index');


Route::get("/products/create",  function () {
    return view('create');
});

Route::post("/products", [ProductController::class, 'store'])->name('product.store');;