import { INodeProperties } from 'n8n-workflow';

const recordAdditionalFields = [
	{
		displayName: 'Host',
		name: 'host',
		type: 'string',
		default: '',
		description: 'host / subdomain',
	},
	{
		displayName: 'Priority',
		name: 'priority',
		type: 'number',
		default: 0,
		description: 'Priority for MX or SRV record',
	},
	{
		displayName: 'Weight',
		name: 'weight',
		type: 'number',
		default: 0,
		description: 'Weight for SRV record',
	},
	{
		displayName: 'Port',
		name: 'port',
		type: 'number',
		default: 7000,
		description: 'Port for SRV record',
	},
	{
		displayName: 'Frame',
		name: 'frame',
		type: 'options',
		options: [
			{
				name: '0',
				value: 0,
			},
			{
				name: '1',
				value: 1,
			},
		],
		default: 0,
		description: '0 or 1 for Web redirects to disable or enable frame',
	},
	{
		displayName: 'Frame Title',
		name: 'frameTitle',
		type: 'string',
		default: '',
		description: 'Title if frame is enabled in Web redirects',
	},
	{
		displayName: 'Frame Keywords',
		name: 'frameKeywords ',
		type: 'string',
		default: '',
		description: 'Keywords if frame is enabled in Web redirects',
	},
	{
		displayName: 'Frame Description',
		name: 'frameDescription',
		type: 'string',
		default: '',
		description: 'Description if frame is enabled in Web redirects',
	},
	{
		displayName: 'Mobile Meta',
		name: 'mobileMeta',
		type: 'number',
		default: 0,
		description:
			'Mobile responsive meta tags if Web redirects with frame is enabled. Default value - 0.',
	},
	{
		displayName: 'Save Path',
		name: 'savePath',
		type: 'options',
		options: [
			{
				name: '0',
				value: 0,
			},
			{
				name: '1',
				value: 1,
			},
		],
		default: 0,
		description: '0 or 1 for Web redirects',
	},
	{
		displayName: 'Redirect Type',
		name: 'redirectType',
		type: 'options',
		options: [
			{
				name: '301',
				value: 301,
			},
			{
				name: '302',
				value: 302,
			},
		],
		default: 301,
		description: '301 or 302 for Web redirects if frame is disabled',
	},
	{
		displayName: 'Mail',
		name: 'mail',
		type: 'string',
		default: '',
		description: 'E-mail address for RP records',
	},
	{
		displayName: 'TXT',
		name: 'txt',
		type: 'string',
		default: '',
		description: 'Domain name for TXT record used in RP records',
	},
	{
		displayName: 'Algorithm',
		name: 'algorithm',
		type: 'number',
		default: 0,
		description:
			'Algorithm used to create the SSHFP fingerprint. Required for SSHFP records only.',
	},
	{
		displayName: 'Fptype',
		name: 'fptype',
		type: 'number',
		default: 0,
		description:
			'Type of the SSHFP algorithm. Required for SSHFP records only.',
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'number',
		default: 0,
		description:
			'Set to 1 to create the record active or to 0 to create it inactive. If omitted the record will be created active.',
	},
	{
		displayName: 'Geo Dns Location',
		name: 'geodnsLocation',
		type: 'number',
		default: 0,
		description:
			'ID of a GeoDNS location for A, AAAA, CNAME, NAPTR or SRV record. The GeoDNS locations can be obtained with List GeoDNS locations',
	},
	{
		displayName: 'Caa Flag',
		name: 'caaFlag',
		type: 'number',
		default: 0,
		description: '0 - Non critical or 128 - Critical',
	},
	{
		displayName: 'Caa Type',
		name: 'caaType',
		type: 'string',
		default: '',
		description:
			'Type of CAA record. The available flags are issue, issuewild, iodef.',
	},
	{
		displayName: 'Caa Value',
		name: 'caaValue',
		type: 'string',
		default: '',
		description: `If caa_type is issue, caa_value can be hostname or ";". If caa_type is issuewild, it can be hostname or ";". If caa_type is iodef, it can be "mailto:someemail@address.tld, http://example.tld or http://example.tld.`,
	},
	{
		displayName: 'Tlsa Usage',
		name: 'tlsaUsage',
		type: 'string',
		default: '',
		description:
			'(From 0 to 3) It shows the provided association that will be used.',
	},
	{
		displayName: 'Tlsa Selector',
		name: 'tlsaSelector',
		type: 'string',
		default: '',
		description:
			'(From 0 to 1) It specifies which part of the TLS certificate presented by the server will be matched against the association data.',
	},
	{
		displayName: 'Tlsa Matching Type',
		name: 'tlsaMatchingType',
		type: 'string',
		default: '',
		description:
			'(From 0 to 2) It specifies how the certificate association is presented.',
	},
	{
		displayName: 'Key Tag',
		name: 'keyTag',
		type: 'number',
		default: 0,
		description:
			'A numeric value used for identifying the referenced DS record.',
	},
	{
		displayName: 'Digest Type',
		name: 'digestType',
		type: 'number',
		default: 0,
		description:
			'The cryptographic hash algorithm is used to create the Digest value.',
	},
	{
		displayName: 'Order',
		name: 'order',
		type: 'string',
		default: '',
		description:
			'Specifies the order in which multiple NAPTR records must be processed (low to high).',
	},
	{
		displayName: 'Pref',
		name: 'pref',
		type: 'string',
		default: '',
		description:
			'Specifies the order (low to high) in which NAPTR records with equal Order values should be processed.',
	},
	{
		displayName: 'Flag',
		name: 'flag',
		type: 'number',
		default: 0,
		description:
			'Controls aspects of the rewriting and interpretation of the fields in the record.',
	},
	{
		displayName: 'Params',
		name: 'params',
		type: 'string',
		default: '',
		description:
			'Specifies the service parameters applicable to this delegation path.',
	},
	{
		displayName: 'Regexp',
		name: 'regexp',
		type: 'string',
		default: '',
		description:
			'Contains a substitution expression that is applied to the original string, held by the client in order to construct the next domain name to lookup.',
	},
	{
		displayName: 'Replace',
		name: 'replace',
		type: 'number',
		default: 0,
		description:
			'Specifies the next domain name (fully qualified) to query for depending on the potential values found in the flags field.',
	},
	{
		displayName: 'Cert Type',
		name: 'certType',
		type: 'number',
		default: 0,
		description: 'Type of the Certificate/CRL.',
	},
	{
		displayName: 'Cert Key Tag',
		name: 'certKeyTag',
		type: 'number',
		default: 0,
		description:
			'A numeric value (0-65535), used the efficiently pick a CERT record.',
	},
	{
		displayName: 'Cert Algorithm',
		name: 'certAlgorithm',
		type: 'number',
		default: 0,
		description:
			'Identifies the algorithm, used to produce a legitimate signature.',
	},
] as INodeProperties[];

