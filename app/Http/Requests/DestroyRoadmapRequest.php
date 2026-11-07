<?php

namespace App\Http\Requests;

use App\Models\Roadmap;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class DestroyRoadmapRequest extends FormRequest
{
    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $roadmap = $this->route('roadmap');

        return [
            'confirmation' => ['required', 'string', 'in:'.Str::slug($roadmap instanceof Roadmap ? $roadmap->title : '')],
        ];
    }
}
