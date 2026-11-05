<?php

namespace App\Enums;

enum Locale: string
{
    case PtBr = 'pt_BR';
    case En = 'en';

    public const COOKIE = 'locale';

    public function languageTag(): string
    {
        return match ($this) {
            self::PtBr => 'pt-BR',
            self::En => 'en-US',
        };
    }
}
