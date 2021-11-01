<?php

include "registrator.php";

class DomainsReg extends Registrator
{
    public function __construct()
    {
        parent::__construct();
    }
    
    public function domainCreate($clid, $domain)
    {
        $responce = $this->query("domainCreate", [
            "auth" => $this->authLogin(),
            "clientId" => $clid,
            "domain" => $domain]);
        if (json_decode($responce, true)['error']??false) {
            Err::log($responce);
        }
        return $responce;
    }

    public function domainUpdate($clid, $id, $domain)
    {
        return $this->query("domainUpdate", [
            "auth" => $this->authLogin(),
            "clientId" => $clid,
            "id" => $id,
            "domain" => $domain]);
    }

    public function domainDelete($clid, $id)
    {
        return $this->query("domainUpdate", [
            "auth" => $this->authLogin(),
            "clientId" => $clid,
            "id" => $id,
            ]);
    }
}
