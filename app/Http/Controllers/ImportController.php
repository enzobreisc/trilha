<?php

namespace App\Http\Controllers;

use App\Actions\ImportRoadmap;
use App\Http\Requests\PreviewImportRequest;
use App\Services\Import\ImportPreviewFactory;
use App\Services\Import\RoadmapFileValidator;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ImportController extends Controller
{
    private const PENDING_FILE = 'import.pending';

    public function create(ImportPreviewFactory $previews): Response
    {
        $pending = session(self::PENDING_FILE);

        return Inertia::render('import', [
            'preview' => $pending === null ? null : $previews->make($pending['fileName'], $pending['contents']),
        ]);
    }

    public function preview(PreviewImportRequest $request): RedirectResponse
    {
        $file = $request->file('file');

        session()->put(self::PENDING_FILE, [
            'fileName' => $file->getClientOriginalName(),
            'contents' => (string) file_get_contents($file->getRealPath()),
        ]);

        return to_route('import');
    }

    public function cancel(): RedirectResponse
    {
        session()->forget(self::PENDING_FILE);

        return to_route('import');
    }

    public function store(RoadmapFileValidator $validator, ImportRoadmap $importRoadmap): RedirectResponse
    {
        $pending = session(self::PENDING_FILE);
        abort_if($pending === null, 422);

        $report = $validator->validate($pending['contents']);
        abort_if(! $report->isValid(), 422);

        $summary = $importRoadmap->handle($report->document, $pending['fileName']);
        session()->forget(self::PENDING_FILE);

        return to_route('roadmap')->with('importSummary', $summary);
    }
}
