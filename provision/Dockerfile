FROM mongo
COPY db.json /db.json
CMD mongoimport --host mongodb --db viaplay --collection restaurants --type json --file /db.json --jsonArray
