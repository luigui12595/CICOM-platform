# README #



### What is this repository for? ###

* Quick summary 

	This repository is for CICOM-platform project, using NodeJS, Express and MYSQL.
	You must have node, express and mysql already installed.

* Version 
1.0.0


### How do I get set up? ###

* Database configuration

	-Install mysql

	-Run cicom_schema.sql

	-Run inserts_cicom.sql

	**You need to have nodejs installed, mysql must be also installed and running**
	**To run a complete sql file use mysql command: SOURCE + PathOfFILE**

* Summary of set up

	--Go to the cicom-plat directory

	--Run the command:

		$npm install

	--To run node server to see output point your browser to "localhost:8080":

		$npm start

	--Go to cicom-app directory, and run

		$npm install http-server -g
	
	--To execute an Angular's instance, run on cicom-app

		$http-server -o


* Configuration


* Dependencies
express
mysql
body-parser
pm2



* Deployment instructions
To run on server is necessary to run the platform via node js process manager like pm2
To install pm2 follow instructions on this page: http://pm2.keymetrics.io/



### Who do I talk to? ###
Luis Campos
luigui12595@gmail.com