const recordAttributes = (operation: string) =>
	[
		{
			displayName: 'Domain Name',
			name: 'domainName',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['records'],
					operation: [operation],
				},
			},
			default: '',
			description:
				'Domain name or reverse zone name whose record you want to see',
		},
		{
			displayName: 'Record Type',
			name: 'recordType',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['records'],
					operation: [operation],
				},
			},
			default: '',
			description:
				'A, AAAA, MX, CNAME, TXT, NS, SRV, WR, RP, SSHFP, ALIAS, CAA, TLSA, CERT, DS for domain names, NS and PTR for reversed zones, and NAPTR, NS, CNAME for ENUM zones',
		},
		{
			displayName: 'Record',
			name: 'record',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['records'],
					operation: [operation],
				},
			},
			default: '',
			description:
				'Record you want to add. Example 10.10.10.10 or cname.cloudns.net',
		},
		{
			displayName: 'TTL',
			name: 'ttl',
			type: 'number',
			required: true,
			displayOptions: {
				show: {
					resource: ['records'],
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
			displayName: 'Additional Fields',
			name: 'additionalFields',
			type: 'collection',
			placeholder: 'Add Field',
			default: {},
			displayOptions: {
				show: {
					resource: ['records'],
					operation: [operation],
				},
			},
			options: recordAdditionalFields,
		},
		{
			displayName: 'Simplify Output',
			name: 'simplifyOutput',
			type: 'boolean',
			required: false,
			displayOptions: {
				show: {
					resource: ['records'],
					operation: [operation],
				},
			},
			default: false,
			description: 'Wheather to simplify the returned data',
		},
	] as INodeProperties[];

export const recordOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['records'],
			},
		},
		options: [
			{
				name: 'List',
				value: 'list',
				description: 'List of records in the domain zone',
			},
			{
				name: 'Get Records Pages Count',
				value: 'getRecordsPagesCount',
				description: 'Get records pages count in the domain zone',
			},
			// {
			// 	name: "Get Records Count",
			// 	value: "getRecordsCount",
			// 	description: "Get the records count in the domain zone",
			// },
			// {
			// 	name: "Get Available Types",
			// 	value: "getAvaiableTypes",
			// 	description: "Get the available record types you can set up.",
			// },
			// {
			// 	name: "Get Available TTL",
			// 	value: "getAvaiableTtl",
			// 	description:
			// 		"Get the available TTL you can set up for the DNS records.",
			// },
			// {
			// 	name: "Get Dynamic URL",
			// 	value: "getDynamicUrl",
			// 	description: "Getting SOA details.",
			// },
			// {
			// 	name: "Get SOA Details",
			// 	value: "getSoaDetails",
			// 	description: "Export a record",
			// },
			// {
			// 	name: "Modify SOA Details",
			// 	value: "modifySoaDetails",
			// 	description: "Modify SOA details.",
			// },
			{
				name: 'Create',
				value: 'create',
				description: 'Add new record to domain zone.',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Modify record in domain zone.',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete record of your domain zone.',
			},
			// {
			// 	name: "Copy",
			// 	value: "copy",
			// 	description: "Copies all the records from a specified zone.",
			// },
			// {
			// 	name: "Import",
			// 	value: "import",
			// 	description: "Import records",
			// },
			// {
			// 	name: "Import Via Transfer",
			// 	value: "importViaTransfer",
			// 	description: "Imports records from another server via zone transfer",
			// },
			// {
			// 	name: "Export",
			// 	value: "export",
			// 	description: "Export the zone records in bind format.",
			// },
			// {
			// 	name: "Change status",
			// 	value: "changeStatus",
			// 	description: "Changes the status of the record to active or inactive",
			// },
		],
		default: 'list',
		description: 'The operation to perform',
	},
];

