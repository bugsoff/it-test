<?php
include "registrator.php";

class ClientsReg extends Registrator
{
    public function __construct()
    {
        parent::__construct();
    }

    public function clientCreate($client)
    {
        $responce = $this->query("clientCreate", [
            "auth" => $this->authLogin(),
            "client" => $client]);
        if (json_decode($responce, true)['error']??false) Err::log($responce);
        return $responce;
    }

    public function clientDelete($clid)
    {
        return $this->query("clientDelete", [
            "auth" => $this->authLogin(),
            "id" => $clid]);
    }
}
