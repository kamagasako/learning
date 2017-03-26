#!/usr/bin/env python
# -*- coding: utf-8 -*-

from kafka import KafkaConsumer

if __name__ == '__main__':
	consumer = KafkaConsumer('topic', bootstrap_servers = 'localhost:9092,localhost:9093')
	for msg in consumer:
		print(msg)
