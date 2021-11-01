interface IAddress {
	country: string;
	index: string;
	city: string;
	street: string;
}

interface IIdentity {
	type: string;
	series: string;
	number: string;
	issuer: string;
	issued: string;
}

interface IClientInfo {
	legal: string;
	nameLocal: string;
	emails: string[];
	phones: string[];
	addressLocal: IAddress;
	birthday?: string;
	identity?: IIdentity;
	inn?: string;
	addressLegal?: IAddress;
}

interface IClientsList {
	[clid: string]: IClientInfo;
}

interface IDomain {
	name?: string;
	nameIdn?: string;
	nservers?: string[];
	delegated?: boolean;
}
interface IDomainsList {
	[id: number]: {clid: number; domain: IDomain};
}

interface IResponce {
	id: string;
	jsonrpc: string;
	result?: {handle?: string; id?: number; status?: string};
	error?: {code: number; message: string};
}

export {IAddress, IIdentity, IClientInfo, IDomain, IResponce, IDomainsList, IClientsList};
