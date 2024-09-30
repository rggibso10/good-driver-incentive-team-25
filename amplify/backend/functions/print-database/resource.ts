import { defineFunction } from '@aws-amplify/backend';

export const selectAllFromTable = defineFunction({
	name: 'selectAllFromTable',
	entry: './handler.ts'
});
