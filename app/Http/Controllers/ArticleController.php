<?php

namespace App\Http\Controllers;



use App\Models\Article;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Http\Resources\ArticleResource;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ArticleResource::collection(Article::with('writer')->latest()->paginate(10));

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $article = Auth::user()->articles()->create($request->validated());
        return new ArticleResource($article);


    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return new ArticleResource($article->load('writer'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        $this->authorize('update',$article);
        $article->update($request->validated());
        return new ArticleResource($article);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $this->autorize('delete',$article);
        $article->delete();
        return response()->json(['message'=>'Delete']);
    }
}
