<?php
namespace App\Http\Transformers;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Laravel\Passport\PersonalAccessTokenResult;
use League\Fractal\TransformerAbstract;
class PersonalAccessTokenResultTransformer extends TransformerAbstract
{
    /**
     * @param PersonalAccessTokenResult $personalAccessTokenResult
     * @return array
     */
    public function transform(PersonalAccessTokenResult $personalAccessTokenResult)
    {
        return [
            'access_token' => $personalAccessTokenResult->accessToken,
            'user' => $this->getUser($personalAccessTokenResult)
        ];
    }
    private function getUser(PersonalAccessTokenResult $personalAccessTokenResult)
    {
        $user = $personalAccessTokenResult->token->user;
        if($user){
            return (new UserTransformer())->transform($user);
        }
        return null;
    }
}