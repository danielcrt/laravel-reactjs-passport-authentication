<?php

if (! function_exists('validationErrorsToString')) {
    function validationErrorsToString($errArray) {
        $valArr = array();
        foreach ($errArray->toArray() as $key => $value) { 
            $errStr = $value[0];
            array_push($valArr, $errStr);
        }
        if(!empty($valArr)){
            $errStrFinal = implode(' ', $valArr);
        }
        return $errStrFinal;
    }
}