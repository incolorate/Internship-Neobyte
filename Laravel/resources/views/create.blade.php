@extends('layouts.app')

@section("title", "Add product")

@section("content")
  <form method="POST" action="{{ route('product.store') }}" class="container-sm">
    @method('POST')
    @csrf
    <div class="form-group ">
      <label for="name">Name</label>
      <input type="text" class="form-control" id="name" name="name" placeholder="Enter product name">
      @error('name')
        <p class="text-danger">{{ $message }}</p>
      @enderror
    </div>
    <div class="form-group">
      <label for="price">Price</label>
      <input type="number" class="form-control" id="price" name="price" placeholder="Enter product price">
      @error('price')
        <p class="text-danger">{{ $message }}</p>
      @enderror
    </div>
    <div class="form-group">
      <label for="stock">Stock</label>
      <input type="number" class="form-control" id="stock" name="stock" placeholder="Stock">
      @error('stock')
        <p class="text-danger">{{ $message }}</p>
      @enderror
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
@endsection
