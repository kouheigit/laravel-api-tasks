<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;


class BookController extends Controller
{

    public function index()
    {
        return Book::paginate(10);
    }
    public function store(Request $req)
    {
        $data = $req->validate([
            'title'=>'request|string',
            'author'=>'request|string',
        ]);
        $book = Book::create($data);
        return response()->json($book,201);
    }
    public function show(Book $book)
    {
        return response()->json($book);
    }
    public function update(Request $req, Book $book)
    {
        $data = $req->validate([
            'title'=>'string',
            'author'=>'string',
        ]);
        $book->update($data);
        return response()->json($book);
    }
    public function destroy(Book $book)
    {
        $book->delete();
        return response()->json(null, 204);
    }
}