export const recordFields: INodeProperties[] = [
	/*-------------------------------------------------------------------------- */
	/*                                records:list                               */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Domain Name',
		name: 'domainName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['records'],
				operation: ['list'],
			},
		},
		default: '',
		description:
			'Domain name or reverse zone name whose record you want to see',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['records'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Host',
				name: 'host',
				type: 'string',
				default: '',
				description: 'Host of the records you want to list',
			},
			{
				displayName: 'Host Like',
				name: 'hostLike',
				type: 'string',
				default: '',
				description:
					'Optional parameter for a non-exact match search. If this parameter is in use, host parameter will be ignored.',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'string',
				default: '',
				description: 'Type of the records you want to list (record types)',
			},
			{
				displayName: 'Rows Per Page',
				name: 'rowsPerPage',
				type: 'number',
				default: 10,
				description: 'Results per page. Can be 10, 20, 30, 50 or 100',
			},
			{
				displayName: 'Page',
				name: 'Page',
				type: 'number',
				default: 1,
				description: 'The page number you want to check',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'string',
				default: '',
				description:
					'Optional parameter for sorting the records. Can be either host or points-to.',
			},
		],
	},
	{
		displayName: 'Simplify Output',
		name: 'simplifyOutput',
		type: 'boolean',
		required: false,
		displayOptions: {
			show: {
				resource: ['records'],
				operation: ['list'],
			},
		},
		default: false,
		description: 'Wheather to simplify the returned data',
	},

	/*-------------------------------------------------------------------------- */
	/*                                records:getRecordsPagesCount               */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Domain Name',
		name: 'domainName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['records'],
				operation: ['getRecordsPagesCount'],
			},
		},
		default: '',
		description:
			'Domain name or reverse zone name whose record you want to see',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['records'],
				operation: ['getRecordsPagesCount'],
			},
		},
		options: [
			{
				displayName: 'Host',
				name: 'host',
				type: 'string',
				default: '',
				description: 'Host of the records you want to list',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'string',
				default: '',
				description: 'Type of the records you want to list (record types)',
			},
			{
				displayName: 'Rows per page',
				name: 'rowsPerPage',
				type: 'number',
				default: 10,
				description: 'Results per page. Can be 10, 20, 30, 50 or 100',
			},
		],
	},
	{
		displayName: 'Simplify Output',
		name: 'simplifyOutput',
		type: 'boolean',
		required: false,
		displayOptions: {
			show: {
				resource: ['records'],
				operation: ['getRecordsPagesCount'],
			},
		},
		default: false,
		description: 'Wheather to simplify the returned data',
	},

	/*-------------------------------------------------------------------------- */
	/*                                records:create                             */
	/* ------------------------------------------------------------------------- */
	...recordAttributes('create'),
	/*-------------------------------------------------------------------------- */
	/*                                records:delete                             */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Domain Name',
		name: 'domainName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['records'],
				operation: ['delete'],
			},
		},
		default: '',
		description:
			'Domain name or reverse zone name whose record you want to see',
	},

	{
		displayName: 'Record ID',
		name: 'recordId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['records'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'Record ID. You can see this ID with the method List records',
	},
	{
		displayName: 'Simplify Output',
		name: 'simplifyOutput',
		type: 'boolean',
		required: false,
		displayOptions: {
			show: {
				resource: ['records'],
				operation: ['delete'],
			},
		},
		default: false,
		description: 'Wheather to simplify the returned data',
	},
	/*-------------------------------------------------------------------------- */
	/*                                records:update                             */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Record ID',
		name: 'recordId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['records'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Record ID. You can see this ID with the method List records',
	},
	...recordAttributes('update'),
];
