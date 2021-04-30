# Authentication

Microservice used to manage the authentication for admins of the NGO system. Before running this, please check the `.sample-env` file before and create the `.env` file. To run it, use the `docker-compose.yml` file in the main folder from the project.

It uses the collection `users` from the Mongo database and stores timestamps, name, email and password (encrypted), just the basic for authentication.

The access token is valid up to 50 minutes.

## Routes

### POST /api/signup

Used to sign up. It can be used only once due to security reasons. To register a new user after one has already signed up, check the `/api/register-user` route.

Required params:

- Name: string
- Email: string
- password: string

When body is passed correctly, returns success (200). Example response:

```json
{
  "auth": true,
  "token": "19029219aaa1ui12kja109292sj10s2i1k"
}
```

When there is a required param missing, returns a bad request error (400). When there is already a user registered, returns a not authorized error (401).

---

### POST /api/login

Used to login.

Required params:

- Email: string
- password: string

When body is passed correctly, returns successs (200). Example response:

```json
{
  "auth": true,
  "token": "19029219aaa1ui12kja109292sj10s2i1k"
}
```

When the email is missing or invalid, returns bad request (400). When the password is missing or invalid, returns unauthorized (401).

---

### PUT /api/redefine-password

Used to redefines password. It is necessary to be authenticated.

Required header param:

- x-access-token: the access token.

Required body params:

- oldPassword: string
- newPassword: string

When body is passed correctly, returns successs (200). Example response:

```json
{
  "message": "Success!"
}
```

When the token is not passed or the oldPassword is wrong, returns unauthorized (401). When token is invalid or there was a problem in setting the new password, returns internal server error (500).

---

### POST /api/register-user

Used to register new users. It is necessary to be authenticated.

Required header param:

- x-access-token: the access token.

Required body params:

- Name: string
- Email: string
- password: string

When body is passed correctly, returns successs (200). Example response:

```json
{
  "message": "Success!",
  "email": "example@test.com",
  "name": "Example Name"
}
```

When the token is not passed, returns unauthorized (401). When there is a missing param returns bad request (400). When token is invalid or there was a problem in creating the new user (e.g. the email is already being used), returns internal server error (500).

---

## Testing

Just run

```
$ npm test
```
