import {IAddress, IIdentity, IClientInfo, IClientsList} from "./types.js";
import {hide} from "./interface.js";

function getClientInfo(): IClientInfo {
	let Client: IClientInfo = {
		legal: (<HTMLInputElement>document.querySelector("#legalorg")).checked
			? "org"
			: (<HTMLInputElement>document.querySelector("#legalperson")).checked
			? "person"
			: (<HTMLInputElement>document.querySelector("#legalproprietor")).checked
			? "proprietor"
			: "",
		nameLocal: (<HTMLInputElement>document.querySelector("#nameLocal")).value,
		emails: (<HTMLInputElement>document.querySelector("#email")).value.split(","),
		phones: (<HTMLInputElement>document.querySelector("#phone")).value.split(","),
		addressLocal: {
			country: (<HTMLInputElement>document.querySelector("#country")).value,
			index: (<HTMLInputElement>document.querySelector("#index")).value,
			city: (<HTMLInputElement>document.querySelector("#city")).value,
			street: (<HTMLInputElement>document.querySelector("#street")).value,
		} as IAddress,
	};
	switch (Client.legal) {
		case "org": {
			Client.addressLegal = {
				country: (<HTMLInputElement>document.querySelector("#org_country")).value,
				index: (<HTMLInputElement>document.querySelector("#org_index")).value,
				city: (<HTMLInputElement>document.querySelector("#org_city")).value,
				street: (<HTMLInputElement>document.querySelector("#org_street")).value,
			};
			Client.inn = (<HTMLInputElement>document.querySelector("#inn")).value;
			break;
		}
		case "person":
		case "proprietor": {
			Client.birthday = (<HTMLInputElement>document.querySelector("#birthday")).value;
			Client.identity = {
				type: (<HTMLInputElement>document.querySelector("#type")).value,
				series: (<HTMLInputElement>document.querySelector("#series")).value,
				number: (<HTMLInputElement>document.querySelector("#number")).value,
				issuer: (<HTMLInputElement>document.querySelector("#issuer")).value,
				issued: (<HTMLInputElement>document.querySelector("#issued")).value,
			} as IIdentity;
			break;
		}
	}

	return Client;
}

function checkFormData(Client: IClientInfo): string[] {
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
	let errors: string[] = [];
	if (Client.legal == "") errors.push("Не выбран вид клиента");
	if (!Client.nameLocal.match(pattern.title)) errors.push("Имя (название) не верное");
	if (Client.emails.some(email => !email.match(pattern.email))) errors.push("Email адрес не верного формата");
	if (Client.phones.some(phone => !phone.match(pattern.phone)))
		errors.push("Телефон указывается в международном формате, например: +12 234 3456789");
	if (!Client.addressLocal.index.match(pattern.index)) errors.push("Индекс указан неверно");
	if (!Client.addressLocal.city.match(pattern.title)) errors.push("Название населенного пункта неверно");
	if (!Client.addressLocal.street.match(pattern.title)) errors.push("Адрес указан неверно");

	if (Client.legal == "org") {
		if (!Client.addressLegal?.index.match(pattern.index)) errors.push("Индекс организации указан неверно");
		if (!Client.addressLegal?.city.match(pattern.title)) errors.push("Название населенного пункта организации неверно");
		if (!Client.addressLegal?.street.match(pattern.title)) errors.push("Адреса организации указан неверно");
		if (!Client.inn?.match(pattern.inn)) errors.push("ИНН неверный");
	}
	if (Client.legal == "person" || Client.legal == "proprietor") {
		if (!Client.birthday?.match(pattern.date)) errors.push("Дата рождения указана неверно");
		if (!Client.identity?.series.match(pattern.series)) errors.push("Серия паспорта указана неверно");
		if (!Client.identity?.number.match(pattern.index)) errors.push("Номер паспорта указан неверно");
		if (!Client.identity?.issuer.match(pattern.title)) errors.push("Название организации, выдавшей паспорт неверно");
		if (!Client.identity?.issued.match(pattern.date)) errors.push("Дата выдачи паспорта указана неверно");
	}
	return errors;
}

async function loadClientList(): Promise<IClientsList> {
	let responce = await fetch("/api/get-users");
	return (await responce.json()) as IClientsList;
}

function updateClients(ClientsList: IClientsList) {
	for (let clid in ClientsList) {
		addClient((<any>clid) as number, ClientsList[clid].nameLocal);
	}
}

function addClient(clid: number, name: string) {
	let opt: HTMLOptionElement = document.createElement("option");
	opt.value = clid.toString();
	opt.innerHTML = `[${clid}]: ${name}`;
	opt.addEventListener("select", () => {
		hide("#clientForm");
	});
	document.querySelector("#clid")?.append(opt);
}

export {getClientInfo, checkFormData, loadClientList, addClient, updateClients};
