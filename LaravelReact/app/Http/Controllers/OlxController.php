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
        
        if ($cachedAds !== null) {
            $ads = json_decode($cachedAds, true);
            return response()->json($ads);
        } else {
            $ads = OlxData::all();
            Redis::set($cacheKey, json_encode($ads));
            return response()->json($ads);
        }
    
      
    }
    
}

