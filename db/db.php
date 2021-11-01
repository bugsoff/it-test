<?php

class Database
{
    const USERSFILE="users.json";
    const DOMAINSFILE="domains.json";

    public function getUsers()
    {
        return file_get_contents(__root.DATA.Database::USERSFILE, true)?:"[]";
    }

    public function saveUsers($users)
    {
        return file_put_contents(__root.DATA.Database::USERSFILE, $users);
    }

    public function getDomains()
    {
        return file_get_contents(__root.DATA.Database::DOMAINSFILE, true)?:"[]";
    }

    public function saveDomains($domains)
    {
        return file_put_contents(__root.DATA.Database::DOMAINSFILE, $domains);
    }
};
