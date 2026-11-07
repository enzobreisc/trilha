<?php

use App\Services\AppSettings;
use App\Services\DatabaseBackup;
use Illuminate\Http\UploadedFile;
use Inertia\Testing\AssertableInertia as Assert;

it('downloads the exported database and records the backup date', function () {
    $this->mock(DatabaseBackup::class, fn ($backup) => $backup
        ->shouldReceive('export')->once()->andReturnUsing(fn (string $destination) => file_put_contents($destination, 'exported')));

    $this->get(route('backup.show'))
        ->assertDownload('trilha-'.today()->toDateString().'.sqlite');

    expect(app(AppSettings::class)->lastBackupDate())->toBe(today()->toDateString());
});

it('shows the database details and review intervals on the settings page', function () {
    $this->get(route('settings'))->assertInertia(fn (Assert $page) => $page
        ->where('selectedLocale', 'pt_BR')
        ->where('lastBackupDate', null)
        ->where('firstReviewDays', 7)
        ->where('secondReviewDays', 30)
        ->where('roadmapFormat', 'trilha/v1'));
});

it('refuses to restore a file that is not a trilha database', function (string $contents) {
    $this->post(route('backup.store'), ['backup' => UploadedFile::fake()->createWithContent('x.sqlite', $contents)])
        ->assertSessionHasErrors('backup');
})->with([
    'plain text' => 'not a database',
    'sqlite without trilha tables' => fn () => sqliteFileContents('create table other (id integer)'),
]);

function sqliteFileContents(string $statement): string
{
    $path = tempnam(sys_get_temp_dir(), 'sqlite-');
    (new PDO('sqlite:'.$path))->exec($statement);

    return (string) file_get_contents($path);
}

it('exports a live database file and restores it over another one', function () {
    $schema = 'create table roadmaps (id integer); create table topics (id integer); create table settings (key text); insert into roadmaps values (1)';
    $live = tempnam(sys_get_temp_dir(), 'live-');
    (new PDO('sqlite:'.$live))->exec($schema);
    $backupFile = tempnam(sys_get_temp_dir(), 'backup-');
    unlink($backupFile);

    (new DatabaseBackup($live))->export($backupFile);
    (new PDO('sqlite:'.$live))->exec('delete from roadmaps');
    $service = new DatabaseBackup($live);
    $service->assertIsBackup($backupFile);
    $service->replaceDatabaseWith($backupFile);

    expect((new PDO('sqlite:'.$live))->query('select count(*) from roadmaps')->fetchColumn())->toBe(1);
});

it('drops the write-ahead log files of the replaced database', function () {
    $live = tempnam(sys_get_temp_dir(), 'live-');
    $backup = tempnam(sys_get_temp_dir(), 'backup-');
    file_put_contents($live.'-wal', 'stale');
    file_put_contents($live.'-shm', 'stale');

    (new DatabaseBackup($live))->replaceDatabaseWith($backup);

    expect(file_exists($live.'-wal'))->toBeFalse()
        ->and(file_exists($live.'-shm'))->toBeFalse();
});

it('backs up the database of the default connection', function () {
    $originalDefault = config('database.default');
    config([
        'database.default' => 'nativephp',
        'database.connections.nativephp' => ['driver' => 'sqlite', 'database' => '/data/trilha.sqlite'],
    ]);

    try {
        expect(app(DatabaseBackup::class)->path())->toBe('/data/trilha.sqlite');
    } finally {
        config(['database.default' => $originalDefault]);
    }
});
