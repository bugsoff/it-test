<?php

$data=[
    'title'=>"Регистрация доменов",
    'version'=>__version,
    'project'=>__project,
    'styles' => [],
    'scripts' => ["/main.js"],
];

include __root.GUI."gui.php";
include __root.GUI.PUB."main.gui.php";
include __root.GUI."page.gui.php";

?>

