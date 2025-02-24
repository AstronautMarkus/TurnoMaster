<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerificationCodeMail;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function sendVerificationCode()
    {
        $code = rand(100000, 999999);
        $verificationCode = VerificationCode::create([
            'user_id' => $this->id,
            'code' => $code,
            'expires_at' => Carbon::now()->addMinutes(10),
        ]);

        Mail::to($this->email)->send(new VerificationCodeMail($code, $this));
        
        Log::info('Verification email sent to ' . $this->email . ' with code: ' . $code);
    }

    public function verificationCodes()
    {
        return $this->hasMany(VerificationCode::class);
    }
}
