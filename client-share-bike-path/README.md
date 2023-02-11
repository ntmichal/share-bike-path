# ClientShareBikePath

Install modules 
```
npm install
```

set the IP and address of the backend application in file proxy.config.json
```json
{
  "*": {
    "target": "http://localhost:8080",
    "secure": false
  }
}
```

Run app witch `npm start` or `ng serve --proxy-config proxy.config.json`


Build prod app:

```
npm run build
```
