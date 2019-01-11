<?php
namespace App\Http\Transformers;
use App\Models\Error;
use League\Fractal\TransformerAbstract;

class ErrorTransformer extends TransformerAbstract
{
    /**
     * @param Error $error
     * @return array
     */
    public function transform(Error $error)
    {
        return [
            'code'            => (int) $error->code,
            'message'          => $error->message,
        ];
    }
}