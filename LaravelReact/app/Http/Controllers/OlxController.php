<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdsCreateRequest;
use Illuminate\Http\Request;
use App\Models\Ad;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\FetchAdsRequest;
use App\Models\OlxData;

class OlxController extends Controller
{

    public function fetch(Request $request)
    {
        $query = $request->input('query');
    
        $ads = OlxData::query()
            ->when($query, function ($query) use ($request) {
                $searchTerm = '%' . $request->input('query') . '%';
                $query->where('title', 'like', $searchTerm)
                    ->orWhere('description', 'like', $searchTerm);
            })
            ->paginate(10);
    
        return response()->json($ads);
    }
    
}

