import { oplog } from "./interface.js";
const api = {
    clientCreate: "/api/client-create",
    domainCreate: "/api/domain-create",
    domainUpdate: "/api/domain-update",
    taskStatus: "/api/task-status",
};
async function clientCreate(Client) {
    let responce = await fetch(api.clientCreate, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Client),
    });
    return (await responce.json());
}
async function domainCreate(clid, Domain) {
    let responce = await fetch(api.domainCreate, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ clid: clid, domain: Domain }),
    });
    return (await responce.json());
}
async function domainUpdate(clid, id, Domain) {
    let responce = await fetch(api.domainUpdate, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ clid: clid, id: id, domain: Domain }),
    });
    return (await responce.json());
}
async function taskStatus(handle) {
    let responce = await fetch(api.taskStatus, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ handle: handle }),
    });
    return (await responce.json());
}
async function retryStatus(handle, timeout) {
    if (timeout > 10000) {
        oplog(["Не дождался ответа от регистратора, прекращаю", "Результат операции неизвестен"]);
        return false;
    }
    setTimeout(async () => {
        var _a;
        oplog([`Ожидаю ${timeout / 1000} сек`]);
        let responce = await taskStatus(handle);
        if (((_a = responce.result) === null || _a === void 0 ? void 0 : _a.status) != "success")
            return retryStatus(handle, timeout + 1000);
        else
            return true;
    }, timeout);
}
export { clientCreate, domainCreate, domainUpdate, taskStatus, retryStatus };
