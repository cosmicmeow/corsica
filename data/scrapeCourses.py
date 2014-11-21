#!/usr/bin/env python

from bs4 import BeautifulSoup
import urllib2
import json
import codecs

url = "http://catalog.odu.edu/courses/cs/"

content = urllib2.urlopen(url).read().decode('ascii', 'ignore')

soup = BeautifulSoup(content)

courses = []

for course in soup.find_all('div', class_="courseblock"):
    courses.append({"code" : course.find('span', class_="coursecode").get_text().encode('ascii', 'ignore'),
    				"title" : course.find('span', class_="coursetitle").get_text(),
    				"hours" : course.find('span', class_="coursehours").get_text(),
    				"description" : course.find('p', class_="courseblockdesc").get_text()})


dump = json.dumps(courses, sort_keys=True,
indent=4, separators=(',', ': '))

#print dump

f = open('classes.json', 'w+')
f.write(dump)
f.close()
