import { OptionsWithUri } from 'request';

import {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
} from 'n8n-core';

import { IDataObject, NodeApiError, NodeOperationError } from 'n8n-workflow';

export async function cloudDnsApiRequest(
	this:
		| IHookFunctions
		| IExecuteFunctions
		| IExecuteSingleFunctions
		| ILoadOptionsFunctions,
	method: string,
	endpoint: string,
	body: object = {},
	qs: object = {},
	uri?: string,
): Promise<any> {
	// tslint:disable-line:no-any

	//Get credentials the user provided for this node
	const credentials = (await this.getCredentials('clouDnsApi')) as IDataObject;

	if (credentials === undefined) {
		throw new NodeOperationError(
			this.getNode(),
			'No credentials got returned!',
		);
	}

	//Make http request according to <https://sendgrid.com/docs/api-reference/>
	const options: OptionsWithUri = {
		method,
		headers: {},
		qs: {
			'auth-id': credentials.authId,
			'auth-password': credentials.authPassword,
			...qs,
		},
		body,
		uri: uri || `https://api.cloudns.net/dns/${endpoint}.json`,
		json: true,
	};

	if (Object.keys(options.qs).length === 0) {
		delete options.qs;
	}
	if (Object.keys(options.body).length === 0) {
		delete options.body;
	}

	try {
		return this.helpers.request!(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

export function simplify(jsonData: IDataObject, operation: string): IDataObject[] {
	if (operation === 'list') {
		return Object.values(jsonData as object);
	}

	return (jsonData['data'] as IDataObject[]) || jsonData;;
}
