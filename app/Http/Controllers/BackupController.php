<?php

namespace App\Http\Controllers;

use App\Actions\RestoreBackup;
use App\Http\Requests\RestoreBackupRequest;
use App\Services\AppSettings;
use App\Services\DatabaseBackup;
use Illuminate\Http\RedirectResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class BackupController extends Controller
{
    public function show(DatabaseBackup $backup, AppSettings $settings): BinaryFileResponse
    {
        $destination = tempnam(sys_get_temp_dir(), 'trilha-backup-');
        unlink($destination);

        $backup->export($destination);
        $settings->recordBackup();

        return response()
            ->download($destination, 'trilha-'.today()->toDateString().'.sqlite')
            ->deleteFileAfterSend();
    }

    public function store(RestoreBackupRequest $request, RestoreBackup $restoreBackup): RedirectResponse
    {
        try {
            $restoreBackup->handle($request->file('backup')->getRealPath());
        } catch (\RuntimeException) {
            return back()->withErrors(['backup' => __('Esse arquivo não é um backup do trilha.')]);
        }

        return to_route('start');
    }
}
