# coding: utf-8
import json
import csv

sample = ""
with open("dist/0.0.1/sample.json", "r") as f:
    sample = json.loads(f.read())


# Flattens the json sample
flat_headers = []
flat_values = []
for each in sample["data"]:
    for each1 in sample["data"][each]:
        flat_headers.append(each + "-" + each1)
        flat_values.append(unicode(sample["data"][each][each1]).
                           encode("utf-8"))

# Writes flat json arrays to csv
with open("sample-csv.csv", "w") as f:
    writer = csv.writer(f, delimiter=",", quotechar='"')
    writer.writerow(flat_headers)
    writer.writerow(flat_values)

# Gets keys from flat csv
keys = []
with open("sample-csv.csv", "r") as f:
    reader = csv.DictReader(f, delimiter=",", quotechar='"')
    for row in reader:
        keys = row
        break


jq_filter_file = "jq_filter.jq"
renew_sample_file = "renew_sample.json"
renewed_sample = {"data": {}}
jq_filter = {"data": {}}
for key in keys:
    dash = key.index("-")
    if key[:dash] not in renewed_sample["data"]:
        renewed_sample["data"][key[:dash]] = {}
        jq_filter["data"][key[:dash]] = {}
    renewed_sample["data"][key[:dash]][key[dash + 1:]] = keys[key]
    # print(jq_filter["data"])
    # print(jq_filter["data"][key[:dash]])
    # print(jq_filter["data"][key[:dash]][key[dash + 1:]])
    jq_filter["data"][key[:dash]][key[dash + 1:]] = "." + key

# print(jq_filter)

with open(jq_filter_file, "w") as f:
    f.write(json.dumps(jq_filter))

print('''Replace ". with ." in file jq_filter.jq.
 Also add .[] to the start of the filter file and add | tonumber where a number is required instead of a string''')
