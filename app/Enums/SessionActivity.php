<?php

namespace App\Enums;

enum SessionActivity: string
{
    case Docs = 'docs';
    case Solo = 'solo';
    case Compare = 'compare';
    case Project = 'project';
}
