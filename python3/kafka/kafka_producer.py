#!/usr/bin/env python
# -*- coding: utf-8 -*-

from kafka import KafkaProducer
from datetime import datetime
import time

if __name__ == '__main__':
	producer = KafkaProducer(bootstrap_servers = 'localhost:9092,localhost:9093')
	for i in range(100):
		msg = '%d: %s' % (i, datetime.now())
		producer.send('topic', key = b'key', value = msg.encode())
		producer.flush()
		print(msg)
		time.sleep(1)
