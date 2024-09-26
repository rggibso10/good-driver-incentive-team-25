

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

import sys;
import logging;
import pymysql;
import json;
import os;
import { defineAuth, secret } from '@aws-amplify/backend';

//done outside to allow all functions to access
user_name = secret('DB_USERNAME');
password = secret('DB_PASSWORD');
rds_proxy_host = secret('DB_END_POINT');
db_name = secret('DB_NAME');

logger = logging.getLogger();
logger.setLevel(logging.INFO);

try:
	conn = pymysql.connect(host=rds_proxy_host, user=user_name, passwd=password, db=db_name, connect_timeout=5);
except pymysql.MySQLError as e:
	logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.");
	logger.error(e);
	sys.exit(1);

logger.info("SUCCESS: Connection to RDS for MySQL instance succeeded");

exports.handler = async (event) => {
	console.log(`EVENT: ${JSON.stringify(event)}`);
	with conn.cursor() as query:
		query.execute("SELECT * FROM Sponsor;");
		return {
			statusCode: 200,
			body: JSON.stringify(query),
		};
};
