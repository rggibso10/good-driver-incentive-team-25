import { defineBackend } from '@aws-amplify/backend';

import { getUsers } from './functions/print-database/resource';

defineBackend({
	getUsers
});
