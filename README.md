React demo site program
=================
## Overview
- This is a tiny demo site program by react

## Development(1)
| Item   | Ver. |Remarks|
|--------|--------|--------|
| cpu    | Intel(R) Core(TM) i5-5250U CPU @ 1.60GHz||
| os     | Darwin 21.6.0 |Monterey|
| node    | 18.16.0||
| react   | 18.2.0||

## Development(2)
| Item   | Ver. |Remarks|
|--------|--------|--------|
| cpu     | Intel(R) Core(TM) i7-10510U CPU @ 1.80GHz ||
| os     | Ubuntu 20.04 LTS |WSL2|
| node    | 18.16.0||
| react   | 18.2.0||

## Install and Run
```
git clone https://github.com/hidekuno/cd-shop-demo-site
cd cd-shop-demo-site
npm install
npm start
```
![image](https://github.com/hidekuno/cd-shop-demo-site/assets/22115777/73162383-2f49-4d27-a1c3-85eae679740b)

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
