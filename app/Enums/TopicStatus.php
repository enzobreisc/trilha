<?php

namespace App\Enums;

enum TopicStatus: string
{
    case Todo = 'todo';
    case Studying = 'studying';
    case Done = 'done';
    case Review = 'review';
}
