# coding: utf-8
import json
import csv

sample = ""
with open("dist/0.0.1/sample.json", "r") as f:
    sample = json.loads(f.read())


flat_headers = []
flat_values = []
for each in sample["data"]:
    for each1 in sample["data"][each]:
        flat_headers.append(each + "-" + each1)
        flat_values.append(unicode(sample["data"][each][each1]).encode("utf-8"))

with open("sample-csv.csv", "w") as f:
    writer = csv.writer(f, delimiter=",", quotechar='"')
    writer.writerow(flat_headers)
    writer.writerow(flat_values)
