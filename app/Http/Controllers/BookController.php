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
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'author' => 'required|string',
        ]);
        $book = Book::create($data);
        return response()->json($book, 201);
    }
    public function show(Book $book)
    {
        return response()->json($book);
    }
    public function update(Request $request, Book $book)
    {
        $data = $request->validate([
            'title' => 'string',
            'author' => 'string',
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

