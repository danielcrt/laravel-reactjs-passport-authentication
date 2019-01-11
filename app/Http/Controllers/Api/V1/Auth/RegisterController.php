<?php
namespace App\Http\Controllers\Api\V1\Auth;
use App\Http\Controllers\Api\V1\DingoController;
use App\Http\Transformers\UserTransformer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Notifications\RegisterNotification;

class RegisterController extends DingoController
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */
    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/';
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }
    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }
    /**
     * @param array $data
     * @return $this|\Illuminate\Database\Eloquent\Model
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'activation_token' => str_random(60)
        ]);
    }
    /**
     * The user has been registered.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $user
     * @return mixed
     */
    protected function registered(Request $request, $user)
    {
        $meta = array(
            'status_code' => 201,
            'status_text' => "Created",
            'message' => trans("auth.register.success"),
        );
        $response = $this->response->item($user, new UserTransformer())
            ->setStatusCode(201)
            ->setMeta($meta);
        return $response;
    }
    /**
     * Handle a registration request for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        /*
         * We have to use the validator in this specific way to throw
         * the ValidationException so that Dingo is formatting the
         * error bag in a nice way and sends it back in the response
         */
        $validator = $this->validator($request->all());
        $this->validateByValidator($request, $validator);
        $user = $this->create($request->all());
        //event(new Registered($user = $this->create($request->all())));
        //$this->guard()->login($user);
        $user->notify(new RegisterNotification($user));

        return $this->registered($request, $user)
            ?: redirect($this->redirectPath());
    }

    public function registerActivate($token)
    {
        $user = User::where('activation_token', $token)->first();
        if (!$user) {
            return response()->json([
                'message' => 'This activation token is invalid.'
            ], 404);
        }
        $user->email_verified_at = date("Y-m-d H:i:s");
        $user->activation_token = '';
        $user->save();
        return $user;
    }
}