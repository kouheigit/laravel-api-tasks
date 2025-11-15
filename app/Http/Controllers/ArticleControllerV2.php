<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Http\Requests\StoreArticleRequestV2;
use App\Http\Requests\UpdateArticleRequestV2;
use App\Http\Resources\ArticleResourceV2;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;

class ArticleControllerV2 extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ArticleResourceV2::collection(
            Article::with('writer')->latest()->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticleRequestV2 $request)
    {
        $article = Auth::user()->articles()->create($request->validated());
        return (new ArticleResourceV2($article->load('writer')))->response()->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return new ArticleResourceV2($article->load('writer'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticleRequestV2 $request, Article $article)
    {
        $this->authorize('update', $article);
        $article->update($request->validated());
        return new ArticleResourceV2($article);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $this->authorize('delete', $article);
        $article->delete();
        return response()->json(['message' => 'Deleted']);
    }
}

