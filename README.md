### Intro

The purpose of the project is to provide an understanding of the basics of React.js. There are two folders:
- `final`
- `starter`
---
### Starter

`starter` folder consists of the code to start the project for the workshop.
1. In the terminal, go to the `starter` folder:

```s
cd starter
```
2. Install dependencies:
```s
npm i
```
3. Run the project:
```s
npm start
```

The application runs on http://localhost:3000

4. Add the key for the Open Map

We will be using the free Air Pollution API from openweathermap. 
API Documentation can be found here: https://openweathermap.org/api/air-pollution.

To get a key:
- create an account on https://openweathermap.org,
- go to https://openweathermap.org/price and click `Get API key`in the Free column, 
- generate the key,
- the key should be generated now and visible in the `My API Keys` https://home.openweathermap.org/api_keys

The generated personal key can be used and the best practice is to use it as environmental variable:
- create `.env` file inside of the `starter` folder
- assign the key to `REACT_APP_OPEN_WEATHER_API_KEY` as follows:
```
REACT_APP_OPEN_WEATHER_API_KEY=your-key-is-here
```
Now the key can be accessed in any part of the project as `process.env.REACT_APP_OPEN_WEATHER_API_KEY`

IMPORTANT: the `.env` file should not be committed that's why, it has been already added in `.gitignore` file.

---
### Final

`final` folder consists of the final version of the project. You can follow the same steps as above to run the code.