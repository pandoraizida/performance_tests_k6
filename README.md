# Description

Performance testing tool: k6
API: swaggerapi/petstore
Database for storing data: Influxdb
Performance test visualisation: Grafana

# Steps
## Install k6
Follow the instructions provided in https://grafana.com/docs/k6/latest/set-up/install-k6/

## Setup Influx, Grafana and API
docker-compose up -d
API will be available on http://localhost:8080

## Prepare Influx
Influx will be available on http://localhost:8086 without interface
Create new db using curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE DATABASE mydb"


## Prepare Grafana
You should be able to see Grafana dashboard on http://localhost:3000
Its default username and password is: admin
Create a data source with settings: Query language - Influxdb, URL - http://influxdb:8086, Database - mydb
Create new dashboard using settings from Dashboard.json as an example

## Run tests
k6 run -e test_mode=<smoke/load/stress/soak> --out influxdb=http://localhost:8086/mydb test.js
TEST_RUN_ID=run_$(date +%s) k6 run -e test_mode=<smoke/load/stress/soak> --out influxdb=http://localhost:8086/mydb test.js