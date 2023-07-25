@extends('layouts.app')


@section("title", "Add product")


@section("content")
    <form method="POST" action="{{route("products.store")}}">
        @csrf
        <label for="productName">Product name</label>
        <input id="productName" name="name" type="text" placeholder="Product name">
        <label for="productPrice">Product price</label>
        <input id="productPrice" name="price" type="number" placeholder="Product price">
        <label for="productStock">Product stock</label>
        <input id="productStock" name="stock" type="number" placeholder="Product stock">
        <button type="submit">Add product</button>
    </form>
@endsection