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
                'cellphone' => 'nullable|regex:/^[\d\+\-\s\(\)]+$/|max:20',
                'company' => 'nullable|string|max:255',
                'message_category_id' => 'required|exists:contact_form_categories,id',
                'message' => 'required|string|min:20',
                'terms_accepted' => 'accepted',
                'honeypot' => 'max:0',
            ]);

            unset($validatedData['terms_accepted']);

            $contactForm = ContactForms::create($validatedData);

            return response()->json([
                'message' => 'Gracias por contactar a TurnoMaster. En breve nos comunicaremos con usted.',
                'data' => $contactForm,
            ], 201);
        } catch (ValidationException $e) {
            $errors = collect($e->errors())->mapWithKeys(function ($messages, $field) {
                $translations = [
                    'name' => 'El campo nombre es obligatorio.',
                    'last_name' => 'El campo apellido es obligatorio.',
                    'email' => 'El campo correo electrónico es obligatorio.',
                    'cellphone' => 'El campo teléfono tiene un formato inválido.',
                    'message_category_id' => 'Debe seleccionar una categoría válida.',
                    'message' => 'El mensaje debe tener al menos 20 caracteres.',
                    'terms_accepted' => 'Debe aceptar los términos y condiciones.',
                    'honeypot' => 'Campo inválido detectado.',
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
