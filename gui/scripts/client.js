import { hide } from "./interface.js";
function getClientInfo() {
    let Client = {
        legal: document.querySelector("#legalorg").checked
            ? "org"
            : document.querySelector("#legalperson").checked
                ? "person"
                : document.querySelector("#legalproprietor").checked
                    ? "proprietor"
                    : "",
        nameLocal: document.querySelector("#nameLocal").value,
        emails: document.querySelector("#email").value.split(","),
        phones: document.querySelector("#phone").value.split(","),
        addressLocal: {
            country: document.querySelector("#country").value,
            index: document.querySelector("#index").value,
            city: document.querySelector("#city").value,
            street: document.querySelector("#street").value,
        },
    };
    switch (Client.legal) {
        case "org": {
            Client.addressLegal = {
                country: document.querySelector("#org_country").value,
                index: document.querySelector("#org_index").value,
                city: document.querySelector("#org_city").value,
                street: document.querySelector("#org_street").value,
            };
            Client.inn = document.querySelector("#inn").value;
            break;
        }
        case "person":
        case "proprietor": {
            Client.birthday = document.querySelector("#birthday").value;
            Client.identity = {
                type: document.querySelector("#type").value,
                series: document.querySelector("#series").value,
                number: document.querySelector("#number").value,
                issuer: document.querySelector("#issuer").value,
                issued: document.querySelector("#issued").value,
            };
            break;
        }
    }
    return Client;
}
function checkFormData(Client) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const pattern = {
        name: /^[a-zа-яё \-]+$/gi,
        title: /^[a-zа-яё0-9 ,\(\)\'\"\.\-]+$/gi,
        email: /^[a-zа-яё0-9_\.\-]+@[a-z0-9_\.\-]{2,}\.[a-z]{2,}$/gi,
        phone: /^\+\d{1,3} \d{3} \d{7}( #\d{1,6})?$/g,
        series: /^[a-zа-яё0-9 \-]+$/gi,
        index: /^\d{3,8}$/g,
        inn: /^\d{6,16}$/g,
        date: /^\d{4}-\d{2}-\d{2}$/g,
    };
    let errors = [];
    if (Client.legal == "")
        errors.push("Не выбран вид клиента");
    if (!Client.nameLocal.match(pattern.title))
        errors.push("Имя (название) не верное");
    if (Client.emails.some(email => !email.match(pattern.email)))
        errors.push("Email адрес не верного формата");
    if (Client.phones.some(phone => !phone.match(pattern.phone)))
        errors.push("Телефон указывается в международном формате, например: +12 234 3456789");
    if (!Client.addressLocal.index.match(pattern.index))
        errors.push("Индекс указан неверно");
    if (!Client.addressLocal.city.match(pattern.title))
        errors.push("Название населенного пункта неверно");
    if (!Client.addressLocal.street.match(pattern.title))
        errors.push("Адрес указан неверно");
    if (Client.legal == "org") {
        if (!((_a = Client.addressLegal) === null || _a === void 0 ? void 0 : _a.index.match(pattern.index)))
            errors.push("Индекс организации указан неверно");
        if (!((_b = Client.addressLegal) === null || _b === void 0 ? void 0 : _b.city.match(pattern.title)))
            errors.push("Название населенного пункта организации неверно");
        if (!((_c = Client.addressLegal) === null || _c === void 0 ? void 0 : _c.street.match(pattern.title)))
            errors.push("Адреса организации указан неверно");
        if (!((_d = Client.inn) === null || _d === void 0 ? void 0 : _d.match(pattern.inn)))
            errors.push("ИНН неверный");
    }
    if (Client.legal == "person" || Client.legal == "proprietor") {
        if (!((_e = Client.birthday) === null || _e === void 0 ? void 0 : _e.match(pattern.date)))
            errors.push("Дата рождения указана неверно");
        if (!((_f = Client.identity) === null || _f === void 0 ? void 0 : _f.series.match(pattern.series)))
            errors.push("Серия паспорта указана неверно");
        if (!((_g = Client.identity) === null || _g === void 0 ? void 0 : _g.number.match(pattern.index)))
            errors.push("Номер паспорта указан неверно");
        if (!((_h = Client.identity) === null || _h === void 0 ? void 0 : _h.issuer.match(pattern.title)))
            errors.push("Название организации, выдавшей паспорт неверно");
        if (!((_j = Client.identity) === null || _j === void 0 ? void 0 : _j.issued.match(pattern.date)))
            errors.push("Дата выдачи паспорта указана неверно");
    }
    return errors;
}
async function loadClientList() {
    let responce = await fetch("/api/get-users");
    return (await responce.json());
}
function updateClients(ClientsList) {
    for (let clid in ClientsList) {
        addClient(clid, ClientsList[clid].nameLocal);
    }
}
function addClient(clid, name) {
    var _a;
    let opt = document.createElement("option");
    opt.value = clid.toString();
    opt.innerHTML = `[${clid}]: ${name}`;
    opt.addEventListener("select", () => {
        hide("#clientForm");
    });
    (_a = document.querySelector("#clid")) === null || _a === void 0 ? void 0 : _a.append(opt);
}
export { getClientInfo, checkFormData, loadClientList, addClient, updateClients };
