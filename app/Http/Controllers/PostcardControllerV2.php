<?php

namespace App\Http\Controllers;

use App\Models\Postcard;
use App\Http\Requests\StorePostcardRequestV2;
use App\Http\Requests\UpdatePostcardRequestV2;
use App\Http\Resources\PostcardResourceV2;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;

class PostcardControllerV2 extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PostcardResourceV2::collection(
            Postcard::with('scribeAccount')->latest()->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostcardRequestV2 $request)
    {
        $postcard = Auth::user()->postcards()->create($request->validated());
        return (new PostcardResourceV2($postcard->load('scribeAccount')))->response()->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Postcard $postcard)
    {
        return new PostcardResourceV2($postcard->load('scribeAccount'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostcardRequestV2 $request, Postcard $postcard)
    {
        $this->authorize('update', $postcard);
        $postcard->update($request->validated());
        return new PostcardResourceV2($postcard);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Postcard $postcard)
    {
        $this->authorize('delete', $postcard);
        $postcard->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
