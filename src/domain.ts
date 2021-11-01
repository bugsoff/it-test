import {hide, show} from "./interface.js";
import {IDomain, IDomainsList} from "./types.js";

function getDomainInfo(): IDomain {
	let Domain: IDomain = {};
	if ((<HTMLSelectElement>document.querySelector("#did")).value == "0") {
		let name: string = (<HTMLInputElement>document.querySelector("#domainname")).value as string;
		if (name.match(/[^0-9A-Za-z\.\-]/g)) Domain.nameIdn = name;
		else Domain.name = name;
	} else {
		let nsservers: string = (<HTMLInputElement>document.querySelector("#nservers")).value;
		if (nsservers != "") {
			Domain.nservers = nsservers.split(",");
			Domain.delegated = false;
		}
	}
	return Domain;
}

async function loadDomainsList(): Promise<IDomainsList> {
	let responce = await fetch("/api/get-domains");
	return (await responce.json()) as IDomainsList;
}

function updateDomains(DomainList: IDomainsList) {
	for (let id in DomainList) {
		addDomain(DomainList[id].clid, (<any>id) as number, DomainList[id].domain.nameIdn ?? DomainList[id].domain.name!);
	}
}

function addDomain(clid: number, id: number, name: string) {
	let opt: HTMLOptionElement = document.createElement("option");
	opt.value = id.toString();
	opt.setAttribute("data-clid", `${clid}`);
	opt.setAttribute("id", `domain-${id}`);
	opt.innerHTML = `[${id}]: ${name} (Клиент:${clid})`;
	opt.addEventListener("select", () => {
		hide("#domainRegister");
		show("#NSForm");
	});

	document.querySelector("#did")?.append(opt);
}

export {getDomainInfo, loadDomainsList, updateDomains, addDomain};
