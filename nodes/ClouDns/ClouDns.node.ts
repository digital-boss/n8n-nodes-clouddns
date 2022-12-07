import { IExecuteFunctions } from 'n8n-core';

import {
	ICredentialsDecrypted,
	ICredentialTestFunctions,
	IDataObject,
	INodeCredentialTestResult,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	LoggerProxy,
	NodeApiError,
} from 'n8n-workflow';

import { cloudDnsApiRequest, simplify } from './GenericFunctions';

import { OptionsWithUri } from 'request';

import { version } from '../version';
import { recordFields, recordOperations } from './descriptions';
import { ClouDnsApi } from '../../credentials/ClouDnsApi.credentials';

export class ClouDns implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ClouDns',
		name: 'clouDns',
		icon: 'file:clouDns.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: `Consume Cloud Dns API (v.${version})`,
		defaults: {
			name: 'ClouDns',
			color: '#FF6000',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'clouDnsApi',
				required: true,
				testedBy: 'testClouDnsApiAuth',
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Records',
						value: 'records',
					},
				],
				default: 'records',
				required: true,
				description: 'Resource to consume',
			},
			...recordOperations,
			...recordFields,
		],
	};

	methods = {
		credentialTest: {
			async testClouDnsApiAuth(
				this: ICredentialTestFunctions,
				credential: ICredentialsDecrypted,
			): Promise<INodeCredentialTestResult> {
				// https://docs.sendgrid.com/api-reference/users-api/retrieve-your-username
				const options: OptionsWithUri = {
					method: 'GET',
					headers: {},
					qs: {
						'auth-id': credential.data?.authId,
						'auth-password': credential.data?.authPassword,
					},
					uri: 'https://api.cloudns.net/login/login.json',
					json: true,
				};

				try {
					const response = await this.helpers.request(options);

					if (response.status === 'Failed') {
						return {
							status: 'Error',
							message: `${response.statusDescription}`,
						};
					}
				} catch (err) {
					return {
						status: 'Error',
						message: `${err.message}`,
					};
				}

				return {
					status: 'OK',
					message: 'Connection successful!',
				};
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const body: IDataObject = {};
		let method = '';
		let endpoint = '';
		const qs: IDataObject = {};

		for (let i = 0; i < items.length; i++) {
			try {
				switch (resource) {
					case 'records':
						switch (operation) {
							case 'list':
								// ----------------------------------
								//        records:list
								// ----------------------------------
								Object.assign(qs, {
									'domain-name': this.getNodeParameter('domainName', i),
									...(this.getNodeParameter('additionalFields', i) as {}),
								});
								endpoint = 'records';
								method = 'GET';
								break;

							case 'getRecordsPagesCount':
								// ----------------------------------
								//        records:getRecordsPagesCount
								// ----------------------------------
								Object.assign(qs, {
									'domain-name': this.getNodeParameter('domainName', i),
									...(this.getNodeParameter('additionalFields', i) as {}),
								});
								endpoint = 'get-records-pages-count';
								method = 'GET';
								break;

							case 'create':
								// ----------------------------------
								//        records:create
								// ----------------------------------
								Object.assign(qs, {
									'domain-name': this.getNodeParameter('domainName', i),
									'record-type': this.getNodeParameter('recordType', i),
									record: this.getNodeParameter('record', i),
									ttl: this.getNodeParameter('ttl', i),
									...(this.getNodeParameter('additionalFields', i) as {}),
								});
								endpoint = 'add-record';
								method = 'GET';
								break;

							case 'update':
								// ----------------------------------
								//        records:update
								// ----------------------------------
								Object.assign(qs, {
									'domain-name': this.getNodeParameter('domainName', i),
									'record-type': this.getNodeParameter('recordType', i),
									'record-id': this.getNodeParameter('recordId', i),
									record: this.getNodeParameter('record', i),
									ttl: this.getNodeParameter('ttl', i),
									...(this.getNodeParameter('additionalFields', i) as {}),
								});
								endpoint = 'mod-record';
								method = 'GET';
								break;

							case 'delete':
								// ----------------------------------
								//        records:delete
								// ----------------------------------
								Object.assign(qs, {
									'domain-name': this.getNodeParameter('domainName', i),
									'record-id': this.getNodeParameter('recordId', i),
								});
								endpoint = 'delete-record';
								method = 'GET';
								break;

							default:
								break;
						}
						break;

					default:
						break;
				}

				responseData = await cloudDnsApiRequest.call(
					this,
					method,
					endpoint,
					body,
					qs,
				);

				if (typeof responseData === 'number') {
					responseData = { value: responseData };
				}

				if (!responseData || Object.keys(responseData).length === 0) {
					responseData = { success: true };
				}

				if (responseData.status === 'Failed') {
					throw new NodeApiError(this.getNode(), responseData);
				}

				if (this.getNodeParameter('simplifyOutput', 0)) {
					responseData = simplify(responseData, operation);
				}

				if (Array.isArray(responseData)) {
					returnData.push.apply(returnData, responseData as IDataObject[]);
				} else if (responseData !== undefined && responseData !== null) {
					returnData.push(responseData as IDataObject);
				} else {
					returnData.push({} as IDataObject);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
