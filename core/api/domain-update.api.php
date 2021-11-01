<?php

include __root.CORE."registrator/domains.php";

$data = json_decode(file_get_contents("php://input"), true);
$responce = (new DomainsReg())->domainUpdate($data['clid'], $data['id'], $data['domain']);

if (__debug) {
    Err::log("API domainUpdate responce: ".var_export($responce, true));
}

exit($responce);
