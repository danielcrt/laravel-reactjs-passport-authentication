<?php
namespace App\Http\Transformers;
use App\Models\PasswordReset;
use League\Fractal\TransformerAbstract;

class PasswordResetTransformer extends TransformerAbstract
{
    /**
     * @param PasswordReset $password_reset
     * @return array
     */
    public function transform(PasswordReset $password_reset)
    {
        return [
            'email'          => $password_reset->email,
            'token'          => $password_reset->token,
        ];
    }
}