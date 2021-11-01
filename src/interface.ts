import {IClientInfo, IDomain} from "./types";

/*Переключение новый клиент - существующий */
(<HTMLOptionElement>document.querySelector("#createNew")).addEventListener("select", () => {
	hide("#clientInfo");
	show("#clientForm");
});

/* Переключение полей legal */
(<HTMLOptionElement>document.querySelector("#legalorg")).addEventListener("change", () => {
	hide("#personForm");
	show("#orgForm");
});
(<HTMLOptionElement>document.querySelector("#legalperson")).addEventListener("change", () => {
	hide("#orgForm");
	show("#personForm");
});
(<HTMLOptionElement>document.querySelector("#legalproprietor")).addEventListener("change", () => {
	hide("#orgForm");
	show("#personForm");
});

/* Существующий клиент - скроем поля */
(<HTMLSelectElement>document.querySelector("#clid")).addEventListener("change", () => {
	if ((<HTMLSelectElement>document.querySelector("#clid")).value == "0") {
		show("#clientForm");
	} else {
		hide("#clientForm");
	}
});

/* Существущий домен - покажем поля для NS*/
(<HTMLSelectElement>document.querySelector("#did")).addEventListener("change", () => {
	if ((<HTMLSelectElement>document.querySelector("#did")).value == "0") {
		hide("#NSForm");
		show("#domainRegister");
	} else {
		hide("#domainRegister");
		show("#NSForm");
	}
});

export function show(selector: string) {
	(<HTMLElement>document.querySelector(selector)).className = "";
}
export function hide(selector: string) {
	(<HTMLElement>document.querySelector(selector)).className += " d-none";
}
export function clear(selector: string) {
	(<HTMLElement>document.querySelector(selector)).innerHTML = "";
}

export function oplog(messages: string[]) {
	if (messages.length)
		messages.forEach((msg, i) => {
			let p: HTMLParagraphElement = document.createElement("p");
			p.className = "m-0 p-0";
			p.innerHTML = (!i ? '<span class="text-muted">' + new Date().toLocaleTimeString() + "</span> | " : "") + msg;
			(<HTMLDivElement>document.querySelector("#oplog")).append(p);
		});
}
