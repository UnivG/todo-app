This is a todo app made with react-js and Java Spring.

The directory todo contains the spring part and todo-front contains the react part.
In order to have the spring working you'll have to change the database connection in spring.
To do it change the spring.data.mongodb.uri in todo/todo/src/main/resources/application.properties.
![image](https://github.com/user-attachments/assets/d625027f-f563-44d4-8325-7424d7c8f1be)

After that you can run the spring app.

Then you can continue to run the react app.
Enter the todo-front directory and run npm run start.
The console will show a messega like this:
![image](https://github.com/user-attachments/assets/12159099-c78a-4e5b-a9a1-320bc5c0967f)

The end result should look like this:
![image](https://github.com/user-attachments/assets/d61a4edb-ce2f-4d70-b44e-f7794bd58550)

And this is how the data should look in the database:
![image](https://github.com/user-attachments/assets/4b3b4535-bd9e-44c3-960f-c5e3e6b2d8f0)
