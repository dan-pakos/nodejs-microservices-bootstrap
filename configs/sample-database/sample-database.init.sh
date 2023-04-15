mongosh -- "$MONGO_DATABASE" <<EOF
    var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    var admin = db.getSiblingDB('admin');
    admin.auth(rootUser, rootPassword);

    var user = '$MONGO_INITDB_USERNAME';
    var passwd = '$MONGO_INITDB_PASSWORD';
    db.createUser({user: user, pwd: passwd, roles: ["readWrite"]});
    db.createCollection("locations")
    db.locations.insert({
        "country": "United Kingdom",
        "region": "Greater London",
        "city": "London",
        "postcode": "TW80DU",
        "address_1": "399 High St",
        "address_2": "Brentford",
        "geolocation": {
            latitude: 51.48783,
            longitude: -0.293248
        }
    })
EOF