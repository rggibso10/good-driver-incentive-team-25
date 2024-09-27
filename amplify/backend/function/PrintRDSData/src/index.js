

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

import sys;
import logging;
import pymysql;
import json;
import os;
import { defineAuth, secret } from '@aws-amplify/backend'; //obtain secrets

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

exports.handler = async (event) => {
	console.log(`EVENT: ${JSON.stringify(event)}`);
	//TODO check what event is
	switch(true){
		case <>: selectAllFromTable("Driver") break;
		case <>: selectAllFromTable("Sponsor") break;
		case <>: selectAllFromTable("Admin") break;
	}
};

//TODO Need to add a check for if the execute fails
async function selectAllFromTable(table){
	if(typeof(table) !== "string") return buildResponse(400, "Request could not bring a result")

	contents = ""
	with conn.cursor() as query:
		query.execute("SELECT * FROM " + table + ";");
		contents = JSON.stringify(query);

	error_code = 200;
	if(contents.len() === 0) error_code = 204; //204 means no content

	buildResponse(error_code, contents)
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
