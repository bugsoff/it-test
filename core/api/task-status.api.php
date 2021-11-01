<?php

include __root.CORE."registrator/tasks.php";

$responce = (new TasksReg())->taskStatus(json_decode(file_get_contents("php://input"), true)['handle']);

exit($responce);
