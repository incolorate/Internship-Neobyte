<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdsCreateRequest;
use Illuminate\Http\Request;
use App\Models\Ad;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\FetchAdsRequest;
use App\Models\OlxData;
use Illuminate\Support\Facades\Redis;

class OlxController extends Controller
{

    public function fetch(Request $request)
    {
       
        $cacheKey = 'olx_ads_all';
        $cachedAds   = Redis::get($cacheKey);
        
        if ($cachedAds === null) {
            $ads = OlxData::query()->get();
            $expirationTime = 3600;
            Redis::setex($cacheKey, $expirationTime, json_encode($ads));
            
        } 

            $query = $request->input('query');
            
            $ads = json_decode($cachedAds, true);
            $ads = collect($ads)
                    ->when($query, function ($query) use ($request) {
                    $searchTerm = '%' . $request->input('query') . '%';
                    $query->where('title', 'like', $searchTerm)
                        ->orWhere('description', 'like', $searchTerm);
                });


            return response()->json($ads);
    }
    
}

