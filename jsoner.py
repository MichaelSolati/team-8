out = []
out.append("{data:[")
file = open("cities.json", "r")
for line in file:
    outputline = "{'City': ";
    thisline = line.split()
    outputline += ("%s',\n" % (thisline[0]))
    outputline += ("'Population':%s\n" % (thisline[1]))
    out.append(outputline+"}")
    print(outputline)
out.append("}")
file.close();
print(out)
with open("newcities.json", "w+") as file:
    for line in out:
        file.write(line)
