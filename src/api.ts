import {oplog} from "./interface.js";
import {IClientInfo, IDomain, IResponce} from "./types.js";

const api = {
	clientCreate: "/api/client-create",
	domainCreate: "/api/domain-create",
	domainUpdate: "/api/domain-update",
	taskStatus: "/api/task-status",
};

async function clientCreate(Client: IClientInfo): Promise<IResponce> {
	let responce = await fetch(api.clientCreate, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(Client),
	});
	return (await responce.json()) as IResponce;
}

async function domainCreate(clid: number, Domain: IDomain): Promise<IResponce> {
	let responce = await fetch(api.domainCreate, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({clid: clid, domain: Domain}),
	});
	return (await responce.json()) as IResponce;
}

async function domainUpdate(clid: number, id: number, Domain: IDomain): Promise<IResponce> {
	let responce = await fetch(api.domainUpdate, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({clid: clid, id: id, domain: Domain}),
	});
	return (await responce.json()) as IResponce;
}

async function taskStatus(handle: string): Promise<IResponce> {
	let responce = await fetch(api.taskStatus, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({handle: handle}),
	});
	return (await responce.json()) as IResponce;
}

async function retryStatus(handle: string, timeout: number): Promise<boolean | void> {
	if (timeout > 10000) {
		oplog(["Не дождался ответа от регистратора, прекращаю", "Результат операции неизвестен"]);
		return false;
	}
	setTimeout(async () => {
		oplog([`Ожидаю ${timeout / 1000} сек`]);
		let responce = await taskStatus(handle);
		if (responce.result?.status != "success") return retryStatus(handle, timeout + 1000);
		else return true;
	}, timeout);
}

export {clientCreate, domainCreate, domainUpdate, taskStatus, retryStatus};
