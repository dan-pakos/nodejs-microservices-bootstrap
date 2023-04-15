#!/bin/bash

while getopts "t:,b:" flag
do
    case "${flag}" in
        t) t=${OPTARG};;
        b) b=${OPTARG};;
    esac
done

echo "Waiting for Kafka Connect to start listening on kafka-connect ⏳"
while [ $(curl -s -o /dev/null -w %{http_code} http://main-broker-connect-elk:8083/connectors) -eq 000 ] ; do 
  echo -e $(date) " Kafka Connect listener HTTP state: " $(curl -s -o /dev/null -w %{http_code} http://main-broker-connect-elk:8083/connectors) " (waiting for 200)"
  sleep 50
done

echo "Activiting plugin on ${b} with ${t}"

# a REST method to activate plugin 
curl -X POST http://main-broker-connect-elk:8083/connectors -H 'Content-Type: application/json' -d \
'{
  "name": "elasticsearch-sink",
  "config": {
    "connector.class": "io.confluent.connect.elasticsearch.ElasticsearchSinkConnector",
    "tasks.max": "1",
    "topics": "'${t}'",
    "key.ignore": "true",
    "schema.ignore": "true",
    "connection.url": "'${b}'",
    "type.name": "kafka-connect",
    "name": "elasticsearch-sink",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter",
    "value.converter.schemas.enable": "false"
  }
}'

echo "Installed:"
curl http://main-broker-connect-elk:8083/connectors

echo "All done"