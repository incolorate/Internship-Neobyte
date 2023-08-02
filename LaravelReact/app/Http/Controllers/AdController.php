<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdsCreateRequest;
use Illuminate\Http\Request;
use App\Models\Ad;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\FetchAdsRequest;

class AdController extends Controller
{
    public function fetchAds(FetchAdsRequest $request)
    {
        $query = $request->input('query');
    
        $ads = Ad::with("user")
            ->when($query, function ($query) use ($request) {
                $searchTerm = '%' . $request->input('query') . '%';
                $query->where('title', 'like', $searchTerm)
                      ->orWhere('description', 'like', $searchTerm);
            })
            ->when($query === null || trim($query) === '', function ($query) {
                // If the query is empty or not provided, return all the ads
            })
            ->paginate(9);

            return response()->json($ads);
        }

    public function index()
    {
        $user = Auth::user();
        $ads = $user->ads()->get();
    
        return Inertia::render('Ads',[
            "ads" => $ads
        ]);
    }
    public function create()
    {
        return Inertia::render('Ads/Create');
    }


    public function store(AdsCreateRequest $request)
    {
        $user = Auth::user();
        $ad = new Ad([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ]);

        // why does this not work
        // $user->ads()-> Ad::create($request->all());
        $user->ads()->save($ad);
        
        return redirect()->route('ads.index');
    }

    public function edit($id)
    {
        $user = Auth::user();
        $ad = $user->ads()->find($id);

        if (!$ad) {
            return redirect()->route('ads.index')->with('error', 'Ad not found');
        }
         
        return Inertia::render('Ads/Edit', [
            "ad" => $ad
        ]);
    }

    public function update(AdsCreateRequest $request, Ad $id)
    {
        $id->update($request->all());

        return redirect()->route('ads.index')->with('success', 'Ad updated successfully');
    }

    public function destroy(Ad $id)
    {
 
        $id->delete();

        // Redirect back to the ads index page with a success message
        return redirect()->route('ads.index')->with('success', 'Ad deleted successfully');
    }
}
