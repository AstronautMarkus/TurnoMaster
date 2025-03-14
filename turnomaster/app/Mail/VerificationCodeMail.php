<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerificationCodeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $code;
    public $user;

    public function __construct($code, $user)
    {
        $this->code = $code;
        $this->user = $user;
    }

    public function build()
    {
        return $this->view('emails.verification_code')
                    ->with([
                        'code' => $this->code,
                        'user' => $this->user,
                    ]);
    }
}
