# CATSPA

- Create a single-page web application. Use fetch to manipulate data.
  Create the following operations:
- get all
- get one
- insert
- remove
  Design and implement the main menu and all other necessary pages.
  Design and implement stylesheets for the application.

## indexSpa

Create a server to serve single page aplication and necessary resources (html, css, js, etc.). Server is listening host localhost:3000. Main page can be opened from root route /.

## Public

### js

Includes js file for each page as well as file with helperfunction.

### pages

Static pages for different crud operations eg: allCats.html
oneCat.html,removeCat.html,addCat.html,updateCat.html

### styles

styling of pages inside style.css

## Usage

first checkdatabase is running
run server inside cat_restApi

```js
node indexRest.js
```

After server is running at http://localhost:4000/api/cats

For accessing cats run

```js
node indexSpa.js
```

And open in browser http://localhost:3000
