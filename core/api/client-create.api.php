<?php

include __root.CORE."registrator/clients.php";

$client = json_decode(file_get_contents("php://input"), true);
$responce = (new ClientsReg())->clientCreate($client);

if (__debug) {
    Err::log("API clientCreate responce: ".var_export($responce, true));
}

if (json_decode($responce, true)['result']??false) {                                                                                                        // если есть ответ - сохраним нового клиента
    $db = new Database();
    $clientList = $db->getUsers();

    $db->saveUsers(json_encode(
        json_decode($clientList, true) +
        [json_decode($responce, true)['result']['id'] => $client],
        JSON_NUMERIC_CHECK|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES|JSON_HEX_QUOT
    ));
}
exit($responce);
