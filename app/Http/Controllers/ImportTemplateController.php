<?php

namespace App\Http\Controllers;

use App\Services\Import\RoadmapTemplate;
use Symfony\Component\HttpFoundation\Response;

class ImportTemplateController extends Controller
{
    public function __invoke(RoadmapTemplate $template): Response
    {
        return response($template->contents(), 200, [
            'Content-Type' => 'application/json',
            'Content-Disposition' => 'attachment; filename="'.RoadmapTemplate::FILE_NAME.'"',
        ]);
    }
}
