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

Route::get("/products", [ProductController::class, 'index'])->name('product.index');
Route::get("/products/create",  function () {
    return view('create');
});
Route::get("/products/{id}/edit", [ProductController::class, "edit"])->name('product.edit');
Route::get("/products/{id}", [ProductController::class, "show"]);
Route::put("/products/{id}", [ProductController::class, "update"])->name('product.update');
Route::delete("/products/{id}", [ProductController::class, "destroy"]);

Route::post("/products", [ProductController::class, 'store'])->name('product.store');;