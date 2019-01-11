<?php
namespace App\Http\Controllers\Api\V1;
use App\Models\User;
use Dingo\Api\Http\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use Psr\Http\Message\ServerRequestInterface;

class DingoController extends Controller
{
    use Helpers;
    /**
     * This method forces Laravel to put its validation errors
     * into the errors array of a Dingo Response
     *
     * @param Request $request
     * @param \Illuminate\Contracts\Validation\Validator $validator
     */
    protected function throwValidationException(Request $request, $validator) {
        throw new ValidationHttpException($validator->getMessageBag()->toArray());
    }
    protected function validateByValidator(Request $request, $validator) {
        if ($validator->fails()){
            $this->throwValidationException($request, $validator);
        }
    }
}