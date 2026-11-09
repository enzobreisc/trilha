<?php

namespace App\Providers;

use Native\Desktop\Contracts\ProvidesPhpIni;
use Native\Desktop\Facades\Window;

class NativeAppServiceProvider implements ProvidesPhpIni
{
    public function boot(): void
    {
        Window::open()
            ->route('home')
            ->title('trilha')
            ->width(1280)
            ->height(820)
            ->minWidth(960)
            ->minHeight(640)
            ->titleBarHiddenInset()
            ->rememberState();
    }

    /**
     * @return array<string, string>
     */
    public function phpIni(): array
    {
        return [];
    }
}
