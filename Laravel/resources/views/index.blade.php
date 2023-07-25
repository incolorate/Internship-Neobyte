<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

@extends("layouts.app")

@section("content")
    <div>
        <h1>Products</h1>
        <button type="button" class="btn btn-primary rounded-pill " >+Add product</button>    
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
                <td>
                  <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                  <a href="#" class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
              </td>
            </tr>
        @endforeach
        </tbody>
      </table>
@endsection