# Auth Exercise 🔐

In this exercise you will have to create a complete server with authentication and roles

1. Install all the dependencies with `npm i`

2. Create a new Model Called `Post` with this schema:

```js
const PostSchema = new Schema({
  content: {
    type: String,
    required: true,
    unique: true,
  },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});
```

3. Create a CRUD routes for Post Model (Create Routes to retrieve, modify or delete posts)

4. Create Roles to allow these actions:

| ROLE   | View all Posts | Edit own posts | Delete own posts | Edit Post of different users | Delete Post of different users |
| ------ | -------------- | --------------------------------- | ----------------------------------- | ---------------------------- | ------------------------------ |
| USER   | ✅             | ✅                                | ✅                                  | ❌                           | ❌                             |
| EDITOR | ✅             | ✅                                | ✅                                  | ✅                           | ❌                             |
| ADMIN  | ✅             | ✅                                | ✅                                  | ✅                           | ✅                             |
