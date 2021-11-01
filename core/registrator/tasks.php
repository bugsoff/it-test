<?php

include "registrator.php";

class TasksReg extends Registrator
{
    public function __construct()
    {
        parent::__construct();
    }

    public function taskStatus($hanlde)
    {
        $responce = $this->query("taskStatus", [
            "auth" => $this->authLogin(),
            "handle" => $hanlde]);
        if (json_decode($responce, true)['error']??false) {
            Err::log($responce);
        }
        return $responce;
    }
}
