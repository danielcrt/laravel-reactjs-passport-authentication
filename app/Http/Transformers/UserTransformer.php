<?php
namespace App\Http\Transformers;
use App\Models\User;
use League\Fractal\TransformerAbstract;
class UserTransformer extends TransformerAbstract
{
    /**
     * @param User $user
     * @return array
     */
    public function transform(User $user)
    {
        return [
            'id'            => (int) $user->id,
            'name'          => $user->name,
            'email'         => $user->email,
            'created_at'    => $user->created_at ? $user->created_at->format("Y-m-d H:i:s") : null,
            'updated_at'    => $user->updated_at ? $user->updated_at->format("Y-m-d H:i:s") : null,
        ];
    }
}