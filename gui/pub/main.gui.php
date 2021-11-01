<?php

function content($data=null)
{
    ?>
<h1><?=$data['title']?>
</h1>
<div class="row">
    <div class="col-lg-6">
        <h4 class="my-4">Домен</h4>
        <select class="mb-4 p-2 border border-primary" name="did" id="did">
            <option value="0" id="NewDomain" selected>Зарегистрировать домен</option>
        </select>
        <?=nsForm()?>
        <div id="domainRegister">
            <?=formField(["field"=>"input", "type"=>"text", "name"=>"domainname", "id"=>"domainname", "title"=>"<h6>Имя домена</h6>", "help"=>""])?>
            <h4 class="my-4">Администратор</h4>
            <label for="domainadmin" class="form-label">
                <h6>Администратор домена </h6>
            </label>
            <select class="mb-4 p-2 border border-primary" name="clid" id="clid">
                <option value="0" id="createNew" selected>Создать нового</option>
            </select>
            <div class="d-none" id="clientInfo"></div>
            <div id="clientForm">
                <?=clientForm()?>
                <?=personForm()?>
                <?=orgForm()?>
            </div>
            <div><button class="btn btn-primary" id="register">Зарегистрировать домен</button></div>
        </div>
    </div>

    <div class="col-lg-4 border-start bg-light p-2 small">
        <h6>Журнал операций</h6>
        <div id="oplog">
        </div>
    </div>
    <?=errWindow()?>
</div>

<div class="my-4">
    <code><?=$data['project'],' v',$data['version']?></code>
</div>

<?php
}

function clientForm()
{
    ?>
<?=formField(["field"=>"radio", "type"=>"radio", "name"=>"legal", "value"=>["legalorg","legalperson","legalproprietor"], "id"=>["legalorg","legalperson","legalproprietor"],
    "title"=>"<h6>Вид клиента:</h6>", "label"=>["Юридическое лицо", "Физическое лицо", "Индивидуальный предприниматель"], "help"=>""]); ?>
<?=formField(["field"=>"input", "type"=>"text", "name"=>"nameLocal", "id"=>"nameLocal", "title"=>"<h6>Имя (название)</h6>", "maxlength"=>"255", "help"=>"Фамилия, имя, отчество или
                названия организации так, как это указано в документах"])?>
<?=formField(["field"=>"input", "type"=>"email", "name"=>"email", "id"=>"email", "maxlength"=>"128", "title"=>"<h6>Адрес email</h6>", "help"=>"Адреса электронной почты, один или несколько,
                разделённых запятыми"])?>
<?=formField(["field"=>"input", "type"=>"phone", "name"=>"phone", "id"=>"phone", "maxlength"=>"128", "title"=>"<h6>Номер телефона</h6>", "help"=>"Номера телефонов в международном формате +7 123
                4567890, один или несколько, разделённых запятыми"])?>
<h6>Почтовый адрес</h6>
<?=formField(["field"=>"input", "type"=>"text", "name"=>"index", "id"=>"index", "title"=>"Индекс", "maxlength"=>"8", "help"=>"Почтовый индекс или код"])?>
<input type="hidden" name="country" value="RU" id="country">
<?=formField(["field"=>"input", "type"=>"text", "name"=>"city", "id"=>"city", "title"=>"Город", "help"=>"Название населенного пункта", "maxlength"=>"32"])?>
<?=formField(["field"=>"input", "type"=>"text", "name"=>"street", "id"=>"street", "title"=>"Адрес", "help"=>"Адрес в населенном
                пункте", "maxlength"=>"128"])?>

<?php
}


function personForm()
{
    ?>
<div class="d-none" id="personForm">
    <?=formField(["field"=>"input", "type"=>"date", "name"=>"birthday", "id"=>"birthday", "title"=>"Дата рождения", "help"=>""])?>
    <h6>Паспорт</h6>
    <input type="hidden" id="type" name="type" value="passport">
    <?=formField(["field"=>"input", "type"=>"text", "name"=>"series", "id"=>"series", "maxlength"=>"8", "title"=>"Серия", "help"=>""])?>
    <?=formField(["field"=>"input", "type"=>"text", "name"=>"number", "id"=>"number", "maxlength"=>"8", "title"=>"Номер", "help"=>""])?>
    <?=formField(["field"=>"input", "type"=>"text", "name"=>"issuer", "id"=>"issuer", "maxlength"=>"128", "title"=>"Кем выдан", "help"=>""])?>
    <?=formField(["field"=>"input", "type"=>"date", "name"=>"issued", "id"=>"issued", "title"=>"Дата выдачи", "help"=>""])?>
</div>
<?php
}


function orgForm()
{
    ?>
<div class="d-none" id="orgForm">
    <?=formField(["field"=>"input", "type"=>"text", "name"=>"inn", "id"=>"inn", "title"=>"<h6>ИНН</h6>", "help"=>""])?>
    <h6>Юридический адрес</h6>
    <?=formField(["field"=>"input", "type"=>"text", "name"=>"org_index", "id"=>"org_index", "maxlength"=>"8", "title"=>"Индекс", "help"=>"Почтовый индекс или код"])?>
    <input type="hidden" name="org_country" value="RU" id="org_country">
    <?=formField(["field"=>"input", "type"=>"text", "name"=>"org_city", "id"=>"org_city", "title"=>"Город", "help"=>"Название населенного пункта", "maxlength"=>"32"])?>
    <?=formField(["field"=>"input", "type"=>"text", "name"=>"org_street", "id"=>"org_street", "title"=>"Адрес", "help"=>"Адрес в населенном
                пункте ", "maxlength"=>"128"])?>
</div>
<?php
}

function nsForm()
{
    ?>
<div class="d-none" id="NSForm">
    <?=formField(["field"=>"input", "type"=>"text", "name"=>"nservers", "id"=>"nservers", "maxlength"=>"255", "title"=>"<h6>DNS сервера</h6>", "help"=>"список имен (и, возможно, IP-адресов) name-серверов домена, разделенных запятыми"])?>
    <div><button class="btn btn-primary" id="update">Обновить домен</button></div>
</div>

<?php
}

function errWindow()
{
    return
    ?>
<div class="d-none" id="errWindow">
    <div class="my-4 p-3 border border-warning bg-light">
        <h5>Не удалось отправить на регистрацию</h5>
        <hr>
        <div id="errors">
        </div>
    </div>
</div>
<?php
}
