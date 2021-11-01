<?php

class Registrator
{
    /*
    Возвращает json или false
    */
    protected function query($method, $params)
    {
        $query_string = "?".http_build_query(["method"=>$method, "params"=>json_encode($params, JSON_NUMERIC_CHECK|JSON_HEX_QUOT)]);
        $query_string_uni = "?method=$method&params=".json_encode($params, JSON_NUMERIC_CHECK|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES|JSON_HEX_QUOT);
        if (__debug) {
            Err::log(var_export($query_string_uni, true));
        }
        //exit;
        if (!($handle = curl_init())) {
            throw new Err("cURL init false!");
        }
        if (!curl_setopt_array($handle, [
            CURLOPT_URL => 				__apiendpoint.$query_string,
            //CURLOPT_CUSTOMREQUEST =>	"POST",
            CURLOPT_HTTPHEADER =>		[],
            CURLOPT_HEADER => 			false,
            CURLOPT_RETURNTRANSFER => 	true,
            CURLOPT_TIMEOUT => 			10,
            //CURLOPT_POSTFIELDS =>       ["method"=>$method, "params"=>json_encode($params, JSON_NUMERIC_CHECK|JSON_UNESCAPED_UNICODE)]
        ])) {
            throw new Err("cURL set options failed!");
        }
        if (($recv=curl_exec($handle))===false) {
            throw new Err(curl_error($handle));
        }
        curl_close($handle);
        return json_decode($recv)?$recv:Err::log($recv);                                                               // если в ответе не json, то запишем в лог ответ и вернем false
    }

    public function __construct()
    {
        session_start();
    }

    public function authLogin()
    {
        if (!($_SESSION['auth_token']??false) ||
            $_SESSION['auth_timestamp'] + __tokenvalidtime < time()) {
            $responce =json_decode($this->query("authLogin", [
                "operator" => __reguser,
                "password" => __regpass,
            ]), true);
            if ($responce['result']['token']??false) {
                $_SESSION['auth_token'] = $responce['result']['token'];
                $_SESSION['auth_timestamp'] = time();
            } else {
                throw new Err("Can't login to registrator. ".$responce['error']['code']??false.' '.$responce['error']['message']??false);
            }
        }
        return ["token"=>$_SESSION['auth_token']];
    }

    public function authLogout()
    {
        return json_decode($this->query("authLogout", ["auth" => json_encode(["token"=>$_SESSION['auth_token']])]), true);
    }
}
