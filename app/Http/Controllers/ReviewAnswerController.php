<?php

namespace App\Http\Controllers;

use App\Actions\AnswerReview;
use App\Enums\ReviewOutcome;
use App\Http\Requests\AnswerReviewRequest;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;

class ReviewAnswerController extends Controller
{
    public function store(AnswerReviewRequest $request, Review $review, AnswerReview $answerReview): RedirectResponse
    {
        $answerReview->handle($review, ReviewOutcome::from($request->string('outcome')->toString()));

        return back();
    }

    public function destroy(Review $review, AnswerReview $answerReview): RedirectResponse
    {
        $answerReview->undo($review);

        return back();
    }
}
