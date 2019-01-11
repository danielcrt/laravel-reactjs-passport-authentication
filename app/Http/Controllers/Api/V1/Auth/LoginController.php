<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Api\V1\DingoController;
use App\Http\Transformers\NullObjectTransformer;
use App\Http\Transformers\PersonalAccessTokenResultTransformer;
use App\Models\NullObject;
use App\Models\User;
use Dingo\Api\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class LoginController extends DingoController
{
    /**
     * Handle a login request to the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $this->validateLogin($request);
        $this->attemptLogin($request);
    }
    /**
     * Validate the user login request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    protected function validateLogin(Request $request)
    {
        $this->validate($request, [
            $this->username() => 'required|string|email',
            'password' => 'required|string',
        ]);
    }
    /**
     * Attempt to log the user into the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function attemptLogin(Request $request)
    {
        if (Auth::guard("web")->once($this->credentials($request)) ){
            $this->sendLoginResponse($request);
        } else {
            $this->sendFailedLoginResponse($request);
        }
    }
    /**
     * Get the needed authorization credentials from the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    protected function credentials(Request $request)
    {
        return $request->only($this->username(), 'password');
    }
    /**
     * Send the response after the user was authenticated.
     * The logic uses personal access token created by Passport
     * in the background. Feel free to change it to your needs.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    protected function sendLoginResponse(Request $request)
    {
        $inputs = $request->all();
        $user = User::where($this->username(), $inputs[$this->username()])->firstOrFail();
        $token = $user->createToken('Personal Access Token');
        $meta = array(
            'status_code' => 200,
            'status_text' => "OK",
            'message' => trans("auth.login.success"),
        );
        $response = $this->response->item($token, new PersonalAccessTokenResultTransformer())
            ->setStatusCode(200)
            ->setMeta($meta);
        // Use this method instead of send(). It also saves you from weird
        // assertJsonStructure errors
        $response->throwResponse();
    }
    /**
     * The user has been authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $user
     * @return mixed
     */
    protected function authenticated(Request $request, $user)
    {
        //
    }
    /**
     * Get the failed login response instance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function sendFailedLoginResponse(Request $request)
    {
        $this->response()->errorUnauthorized(trans('auth.login.failed'));
    }
    /**
     * Get the login username to be used by the controller.
     *
     * @return string
     */
    public function username()
    {
        return 'email';
    }
    /**
     * Log the user out of the application.
     *
     * The logout procedure just deletes the personal access token
     * which was created by Passport. You can also just revoke them
     * or incorporate refresh tokens. Do as you like.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        $request->user()->token()->delete();
        $meta = array(
            'status_code' => 200,
            'status_text' => "OK",
            'message' => trans("auth.logout.success"),
        );
        $response = $this->response->item(new NullObject(), new NullObjectTransformer())
            ->setStatusCode(200)
            ->setMeta($meta);
        // Use this method instead of send(). It also saves you from weird
        // assertJsonStructure errors
        $response->throwResponse();
    }
}