<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

use App\Models\ContactFormCategories;
use App\Models\ContactForms;

class ContactFormsController extends Controller
{
    public function getCategories()
    {
        return response()->json(ContactFormCategories::select('id', 'name')->get());
    }

    public function sendMessage(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'cellphone' => 'nullable|string|max:20',
                'company' => 'nullable|string|max:255',
                'message_category_id' => 'required|exists:contact_form_categories,id',
                'message' => 'required|string',
            ]);

            $contactForm = ContactForms::create($validatedData);

            return response()->json([
                'message' => 'Gracias por contactar a TurnoMaster, en unos momentos le llegará un correo electrónico.',
                'data' => $contactForm,
            ], 201);
        } catch (ValidationException $e) {
            $errors = collect($e->errors())->mapWithKeys(function ($messages, $field) {
                $translations = [
                    'name' => 'El campo nombre es obligatorio.',
                    'last_name' => 'El campo apellido es obligatorio.',
                    'email' => 'El campo correo electrónico es obligatorio.',
                    'message_category_id' => 'El campo categoría del mensaje es obligatorio.',
                    'message' => 'El campo mensaje es obligatorio.',
                ];

                return [$field => $translations[$field] ?? implode(', ', $messages)];
            });

            return response()->json([
                'message' => 'Errores de validación',
                'errors' => $errors,
            ], 422);
        }
    }
}
