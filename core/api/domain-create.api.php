<?php

include __root.CORE."registrator/domains.php";

$data = json_decode(file_get_contents("php://input"), true);
if ($data['domain']['nameIdn']??false) {
    $data['domain']['name'] = idn_to_ascii($data['domain']['nameIdn']);
    $nameIdn = $data['domain']['nameIdn'];
    unset($data['domain']['nameIdn']);
}
$responce = (new DomainsReg())->domainCreate($data['clid'], $data['domain']);
if (isset($nameIdn)) {
    $data['domain']['nameIdn'] = $nameIdn;
}

if (__debug) {
    Err::log("API domainCreate responce: ".var_export($responce, true));
}

if (json_decode($responce, true)['result']??false) {                                                                                                        // если есть ответ - сохраним новый домен
    $db = new Database();
    $domainList = $db->getDomains();

    $db->saveDomains(json_encode(
        json_decode($domainList, true) +
        [json_decode($responce, true)['result']['id'] =>
            ["clid"=>$data['clid'],
            "domain"=>$data['domain']
        ]],
        JSON_NUMERIC_CHECK|JSON_UNESCAPED_UNICODE
    ));
}

exit($responce);
