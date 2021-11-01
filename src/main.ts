import {oplog} from "./interface.js";
import {IResponce, IDomainsList, IClientsList} from "./types.js";
import {getClientInfo, checkFormData, loadClientList, updateClients, addClient} from "./client.js";
import {getDomainInfo, loadDomainsList, updateDomains, addDomain} from "./domain.js";
import * as API from "./api.js";

let ClientList: IClientsList, DomainsList: IDomainsList;
(async () => {
	ClientList = await loadClientList();
	updateClients(ClientList);
	DomainsList = await loadDomainsList();
	updateDomains(DomainsList);
})();

(<HTMLButtonElement>document.querySelector("#register")).addEventListener("click", async () => {
	let clid: number = (<any>(<HTMLSelectElement>document.querySelector("#clid")).value) as number;
	if (clid == 0) {
		let Client = getClientInfo();
		let errors = checkFormData(Client);
		if (errors.length) {
			oplog(["Не могу регистрировать клиента:", ...errors]);
			return;
		} else {
			oplog(["Регистрирую данные нового клиента ..."]);
			let responce: IResponce = await API.clientCreate(Client);
			if (responce.result) {
				clid = responce.result?.id as number;
				addClient(clid, Client.nameLocal);
				let handle: string = responce.result?.handle as string;
				setTimeout(async () => {
					responce = await API.taskStatus(handle);
					if (responce.result?.status == "success") oplog([`Клиент зарегистрирован (id=${clid})`]);
					else oplog([`Клиент в процессе регистрации ... (id=${clid})`]);
				}, 3000);
			} else oplog([`Ошибка:${responce.error?.message}`]);
		}
	}
	let Domain = getDomainInfo();
	let domainName = Domain.name ?? Domain.nameIdn;
	if (!domainName?.match(/^[a-zа-яё0-9_\-\.]+$/gi)) {
		oplog(["Не могу отправить домен на регистрацию:", "Имя домена неверное"]);
	} else {
		oplog(["Регистрирую новый домен ..."]);
		let responce: IResponce = await API.domainCreate(clid, Domain);
		if (responce.result) {
			let id = responce.result?.id as number;
			addDomain(clid, id, Domain.name ?? Domain.nameIdn!);
			let handle: string = responce.result?.handle as string;
			setTimeout(async () => {
				responce = await API.taskStatus(handle);
				if (responce.result?.status == "success") oplog([`Домен зарегистрирован (id=${id})`]);
				else oplog([`Домен в процессе регистрации ... (id=${id})`]);
			}, 5000);
		} else oplog([`Ошибка:${responce.error?.message}`]);
	}
});

(<HTMLButtonElement>document.querySelector("#update")).addEventListener("click", async () => {
	oplog(["Обновляю данные домена ..."]);
	let id: number = (<any>(<HTMLSelectElement>document.querySelector("#did")).value) as number;
	let clid: number = (<any>(<HTMLOptionElement>document.querySelector(`#domain-${id}`)).getAttribute("data-clid")) as number;
	let Domain = getDomainInfo();
	let responce: IResponce = await API.domainUpdate(clid, id, Domain);
	if (responce.result) {
		let id = responce.result?.id as number;
		let handle: string = responce.result?.handle as string;
		setTimeout(async () => {
			responce = await API.taskStatus(handle);
			if (responce.result?.status == "success") oplog([`Данные обновлены (id=${id})`]);
			else oplog([`Данные обновляются ... (id=${id})`]);
		}, 3000);
	} else oplog([`Ошибка:${responce.error?.message}`]);
});
