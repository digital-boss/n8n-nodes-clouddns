import { IExecuteFunctions } from "n8n-core";

import {
	ICredentialsDecrypted,
	ICredentialTestFunctions,
	IDataObject,
	INodeCredentialTestResult,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
} from "n8n-workflow";

import { cloudDnsApiRequest } from "./GenericFunctions";

import { OptionsWithUri } from "request";

import { version } from "../version";
import { recordFields, recordOperations } from "./descriptions";
import { ClouDnsApi } from "../../credentials/ClouDnsApi.credentials"

export class ClouDns implements INodeType {
	description: INodeTypeDescription = {
		displayName: "ClouDns",
		name: "clouDns",
		icon: "file:clouDns.svg",
		group: ["transform"],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: `Consume Cloud Dns API (v.${version})`,
		defaults: {
			name: "ClouDns",
			color: "#1A82e2",
		},
		inputs: ["main"],
		outputs: ["main"],
		credentials: [
			{
				name: "clouDnsApi",
				required: true,
				// testedBy: 'testCloudDnsApiAuth',
			},
		],
		properties: [
			{
				displayName: "Resource",
				name: "resource",
				type: "options",
				options: [
					{
						name: "Records",
						value: "records",
					},
				],
				default: "records",
				required: true,
				description: "Resource to consume",
			},
			...recordOperations,
			...recordFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter("resource", 0) as string;
		const operation = this.getNodeParameter("operation", 0) as string;
		let body: IDataObject = {};
		let method = "";
		let endpoint = "";
		const qs: IDataObject = {};

		for (let i = 0; i < items.length; i++) {
			try {
				switch (resource) {
					case "records":
						switch (operation) {
							case "list":
								// ----------------------------------
								//        records:list
								// ----------------------------------
								Object.assign(qs, {
									"domain-name": this.getNodeParameter("domainName", i),
									...(this.getNodeParameter("additionalFields", i) as Object),
								});
								endpoint = "records";
								method = "GET";
								break;

							case "getRecordsPagesCount":
								// ----------------------------------
								//        records:getRecordsPagesCount
								// ----------------------------------
								Object.assign(qs, {
									"domain-name": this.getNodeParameter("domainName", i),
									...(this.getNodeParameter("additionalFields", i) as Object),
								});
								endpoint = "get-records-pages-count";
								method = "GET";

							case "create":
								// ----------------------------------
								//        records:create
								// ----------------------------------
								Object.assign(qs, {
									"domain-name": this.getNodeParameter("domainName", i),
									"record-type": this.getNodeParameter("recordType", i),
									record: this.getNodeParameter("record", i),
									ttl: this.getNodeParameter("ttl", i),
									...(this.getNodeParameter("additionalFields", i) as Object),
								});
								endpoint = "add-record";
								method = "GET";
								break;

							case "update":
								// ----------------------------------
								//        records:update
								// ----------------------------------
								Object.assign(qs, {
									"domain-name": this.getNodeParameter("domainName", i),
									"record-type": this.getNodeParameter("recordType", i),
									"record-id": this.getNodeParameter("recordId", i),
									record: this.getNodeParameter("record", i),
									ttl: this.getNodeParameter("ttl", i),
									...(this.getNodeParameter("additionalFields", i) as Object),
								});
								endpoint = "mod-record";
								method = "GET";
								break;

							case "delete":
								// ----------------------------------
								//        records:delete
								// ----------------------------------
								Object.assign(qs, {
									"domain-name": this.getNodeParameter("domainName", i),
									...(this.getNodeParameter("additionalFields", i) as Object),
								});
								endpoint = "delete-record";
								method = "GET";
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
					qs
				);

				if (!responseData) {
					responseData = { success: true };
				}

				if (responseData?.name === "Error") {
					throw new NodeApiError(this.getNode(), responseData);
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
