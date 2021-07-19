# Passport | Roles

User's roles are used to know who can perform certain action who can't.

Let's take an example:

| ROLE   | View Content | Edit Book | Delete Book |
| ------ | ------------ | --------- | ----------- |
| USER   | ✅           | ❌        | ❌          |
| EDITOR | ✅           | ✅        | ❌          |
| ADMIN  | ✅           | ✅        | ✅          |

We need to add a `role` property in our `UserSchema`

```js
const UserSchema = Schema({
  // ...
  role: {
    type: String,
    enum: ["USER", "EDITOR", "ADMIN"],
    default: "USER",
  },
});
```

Then we'll create a `checkRoles` function who control from the database the user's role.

```js
const checkRoles = (role) => async (req, res, next) => {
  const user = await UserModel.findById(req.user._id);

  if (user.role === role) {
    return next();
  }

  res.status(403).json({ message: "Not authorized" });
};

```

In out routes file we will add thees routes with a `checkRoles()` middleware

```js
router.put("/modify", checkRoles("ADMIN"), async (req, res) => {
  const { id, email } = req.body;

  const userModified = await UserModel.findOneAndUpdate({ _id: id }, { email });

  if(!userModified) {
    res.status(200).json({ message: "User to modify not found" });
  }

  res.status(200).json({ message: "Modified correctly" });
});
```
