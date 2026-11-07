<?php

namespace App\Services;

class ProfileName
{
    private const FALLBACK = 'trilha';

    public function resolve(): string
    {
        $entry = function_exists('posix_getpwuid') ? posix_getpwuid(posix_geteuid()) : false;

        return self::fromPasswdEntry(is_array($entry) ? $entry : null);
    }

    /**
     * @param  array{name?: string, gecos?: string}|null  $entry
     */
    public static function fromPasswdEntry(?array $entry): string
    {
        $fullName = trim(explode(',', $entry['gecos'] ?? '')[0]);
        $source = $fullName !== '' ? $fullName : trim($entry['name'] ?? '');
        $firstWord = explode(' ', $source)[0];

        return $firstWord === '' ? self::FALLBACK : ucfirst($firstWord);
    }
}
