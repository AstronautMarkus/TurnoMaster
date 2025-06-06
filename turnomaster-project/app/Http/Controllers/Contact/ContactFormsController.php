<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Mail;

use App\Models\Forms\ContactFormCategories;
use App\Models\Forms\ContactForms;

class ContactFormsController extends Controller
{
    public function getCategories()
    {
        return response()->json(ContactFormCategories::select('id', 'name')->get());
    }

    public function sendMessage(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'cellphone' => 'required|regex:/^[\d\+\-\s\(\)]+$/|max:20',
            'company' => 'nullable|string|max:255',
            'message_category_id' => 'required|exists:contact_form_categories,id',
            'message' => 'required|string|min:20',
            'terms_accepted' => 'accepted',
            'honeypot' => 'max:0',
        ], [
            'name.required' => 'El campo nombre es obligatorio.',
            'last_name.required' => 'El campo apellido es obligatorio.',
            'email.required' => 'El campo correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser una dirección válida.',
            'cellphone.required' => 'El campo teléfono es obligatorio.',
            'cellphone.regex' => 'El campo teléfono tiene un formato inválido.',
            'cellphone.max' => 'El campo teléfono no puede tener más de 20 caracteres.',
            'company.string' => 'El campo empresa debe ser una cadena de texto.',
            'company.max' => 'El campo empresa no puede tener más de 255 caracteres.',
            'message_category_id.required' => 'Debe seleccionar una categoría válida.',
            'message_category_id.exists' => 'Debe seleccionar una categoría válida.',
            'message.required' => 'El mensaje es obligatorio.',
            'message.min' => 'El mensaje debe tener al menos 20 caracteres.',
            'terms_accepted.accepted' => 'Debe aceptar los términos y condiciones.',
            'honeypot.max' => 'Campo inválido detectado.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
            ], 422);
        }

        $validatedData = $validator->validated();
        unset($validatedData['terms_accepted']);

        $contactForm = ContactForms::create($validatedData);

        Mail::send('emails.contact_success', [
            'name' => ucfirst($contactForm->name),
            'last_name' => ucfirst($contactForm->last_name),
        ], function ($message) use ($contactForm) {
            $message->to($contactForm->email)
                    ->subject('Solicitud de contacto recibida | TurnoMaster');
        });

        return response()->json([
            'message' => 'Gracias por enviarnos una consulta. Nos pondremos en contacto a través del correo electrónico proporcionado.',
            'data' => $contactForm,
        ], 201);
    }
}
