<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

@extends("layouts.app")

@section("content")
    <div>
        <h1>Products</h1>
       
          <button type="submit" class="btn btn-primary rounded-pill"><a href="{{route("product.create")}}" class="text-white">+Add product</a></button>    
       
    </div>
    <table class="table mt-2">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
        @foreach ($products as $product)
            <tr>
                <th scope="row">{{ $loop->iteration }}</th>
                <td>{{ $product->name }}</td>
                <td>{{ $product->price }}</td>
                <td>{{ $product->stock }}</td>
                <td class="d-flex">
                  <form method="POST" action="{{route("product.destroy", ["id" => $product->id])}}">
                    @csrf
                    @method("DELETE")
                    <button  type="submit" class="delete  btn btn-link" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></button>
                  </form>
                  <form method="PSOT" action="{{ route("product.edit", ["id" => $product->id]) }}">
                    <button  class="edit btn btn-link" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></button>
                  </form>
              </td>
            </tr>
        @endforeach
        </tbody>
      </table>
@endsection