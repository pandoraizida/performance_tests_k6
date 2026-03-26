# Description

Performance testing tool: `k6`<br>
API: `swaggerapi/petstore`<br>
Database for storing data: `Influxdb`<br>
Performance test visualisation: `Grafana`<br>
<br>
Performance tests will be available for run in 4 modes: `smoke/load/stress/soak`<br>
You can also run tests with a specific `run ID`, which makes it easy to visualize information in Grafana<br>

# Steps
## Install k6
Follow the instructions provided in https://grafana.com/docs/k6/latest/set-up/install-k6/<br>

## Setup Influx, Grafana and API
`docker-compose up -d`<br>
API will be available on `http://localhost:8080`<br>

## Prepare Influx
Influx will be available on `http://localhost:8086` without interface<br>
Create new db using `curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE DATABASE mydb"`<br>


## Prepare Grafana
You should be able to see Grafana dashboard on `http://localhost:3000`<br>
Its default username and password is: `admin`<br>
Create a data source with settings: `Query language - Influxdb`, `URL - http://influxdb:8086`, `Database - mydb`<br>
Create new dashboard using settings from `dashboard.json` as an example or any other dashboard<br>
For filtering by `run ID` create a `Variable` for the dashboard with request `SHOW TAG VALUES WITH KEY = "testid"`<br>

## Run tests
Run tests without run ID:<br>
`k6 run -e test_mode=<smoke/load/stress/soak> --out influxdb=http://localhost:8086/mydb test.js`<br>

Run tests with specific run ID:<br>
`TEST_RUN_ID=run_$(date +%s) k6 run -e test_mode=<smoke/load/stress/soak> --out influxdb=http://localhost:8086/mydb test.js`<br>

## Result monitoring in Grafafa
![Grafana Dashboard](grafana.png)