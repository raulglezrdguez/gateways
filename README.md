# gateways
REST service test using MERN stack

## install server
```
yarn, or 
npm i
```

## run server
```
yarn start, or
npm start
```

## install client
```
cd client
yarn, or 
npm i
```

## run client (inside client folder)
```
yarn start, or
npm start
```

## REST service test using Postman.

## Gateways routes
### get gateways
```
Method: GET, http://localhost:4000/api/gateway
```

### get gateway
```
Method: GET, http://localhost:4000/api/gateway
Params, Query params
Key: id
Value: 61f318f4e0b6282a7d25c81d
```

### create gateway
```
Method POST, http://localhost:4000/api/gateway
Body, raw, JSON:

{
    "serial": "SERIAL", 
    "name": "Name", 
    "address": "10.5.44.109"
}
```

### update gateway
```
Method PATCH, http://localhost:4000/api/gateway
Body, raw, JSON:

{
    "id": "61f325c496d178b8a73d6eb2",
    "serial": "NEW SERIAL", 
    "name": "New Name", 
    "address": "10.5.44.10"
}
```

### delete gateway
```
Method DELETE, http://localhost:4000/api/gateway
Body, raw, JSON:

{
    "id": "61f325c496d178b8a73d6eb2"
}
```

## Peripherals
### get peripherals
```
Method: GET, http://localhost:4000/api/peripheral
```

### get peripheral
```
Method: GET, http://localhost:4000/api/peripheral
Params, Query params
Key: id
Value: 61f318f4e0b6282a7d25c81d
```

### create peripheral
```
Method POST, http://localhost:4000/api/peripheral
Body, raw, JSON:

{
    "gatewayId": "61f318f4e0b6282a7d25c81d", 
    "uid": 1, 
    "vendor": "Vendor", 
    "status": "online"
}
```

### update peripheral
```
Method PATCH, http://localhost:4000/api/peripheral
Body, raw, JSON:

{
    "id": "61f32dc37a822ee314f50818", 
    "uid": 1, 
    "vendor": "Vendor", 
    "status": "offline"
}
```

### delete peripheral
```
Method DELETE, http://localhost:4000/api/peripheral
Body, raw, JSON:

{
    "id": "61f32dc37a822ee314f50818"
}
```

