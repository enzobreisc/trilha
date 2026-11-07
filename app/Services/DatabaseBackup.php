<?php

namespace App\Services;

use PDO;
use RuntimeException;

class DatabaseBackup
{
    private const SQLITE_HEADER = "SQLite format 3\0";

    private const REQUIRED_TABLES = ['roadmaps', 'topics', 'settings'];

    private const BYTES_PER_MEGABYTE = 1048576;

    private const BUSY_TIMEOUT_IN_SECONDS = 5;

    public function __construct(private readonly string $databasePath) {}

    public function path(): string
    {
        return $this->databasePath;
    }

    public function sizeInMegabytes(): float
    {
        return is_file($this->databasePath) ? round(filesize($this->databasePath) / self::BYTES_PER_MEGABYTE, 1) : 0.0;
    }

    public function export(string $destination): void
    {
        $connection = new PDO('sqlite:'.$this->databasePath);
        $connection->setAttribute(PDO::ATTR_TIMEOUT, self::BUSY_TIMEOUT_IN_SECONDS);
        $connection->exec('VACUUM INTO '.$connection->quote($destination));
    }

    public function assertIsBackup(string $path): void
    {
        $handle = fopen($path, 'rb');
        $header = $handle === false ? '' : (string) fread($handle, strlen(self::SQLITE_HEADER));

        if ($handle !== false) {
            fclose($handle);
        }

        if ($header !== self::SQLITE_HEADER) {
            throw new RuntimeException('The file is not a SQLite database.');
        }

        $statement = (new PDO('sqlite:'.$path))->query("select name from sqlite_master where type = 'table'");
        $tables = $statement === false ? [] : $statement->fetchAll(PDO::FETCH_COLUMN);

        if (array_diff(self::REQUIRED_TABLES, $tables) !== []) {
            throw new RuntimeException('The file is not a trilha backup.');
        }
    }

    public function replaceDatabaseWith(string $backupPath): void
    {
        foreach (['-wal', '-shm'] as $sidecarSuffix) {
            @unlink($this->databasePath.$sidecarSuffix);
        }

        if (! copy($backupPath, $this->databasePath)) {
            throw new RuntimeException('Could not replace the database file.');
        }
    }
}
