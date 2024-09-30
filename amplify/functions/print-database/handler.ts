import type { Handler } from 'aws-lambda';
import sys;
import logging;
import pymysql;
import json;
import os;
import { defineAuth, secret } from '@aws-amplify/backend'; //obtain secrets


//placed out side so that each call doesn't create
//a new connection
user_name = secret('DB_USERNAME');
password = secret('DB_PASSWORD');
rds = secret('DB_END_POINT');
db_name = secret('DB_NAME');

logger = logging.getLogger();
logger.setLevel(logging.INFO);

try:
	conn = pymysql.connect(host=rds, user=user_name, passwd=password, db=db_name, connect_timeout=5);
except pymysql.MySQLError as e:
	logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.");
	logger.error(e);
	sys.exit(1);

logger.info("SUCCESS: Connection to RDS for MySQL instance succeeded");

export const handler: Schema["getUsers"]["functionHandler"] = async (event) => {
	console.log(`EVENT: ${JSON.stringify(event)}`);
	const { table } = event.arguments;
	let response = buildResponse(400, "Request was not a GET");
	switch(true){
		case ${table} === "Driver":
			response = await selectAllFromTable("Driver");
		break;
		case ${table} === "Sponsor":
			response = await selectAllFromTable("Sponsor");
		break;
		case ${table} === "Admin":
			response = await selectAllFromTable("Admin");
		break;
	}
	return response;
};

//TODO Need to add a check for if the execute fails
async function selectAllFromTable(table){
	if(typeof(table) !== "string") return buildResponse(400, "Request could not bring a result");

	contents = ""
	with conn.cursor() as query:
		query.execute("SELECT * FROM " + table + ";");
		contents = JSON.stringify(query);

	error_code = 200;
	if(contents.len() === 0) error_code = 204; //204 means no content

	buildResponse(error_code, contents);
}

function buildResponse(statusCode, body) {
	return {
		statusCode: statusCode,
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	}
}
