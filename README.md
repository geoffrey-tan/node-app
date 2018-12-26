## Installation
***
### Local:

In Terminal or CMD:
1. cd */app (navigate to path e.g. cd Desktop/app)
2. npm install
3. npm start
4. http://localhost:8000/

### Online
1. https://app-geoffrey-tan.herokuapp.com/

### Question 1: data model
***
The first step is deciding how the data model would look like for a given application. Which entities do you see? How do they relate? Bonus points if you provide an ERD.

![ERD](https://via.placeholder.com/140x100)

Entities:
- Users
- Purchases
- Books
- Authors
- Author

Data Model:
- Users --- One-to-many --> Purchases
- Books --- Many-to-many --> Author

To make the data model work for 'Books' and 'Author', a new entity 'Authors 'will be created in between the two entities. Since a book can have more than one author and an author can write multiple books.

### Question 2: api
***
What would the calls for the data and the pin modification to the API look like? How will the response data be formatted and what kind of parameters will have to be available for this page to work properly?

X

### Question 3: security
***
Imagine we are storing the BSN numbers of our application’s users and we use a cloud hosted database like Amazon RDS. We want to make sure the BSN numbers are stored so that they can’t be simply retrieved from the database. How would you go about storing this kind of sensitive information?

I would look into encrypting the received data before sending it to the database.

### Question 4: documentation
***
Most of the time, as a backend developer, you are building an api that will be consumed by other developers. How would you go about documenting your api in such a way that it will be easy for others developers to use it? You are free to use existing tools. Briefly explain / substantiate why you’ve chosen your described solution.

I would make use of an README.md file written with markup language. With the markup language I can easily markup `var hello` or show code examples like below:

```
var hello = "Hello World!";
console.log(hello);
```
Another program I like which is probably not well know is Quiver for mac. It's a note book witch can highlight different programming languages and export it to HTML or PDF for sharing with other people. It's meant to be a personal notebook but potentially can be used to make documentations.

### Question 5: deployment
***
One of the product’s designers want to see a running version of your application so you want to get the application running on the internet somewhere. It doesn’t have to be production ready, but it should incorporate a database which can be used by the application. Briefly explain / substantiate how you would setup the environment.

For Node.js I found Heroku, a website that will host Node.js and other programming environments for free. This is of course with it's limits but is great for testing purposes.

I would try to write code to make the application run on both the local computer and the online version. For example I had to use `process.env.PORT` for the web application and change it to `8000` for the local version with an if statement.

In Heroku you push your commit to their git and then Heroku will automatically deployed it on their server. Little setup is needed to make it work. You would need the Heroku CLI installed and you have to setup some environment variables that are stored in .env locally.

Online version:
https://app-geoffrey-tan.herokuapp.com/