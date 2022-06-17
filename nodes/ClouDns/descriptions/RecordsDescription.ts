import { INodeProperties } from "n8n-workflow";

const recordAdditionalFields = [
	{
		displayName: "Host",
		name: "host",
		type: "string",
		default: "",
	},
	{
		displayName: "Priority",
		name: "priority",
		type: "number",
		default: 0,
	},
	{
		displayName: "Weight",
		name: "weight",
		type: "number",
		default: 0,
	},
	{
		displayName: "Port",
		name: "port",
		type: "number",
		default: 7000,
	},
	{
		displayName: "frame",
		name: "frame",
		type: "options",
		options: [
			{
				name: "0",
				value: 0,
			},
			{
				name: "1",
				value: 1,
			},
		],
		default: 0,
	},
	{
		displayName: "Frame title",
		name: "frameTitle",
		type: "string",
		default: "",
	},
	{
		displayName: "Frame title",
		name: "frameTitle",
		type: "string",
		default: "",
	},
	{
		displayName: "Frame Keywords ",
		name: "frameKeywords ",
		type: "string",
		default: "",
	},
	{
		displayName: "Frame Description",
		name: "frameDescription",
		type: "string",
		default: "",
	},
	{
		displayName: "Mobile meta",
		name: "mobileMeta",
		type: "number",
		default: 0,
	},
	{
		displayName: "Save path",
		name: "savePath",
		type: "options",
		options: [
			{
				name: "0",
				value: 0,
			},
			{
				name: "1",
				value: 1,
			},
		],
		default: 0,
	},
	{
		displayName: "Redirect type ",
		name: "redirectType ",
		type: "options",
		options: [
			{
				name: "301",
				value: 301,
			},
			{
				name: "302",
				value: 302,
			},
		],
		default: 301,
	},
	{
		displayName: "Mail",
		name: "mail",
		type: "string",
		default: "",
	},
	{
		displayName: "TXT",
		name: "txt",
		type: "string",
		default: "",
	},
	{
		displayName: "Algorithm",
		name: "algorithm",
		type: "number",
		default: 0,
	},
	{
		displayName: "Fptype",
		name: "fptype",
		type: "number",
		default: 0,
	},
	{
		displayName: "status",
		name: "status",
		type: "number",
		default: 0,
	},
	{
		displayName: "Geo DNS Location",
		name: "geodnsLocation",
		type: "number",
		default: 0,
	},
	{
		displayName: "CAA Flag",
		name: "caaFlag",
		type: "number",
		default: 0,
	},
	{
		displayName: "CAA Type",
		name: "caaType",
		type: "string",
		default: "",
	},
	{
		displayName: "CAA Value",
		name: "caaValue",
		type: "string",
		default: "",
	},
	{
		displayName: "TLSA Usage",
		name: "tlsaUsage",
		type: "string",
		default: "",
	},
	{
		displayName: "TLSA Usage",
		name: "tlsaUsage",
		type: "string",
		default: "",
	},
	{
		displayName: "TLSA Selector",
		name: "tlsaSelector",
		type: "string",
		default: "",
	},
	{
		displayName: "TLSA Matching Type",
		name: "tlsaMatchingType",
		type: "string",
		default: "",
	},
	{
		displayName: "Key Tag",
		name: "keyTag",
		type: "number",
		default: 0,
	},
	{
		displayName: "Digest Type",
		name: "digestType",
		type: "number",
		default: 0,
	},
	{
		displayName: "Order",
		name: "order",
		type: "string",
		default: "",
	},
	{
		displayName: "Pref",
		name: "pref",
		type: "string",
		default: "",
	},
	{
		displayName: "Flag",
		name: "flag",
		type: "number",
		default: 0,
	},
	{
		displayName: "Params",
		name: "params",
		type: "string",
		default: "",
	},
	{
		displayName: "Regexp",
		name: "regexp",
		type: "string",
		default: "",
	},
	{
		displayName: "Replace",
		name: "replace",
		type: "number",
		default: 0,
	},
	{
		displayName: "Cert Type",
		name: "certType",
		type: "number",
		default: 0,
	},
	{
		displayName: "Cert Key Tag",
		name: "certKeyTag",
		type: "number",
		default: 0,
	},
	{
		displayName: "Cert Algorithm",
		name: "certAlgorithm",
		type: "number",
		default: 0,
	},
] as INodeProperties[];

