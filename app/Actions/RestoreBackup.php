<?php

namespace App\Actions;

use App\Services\DatabaseBackup;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class RestoreBackup
{
    public function __construct(private readonly DatabaseBackup $backup) {}

    public function handle(string $backupPath): void
    {
        $this->backup->assertIsBackup($backupPath);

        DB::purge();
        $this->backup->replaceDatabaseWith($backupPath);
        DB::reconnect();

        Artisan::call('migrate', ['--force' => true]);
    }
}
