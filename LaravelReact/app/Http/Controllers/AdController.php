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

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $user = Auth::user();
        $ad = $user->ads()->find($id);

        if (!$ad) {
            return redirect()->route('ads.index')->with('error', 'Ad not found');
        }

        $ad->title = $request->input('title');
        $ad->description = $request->input('description');
        $ad->save();

        return redirect()->route('ads.index')->with('success', 'Ad updated successfully');
    }

    public function destroy($id)
    {
        // Find the authenticated user
        $user = Auth::user();

        // Find the ad by its ID within the user's ads
        $ad = $user->ads()->find($id);

        // Check if the ad exists
        if (!$ad) {
            return redirect()->route('ads.index')->with('error', 'Ad not found');
        }

        // Delete the ad from the database
        $ad->delete();

        // Redirect back to the ads index page with a success message
        return redirect()->route('ads.index')->with('success', 'Ad deleted successfully');
    }
}
