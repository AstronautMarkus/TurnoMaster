<?php

namespace App\Http\Controllers\Dashboard\Themes;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Themes\Theme;

class GetThemesController extends Controller
{
    public function getThemesList(Request $request)
    {
        $themes = Theme::select('name', 'slug', 'description')->get();
        return response()->json($themes);
    }
}
