<?php

namespace App\Http\Controllers\Dashboard\Company\Images\Serve;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Companies;
use Illuminate\Support\Facades\Storage;

class ServeCompanyImageController extends Controller
{
    public function ServeCompanyImage(Request $request, $companyId)
    {
        $company = Companies::find($companyId);

        if (!$company || !$company->profile_photo) {
            return response()->json(['message' => 'Imagen no encontrada.'], 404);
        }

        $url = Storage::url($company->profile_photo);

        return response()->json(['profile_photo_url' => $url], 200);
    }
}
