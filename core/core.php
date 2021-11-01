<?php

/*
* Загрузка конфигурации
*/
$cfg = parse_ini_file(CONFIG, false, INI_SCANNER_TYPED);
if ($cfg) {
    foreach ($cfg as $var => $val) {
        define($var, $val);
    }
}
unset($cfg);
define('__host', 'http' . (($_SERVER['HTTPS'] ?? false) ? 's' : '') . '://' . $_SERVER['HTTP_HOST']);
define('__root', $_SERVER['DOCUMENT_ROOT'] . '/');
if (defined(__timezone)) {
    date_default_timezone_set(__timezone);
}
if (defined(__locale)) {
    setlocale(LC_ALL, __locale);
}

/*
*	Обработка ошибок
*/
class Err extends Error
{
    const DST_FILE=3;
    public function __construct($message, $code=0, $previous=null)
    {
        parent::__construct($message, $code, $previous);
        $class =$this->getTrace()[0]['class']??false;
        $function =$this->getTrace()[0]['function']??false;
        $this->log("$class::$function >> $message", $this->getTraceAsString());
    }
    public static function log($message=null, $stack=null)
    {
        if ($message) {
            error_log(date("H:i:s | ").$message.($stack?PHP_EOL.$stack.PHP_EOL:false).PHP_EOL, Err::DST_FILE, __root.__log_err.date("_y-m-d").'.log');
        }
        return false;
    }
}
