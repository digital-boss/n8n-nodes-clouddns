import { ICredentialType, INodeProperties } from "n8n-workflow";

export class ClouDnsApi implements ICredentialType {
	name = "clouDnsApi";
	displayName = "ClouDns API";
	documentationUrl = "clouDns";
	properties: INodeProperties[] = [
		// The credentials to get from user and save encrypted.
		// Properties can be defined exactly in the same way
		// as node properties.
		{
			displayName: "Auth ID",
			name: "authId",
			type: "string",
			default: "",
		},
		{
			displayName: "Auth Password",
			name: "authPassword",
			type: "string",
			typeOptions: {
				password: true,
			},
			default: "",
		},
	];
}
