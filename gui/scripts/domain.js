import { hide, show } from "./interface.js";
function getDomainInfo() {
    let Domain = {};
    if (document.querySelector("#did").value == "0") {
        let name = document.querySelector("#domainname").value;
        if (name.match(/[^0-9A-Za-z\.\-]/g))
            Domain.nameIdn = name;
        else
            Domain.name = name;
    }
    else {
        let nsservers = document.querySelector("#nservers").value;
        if (nsservers != "") {
            Domain.nservers = nsservers.split(",");
            Domain.delegated = false;
        }
    }
    return Domain;
}
async function loadDomainsList() {
    let responce = await fetch("/api/get-domains");
    return (await responce.json());
}
function updateDomains(DomainList) {
    var _a;
    for (let id in DomainList) {
        addDomain(DomainList[id].clid, id, (_a = DomainList[id].domain.nameIdn) !== null && _a !== void 0 ? _a : DomainList[id].domain.name);
    }
}
function addDomain(clid, id, name) {
    var _a;
    let opt = document.createElement("option");
    opt.value = id.toString();
    opt.setAttribute("data-clid", `${clid}`);
    opt.setAttribute("id", `domain-${id}`);
    opt.innerHTML = `[${id}]: ${name} (Клиент:${clid})`;
    opt.addEventListener("select", () => {
        hide("#domainRegister");
        show("#NSForm");
    });
    (_a = document.querySelector("#did")) === null || _a === void 0 ? void 0 : _a.append(opt);
}
export { getDomainInfo, loadDomainsList, updateDomains, addDomain };
