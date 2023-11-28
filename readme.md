
  

This project uses NodeJS and testing by Postman

  

# Pre-requisites

  

- Install [Node.js](https://nodejs.org/en/)

  

  

# Getting started

  

- Install dependencies

  

```

  

cd <project_name>

  

npm install

  

```

  

- Build and run the project

  

```

  

npm run dev

  

```

  

REST APIs : `http://localhost:3000/inventory/check`

  

## Database

```
JSON file: src/items.json
```

  

## Testing by Swagger

Open this URL : http://localhost:3000/doc on the web browser  

## Testing by Postman

### Download and install
1. Install [www.postman.com](https://www.postman.com/downloads/)

2. Open Postman

  

[![postman.png](https://i.postimg.cc/GmzRyFm0/postman.png)](https://postimg.cc/jDWBVJfv)

  

### Step to test

  
>**Step 1:** Select method 'POST' and Enter URL: http://localhost:3000/inventory/check
>
>**Step 2:** Click 'Body'
>
>**Step 3:** Select 'raw' and select 'JSON'
>
>**Step 4:** Enter the JSON of cart, each object contains itemId and quantity
>	**Example**
>```
>[{"itemId":"1","quantity":"1"},{"itemId":"2","quantity":"5"},{"itemId":"3","quantity":"7"}]
>```
>
>**Step 5:** Click 'Send' button, then see the result