const recordAttributes = (operation: string) =>
	[
		{
			displayName: "Domain name",
			name: "domainName",
			type: "string",
			required: true,
			displayOptions: {
				show: {
					resource: ["records"],
					operation: [operation],
				},
			},
			default: "",
			description:
				"Domain name or reverse zone name whose record you want to see",
		},
		{
			displayName: "Record Type",
			name: "recordType",
			type: "string",
			required: true,
			displayOptions: {
				show: {
					resource: ["records"],
					operation: [operation],
				},
			},
			default: "",
			description:
				"A, AAAA, MX, CNAME, TXT, NS, SRV, WR, RP, SSHFP, ALIAS, CAA, TLSA, CERT, DS for domain names, NS and PTR for reversed zones, and NAPTR, NS, CNAME for ENUM zones",
		},
		{
			displayName: "Record",
			name: "record",
			type: "string",
			required: true,
			displayOptions: {
				show: {
					resource: ["records"],
					operation: [operation],
				},
			},
			default: "",
			description:
				"Record you want to add. Example 10.10.10.10 or cname.cloudns.net",
		},
		{
			displayName: "TTL",
			name: "ttl",
			type: "number",
			required: true,
			displayOptions: {
				show: {
					resource: ["records"],
					operation: [operation],
				},
			},
			default: 60,
			description: `Available TTL's:
60 = 1 minute
300 = 5 minutes
900 = 15 minutes
1800 = 30 minutes
3600 = 1 hour
21600 = 6 hours
43200 = 12 hours
86400 = 1 day
172800 = 2 days
259200 = 3 days
604800 = 1 week
1209600 = 2 weeks
2592000 = 1 month`,
		},
		{
			displayName: "Additional Fields",
			name: "additionalFields",
			type: "collection",
			placeholder: "Add Field",
			default: {},
			displayOptions: {
				show: {
					resource: ["records"],
					operation: [operation],
				},
			},
			options: recordAdditionalFields,
		},
	] as INodeProperties[];

export const recordOperations: INodeProperties[] = [
	{
		displayName: "Operation",
		name: "operation",
		type: "options",
		displayOptions: {
			show: {
				resource: ["records"],
			},
		},
		options: [
			{
				name: "List",
				value: "list",
				description: "List of records in the domain zone",
			},
			{
				name: "Get Records Pages Count",
				value: "getRecordsPagesCount",
				description: "Get records pages count in the domain zone",
			},
			{
				name: "Get Records Count",
				value: "getRecordsCount",
				description: "Get the records count in the domain zone",
			},
			{
				name: "Get Available Types",
				value: "getAvaiableTypes",
				description: "Get the available record types you can set up.",
			},
			{
				name: "Get Available TTL",
				value: "getAvaiableTtl",
				description:
					"Get the available TTL you can set up for the DNS records.",
			},
			{
				name: "Get Dynamic URL",
				value: "getDynamicUrl",
				description: "Getting SOA details.",
			},
			{
				name: "Get SOA Details",
				value: "getSoaDetails",
				description: "Export a record",
			},
			{
				name: "Modify SOA Details",
				value: "modifySoaDetails",
				description: "Modify SOA details.",
			},
			{
				name: "Create",
				value: "create",
				description: "Add new record to domain zone.",
			},
			{
				name: "Update",
				value: "update",
				description: "Modify record in domain zone.",
			},
			{
				name: "Delete",
				value: "delete",
				description: "Delete record of your domain zone.",
			},
			{
				name: "Copy",
				value: "copy",
				description: "Copies all the records from a specified zone.",
			},
			{
				name: "Import",
				value: "import",
				description: "Import records",
			},
			{
				name: "Import Via Transfer",
				value: "importViaTransfer",
				description: "Imports records from another server via zone transfer",
			},
			{
				name: "Export",
				value: "export",
				description: "Export the zone records in bind format.",
			},
			{
				name: "Change status",
				value: "changeStatus",
				description: "Changes the status of the record to active or inactive",
			},
		],
		default: "list",
		description: "The operation to perform",
	},
];

