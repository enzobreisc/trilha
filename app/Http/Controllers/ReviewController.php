<?php

namespace App\Http\Controllers;

use App\Queries\ReviewAgenda;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    public function index(ReviewAgenda $agenda): Response
    {
        return Inertia::render('reviews', [
            'items' => $agenda->dueItems(),
            'days' => $agenda->calendar(),
            'upcoming' => $agenda->upcoming(),
        ]);
    }
}
