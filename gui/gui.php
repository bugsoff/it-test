<?php

function styles($styles)
{
    if ($styles??false) {
        foreach ($styles as $stylesheet) { ?>
<link rel="stylesheet" href="<?=$stylesheet?>"><?php }
    }
}

function scripts($scripts)
{
    if ($scripts??false) {
        foreach ($scripts as $script) { ?><script type="module"
    src="<?=$script?>">
</script><?php }
    }
}

function formField($arg)
{
    switch ($arg['field']) {
        case "select":{
        } break;
        case "radio":{
            ?>
<div class="row mb-4">
    <div class="col-auto">
        <?=$arg['title']?>
    </div>
    <div class="col-auto">
        <?php foreach ($arg['value'] as $i => $value): ?>
        <div class="form-check">
            <input class="form-check-input" type="radio"
                name="<?=$arg['name']?>"
                value="<?=$value?>"
                id="<?=$arg['id'][$i]?>">
            <label class="form-check-label"
                for="<?=$arg['id'][$i]?>"><?=$arg['label'][$i]?></label>
        </div>
        <?php endforeach; ?>
    </div>
</div>
<?php
        } break;
        case "input": {
            ?>
<div class="row mb-4">
    <div class="col-auto">
        <label for="<?=$arg['name']?>"
            class="form-label"><?=$arg['title']?></label>
    </div>
    <div class="col-6">
        <input type="<?=$arg['type']?>"
            class="form-control"
            name="<?=$arg['name']?>"
            id="<?=$arg['id']?>"
            aria-describedby="<?=$arg['id']?>Help"
            maxlength="<?=$arg['maxlength']?>">
    </div>
    <div class="col-auto">
        <span id="<?=$arg['id']?>Help"
            class="form-text"><?=$arg['help']?></span>
    </div>
</div>
<?php
        } break;
    }
}
