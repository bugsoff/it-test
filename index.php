<?php

const CONFIG =  "config.php";
const CORE =    "core/";
const DB =      "db/";
const DATA =    "data/";
const GUI =     "gui/";
const API =     "api/";
const ADMIN =   "admin/";
const USER =    "user/";
const PUB =     "pub/";

const ROUTES_CORE=[
    "api"   =>CORE.API."api.php",
    "admin" =>CORE.ADMIN."admin.php",
    "user"  =>CORE.USER."user.php",
    "test"  =>"test/test.php",
    ""      =>CORE.PUB."main.php",
];

$uri=explode('/', parse_url($_SERVER['REQUEST_URI'])['path']);

if (file_exists($core =ROUTES_CORE[$uri[true]]??CORE.PUB.$uri[true].".php")) {
    try {
        include CORE."core.php";
        include DB."db.php";
        include $core;
    } catch (Err $err) {
        exit((__debug??false)?$err:"FATAL ERROR");
    }
} else {
    header('HTTP/1.1 404 Not Found', true, 404);
}
