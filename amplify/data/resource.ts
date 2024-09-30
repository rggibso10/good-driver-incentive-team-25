import { type ClientSchema, a, defineData, defineFunction} from "@aws-amplify/backend"
import { getUsers } from "../functions/print-database/resource"

/*
const schema = a.schema({
	sayHello: a
	.query()
	.arguments({
		 name: a.string(),
	})
	.returns(a.string())
	.handler(a.handler.function(sayHello)),
})
*/

const schema = a.schema({
	getUsers: a
	.query()
	.arguments({
		table: a.string(),
	})
	.returns(a.json())
	.handler(a.handler.function(getUsers)),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
	schema,
	authorizationModes: {
		defaultAuthorizationMode: "iam",
	},
})