export const recordFields: INodeProperties[] = [
	/*-------------------------------------------------------------------------- */
	/*                                records:list                               */
	/* ------------------------------------------------------------------------- */
	{
		displayName: "Domain Name",
		name: "domainName",
		type: "string",
		required: true,
		displayOptions: {
			show: {
				resource: ["records"],
				operation: ["list"],
			},
		},
		default: "",
		description:
			"Domain name or reverse zone name whose record you want to see",
	},
	{
		displayName: "Additional Fields",
		name: "additionalFields",
		type: "collection",
		placeholder: "Add Field",
		default: {},
		displayOptions: {
			show: {
				resource: ["records"],
				operation: ["list"],
			},
		},
		options: [
			{
				displayName: "Host",
				name: "host",
				type: "string",
				default: "",
			},
			{
				displayName: "Host like",
				name: "hostLike",
				type: "string",
				default: "",
			},
			{
				displayName: "Type",
				name: "type",
				type: "string",
				default: "",
			},
			{
				displayName: "Rows per page",
				name: "rowsPerPage",
				type: "number",
				default: 10,
			},
			{
				displayName: "Page",
				name: "Page",
				type: "number",
				default: 1,
			},
			{
				displayName: "Order By",
				name: "orderBy",
				type: "string",
				default: "",
			},
		],
	},

	/*-------------------------------------------------------------------------- */
	/*                                records:getRecordsPagesCount               */
	/* ------------------------------------------------------------------------- */
	{
		displayName: "Domain Name",
		name: "domainName",
		type: "string",
		required: true,
		displayOptions: {
			show: {
				resource: ["records"],
				operation: ["getRecordsPagesCount"],
			},
		},
		default: "",
		description:
			"Domain name or reverse zone name whose record you want to see",
	},
	{
		displayName: "Additional Fields",
		name: "additionalFields",
		type: "collection",
		placeholder: "Add Field",
		default: {},
		displayOptions: {
			show: {
				resource: ["records"],
				operation: ["getRecordsPagesCount"],
			},
		},
		options: [
			{
				displayName: "Host",
				name: "host",
				type: "string",
				default: "",
			},
			{
				displayName: "Type",
				name: "type",
				type: "string",
				default: "",
			},
			{
				displayName: "Rows per page",
				name: "rowsPerPage",
				type: "number",
				default: 10,
			},
		],
	},

	/*-------------------------------------------------------------------------- */
	/*                                records:create                             */
	/* ------------------------------------------------------------------------- */
	...recordAttributes("create"),
	/*-------------------------------------------------------------------------- */
	/*                                records:delete                             */
	/* ------------------------------------------------------------------------- */
	{
		displayName: "Domain Name",
		name: "domainName",
		type: "string",
		required: true,
		displayOptions: {
			show: {
				resource: ["records"],
				operation: ["delete"],
			},
		},
		default: "",
		description:
			"Domain name or reverse zone name whose record you want to see",
	},

	{
		displayName: "Record ID",
		name: "recordId",
		type: "string",
		required: true,
		displayOptions: {
			show: {
				resource: ["records"],
				operation: ["delete"],
			},
		},
		default: "",
		description: "Record ID. You can see this ID with the method List records",
	},
	/*-------------------------------------------------------------------------- */
	/*                                records:update                             */
	/* ------------------------------------------------------------------------- */
	{
		displayName: "Record ID",
		name: "recordId",
		type: "string",
		required: true,
		displayOptions: {
			show: {
				resource: ["records"],
				operation: ["update"],
			},
		},
		default: "",
		description: "Record ID. You can see this ID with the method List records",
	},
	...recordAttributes("update"),
];
