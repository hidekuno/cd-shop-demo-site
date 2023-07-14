React demo site program
=================
## Overview
- This is a tiny demo site program by react

## Development(1)
| Item   | Ver. |Remarks|
|--------|--------|--------|
| os     | Darwin 21.6.0 |Monterey|
| node    | 16.20.0||

## Development(2)
| Item   | Ver. |Remarks|
|--------|--------|--------|
| os     | Ubuntu 20.04 LTS |WSL2|
| node    | 16.20.0||

## Install and Run
```
git clone https://github.com/hidekuno/cd-shop-demo-site
cd cd-shop-demo-site
npm install
npm start
```

## Lint & fix
```
npm run lint
npm run lint:fix
```

## Test
```
npm test
```

### snapshot update
```
npm test -- -u
```

## Build
```
npm run build
```

## Deploy to AWS
```
aws s3 sync build/ s3://${BUCKET_NAME}
```
