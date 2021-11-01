/*Переключение новый клиент - существующий */
document.querySelector("#createNew").addEventListener("select", () => {
    hide("#clientInfo");
    show("#clientForm");
});
/* Переключение полей legal */
document.querySelector("#legalorg").addEventListener("change", () => {
    hide("#personForm");
    show("#orgForm");
});
document.querySelector("#legalperson").addEventListener("change", () => {
    hide("#orgForm");
    show("#personForm");
});
document.querySelector("#legalproprietor").addEventListener("change", () => {
    hide("#orgForm");
    show("#personForm");
});
/* Существующий клиент - скроем поля */
document.querySelector("#clid").addEventListener("change", () => {
    if (document.querySelector("#clid").value == "0") {
        show("#clientForm");
    }
    else {
        hide("#clientForm");
    }
});
/* Существущий домен - покажем поля для NS*/
document.querySelector("#did").addEventListener("change", () => {
    if (document.querySelector("#did").value == "0") {
        hide("#NSForm");
        show("#domainRegister");
    }
    else {
        hide("#domainRegister");
        show("#NSForm");
    }
});
export function show(selector) {
    document.querySelector(selector).className = "";
}
export function hide(selector) {
    document.querySelector(selector).className += " d-none";
}
export function clear(selector) {
    document.querySelector(selector).innerHTML = "";
}
export function oplog(messages) {
    if (messages.length)
        messages.forEach((msg, i) => {
            let p = document.createElement("p");
            p.className = "m-0 p-0";
            p.innerHTML = (!i ? '<span class="text-muted">' + new Date().toLocaleTimeString() + "</span> | " : "") + msg;
            document.querySelector("#oplog").append(p);
        });
}
