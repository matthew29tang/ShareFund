import json
files = ['VAW', 'VFH', 'VGT', 'VHT', 'VIS', 'VNQ', 'VPU']
totalData = {}
for name in files:
    f = open(name + '.csv', 'r')
    data = f.readlines()
    data.pop(0)
    jsonified = []
    for row in data:
        r = row.split(',')
        date = r[0].split('-')
        obj = {}
        obj['date'] = {}
        obj['date']['day'] = int(date[2])
        obj['date']['month'] = int(date[1])
        obj['date']['year'] = int(date[0])
        obj['price'] = round(float(r[1]), 2)
        jsonified.append(obj)

    totalData[name] = jsonified
result = json.dumps(totalData)
o = open('total.json', 'w')
o.write(result)
o.close()
    
