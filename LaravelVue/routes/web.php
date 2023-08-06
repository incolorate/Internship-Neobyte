<?php

use App\Http\Controllers\AdController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});
Route::get('/dashboard', function () {
    $user = Auth::user();
    $ads = $user->ads()->get();
    
    return Inertia::render('Dashboard', ["ads" => $ads]);
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post("/dashboard/ads", [AdController::class, "store"])->name("ad.store");
    Route::get("/dashboard/ads/create", [AdController::class, 'create'])->name("ad.create");
    Route::put('/dashboard/ads/{ad}', [AdController::class, 'update'])->name('ad.update');
    Route::get('/dashboard/ads/{ad}/edit', [AdController::class, 'edit'])->name('ad.edit');
    Route::delete('/dashboard/ads/{ad}', [AdController::class, "destroy"])->name("ad.destroy");
});

require __DIR__.'/auth.php';
