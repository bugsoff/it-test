import { oplog } from "./interface.js";
import { getClientInfo, checkFormData, loadClientList, updateClients, addClient } from "./client.js";
import { getDomainInfo, loadDomainsList, updateDomains, addDomain } from "./domain.js";
import * as API from "./api.js";
let ClientList, DomainsList;
(async () => {
    ClientList = await loadClientList();
    updateClients(ClientList);
    DomainsList = await loadDomainsList();
    updateDomains(DomainsList);
})();
document.querySelector("#register").addEventListener("click", async () => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let clid = document.querySelector("#clid").value;
    if (clid == 0) {
        let Client = getClientInfo();
        let errors = checkFormData(Client);
        if (errors.length) {
            oplog(["Не могу регистрировать клиента:", ...errors]);
            return;
        }
        else {
            oplog(["Регистрирую данные нового клиента ..."]);
            let responce = await API.clientCreate(Client);
            if (responce.result) {
                clid = (_a = responce.result) === null || _a === void 0 ? void 0 : _a.id;
                addClient(clid, Client.nameLocal);
                let handle = (_b = responce.result) === null || _b === void 0 ? void 0 : _b.handle;
                setTimeout(async () => {
                    var _a;
                    responce = await API.taskStatus(handle);
                    if (((_a = responce.result) === null || _a === void 0 ? void 0 : _a.status) == "success")
                        oplog([`Клиент зарегистрирован (id=${clid})`]);
                    else
                        oplog([`Клиент в процессе регистрации ... (id=${clid})`]);
                }, 3000);
            }
            else
                oplog([`Ошибка:${(_c = responce.error) === null || _c === void 0 ? void 0 : _c.message}`]);
        }
    }
    let Domain = getDomainInfo();
    let domainName = (_d = Domain.name) !== null && _d !== void 0 ? _d : Domain.nameIdn;
    if (!(domainName === null || domainName === void 0 ? void 0 : domainName.match(/^[a-zа-яё0-9_\-\.]+$/gi))) {
        oplog(["Не могу отправить домен на регистрацию:", "Имя домена неверное"]);
    }
    else {
        oplog(["Регистрирую новый домен ..."]);
        let responce = await API.domainCreate(clid, Domain);
        if (responce.result) {
            let id = (_e = responce.result) === null || _e === void 0 ? void 0 : _e.id;
            addDomain(clid, id, (_f = Domain.name) !== null && _f !== void 0 ? _f : Domain.nameIdn);
            let handle = (_g = responce.result) === null || _g === void 0 ? void 0 : _g.handle;
            setTimeout(async () => {
                var _a;
                responce = await API.taskStatus(handle);
                if (((_a = responce.result) === null || _a === void 0 ? void 0 : _a.status) == "success")
                    oplog([`Домен зарегистрирован (id=${id})`]);
                else
                    oplog([`Домен в процессе регистрации ... (id=${id})`]);
            }, 5000);
        }
        else
            oplog([`Ошибка:${(_h = responce.error) === null || _h === void 0 ? void 0 : _h.message}`]);
    }
});
document.querySelector("#update").addEventListener("click", async () => {
    var _a, _b, _c;
    oplog(["Обновляю данные домена ..."]);
    let id = document.querySelector("#did").value;
    let clid = document.querySelector(`#domain-${id}`).getAttribute("data-clid");
    let Domain = getDomainInfo();
    let responce = await API.domainUpdate(clid, id, Domain);
    if (responce.result) {
        let id = (_a = responce.result) === null || _a === void 0 ? void 0 : _a.id;
        let handle = (_b = responce.result) === null || _b === void 0 ? void 0 : _b.handle;
        setTimeout(async () => {
            var _a;
            responce = await API.taskStatus(handle);
            if (((_a = responce.result) === null || _a === void 0 ? void 0 : _a.status) == "success")
                oplog([`Данные обновлены (id=${id})`]);
            else
                oplog([`Данные обновляются ... (id=${id})`]);
        }, 3000);
    }
    else
        oplog([`Ошибка:${(_c = responce.error) === null || _c === void 0 ? void 0 : _c.message}`]);
});
