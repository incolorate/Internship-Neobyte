<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Neobyte Laravel</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <style>
        /* Custom styles for the sidebar */
        .sidebar {
            background-color: #343a40; /* Dark gray background color */
            height: 100vh; /* Full height of the viewport */
            padding-top: 15px;
            color: #fff; /* Text color */
        }

        /* Adjust the content area to the right of the sidebar */
        .content {
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <nav class="col-md-3 sidebar">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link active" href="{{route("home")}}">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Products</a>
                    </li>
                </ul>
            </nav>

            <main class="col-md-9 content">
                @yield("content")
            </main>
        </div>
    </div>

    <!-- Optional: Add your JavaScript at the end of the body tag -->
</body>
</html>
