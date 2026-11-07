<?php

namespace App\Enums;

enum ReviewOutcome: string
{
    case Ok = 'ok';
    case Again = 'again';
}
