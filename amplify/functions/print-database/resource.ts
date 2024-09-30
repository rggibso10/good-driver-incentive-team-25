import { defineFunction } from '@aws-amplify/backend';

export const getUsers = defineFunction({
	name: 'getUsers',
	entry: './handler.ts'
});
