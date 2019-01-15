<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Api\V1\DingoController;
use Illuminate\Http\Request;
use App\Notifications\PasswordResetRequest;
use App\Notifications\PasswordResetSuccess;
use Carbon\Carbon;
use App\Models\User;
use App\Models\PasswordReset;
use App\Models\Error;
use App\Http\Transformers\ErrorTransformer;
use App\Http\Transformers\UserTransformer;
use App\Http\Transformers\PasswordResetTransformer;
use Illuminate\Support\Facades\Validator;

class PasswordResetController extends DingoController
{
    /**
     * Create token password reset
     *
     * @param  [string] email
     * @return [string] message
     */
    public function createToken(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
        ]);
        
        if($validator->fails())
        {
            $error = new Error([
                'response_message' => validationErrorsToString($validator->errors()),
                'code' => 404,
                ]);
            $response = $this->response->item($error, new ErrorTransformer())
                ->setStatusCode(404);
            return $response->throwResponse();
        }

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            $error = new Error([
                'response_message' => "We can't find a user with that e-mail address.",
                'code' => 404,
                ]);
            $response = $this->response->item($error, new ErrorTransformer())
                ->setStatusCode(404);
            return $response->throwResponse();
        }
        $passwordReset = PasswordReset::updateOrCreate(
            ['email' => $user->email],
            [
                'email' => $user->email,
                'token' => str_random(60)
             ]
        );
        if ($user && $passwordReset)
            $user->notify(
                new PasswordResetRequest($passwordReset->token)
            );
        return response()->json([
            'data' => [
                'response_message' => 'We have e-mailed your password reset link!'
            ]
        ]);
    }
    /**
     * Find token password reset
     *
     * @param  [string] $token
     * @return [string] message
     * @return [json] passwordReset object
     */
    public function findToken($token)
    {
        $passwordReset = PasswordReset::where('token', $token)
            ->first();
        if (!$passwordReset) {
            $error = new Error([
                'response_message' => 'This password reset token is invalid.',
                'code' => 404,
                ]);
            $response = $this->response->item($error, new ErrorTransformer())
                ->setStatusCode(404);
            return $response->throwResponse();
        }
        if (Carbon::parse($passwordReset->updated_at)->addMinutes(720)->isPast()) {
            $passwordReset->delete();
            $error = new Error([
                'response_message' => 'This password reset token is invalid.',
                'code' => 404,
                ]);
            $response = $this->response->item($error, new ErrorTransformer())
                ->setStatusCode(404);
            return $response->throwResponse();
        }
        $response = $this->response->item($passwordReset, new PasswordResetTransformer())
                ->setStatusCode(200);
        return $response->throwResponse();
    }
     /**
     * Reset password
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @param  [string] token
     * @return [string] message
     * @return [json] user object
     */
    public function reset(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string|confirmed',
            'token' => 'required|string'
        ]);
         
        if($validator->fails())
        {
            $error = new Error([
                'response_message' => validationErrorsToString($validator->errors()),
                'code' => 404,
                ]);
            $response = $this->response->item($error, new ErrorTransformer())
                ->setStatusCode(404);
            return $response->throwResponse();
        }

        $passwordReset = PasswordReset::where([
            ['token', $request->token],
            ['email', $request->email]
        ])->first();
        if (!$passwordReset) {
            $error = new Error([
                'response_message' => 'This password reset token is invalid.',
                'code' => 404,
                ]);
            $response = $this->response->item($error, new ErrorTransformer())
                ->setStatusCode(404);
            return $response->throwResponse();
        }
        $user = User::where('email', $passwordReset->email)->first();
        if (!$user) {
            $error = new Error([
                'response_message' => "We can't find a user with that e-mail address.",
                'code' => 404,
                ]);
            $response = $this->response->item($error, new ErrorTransformer())
                ->setStatusCode(404);
            return $response->throwResponse();
        }
        $user->password = bcrypt($request->password);
        $user->save();
        $passwordReset->delete();
        $user->notify(new PasswordResetSuccess($passwordReset));

        $response = $this->response->item($user, new UserTransformer())
                ->setStatusCode(200);
        return $response->throwResponse();
    }
}