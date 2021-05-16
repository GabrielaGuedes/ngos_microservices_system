# Marketing

Microservice to manage social midia posts. Only admins can use it.

Before running this, please check the `.sample-env` file and then create the `.env` file. The "SECRET" var needs to be the same as the one from the Authentication service. It may also be necessary to create the `public-files` folder in the root.

To run it, use the `docker-compose.yml` file in the main folder from the project.

## Routes

You can check the full description of each one below the table.

| Endpoint                      | Only Admin | Request fields                                  | Headers        | Filters                                                | Description                  |
| ----------------------------- | ---------- | ----------------------------------------------- | -------------- | ------------------------------------------------------ | ---------------------------- |
| GET /api/posts                | True       | -                                               | x-access-token | posted, minPostedAt, maxPostedAt, orderByPeopleReached | Returns all posts            |
| GET /api/posts/:id            | True       | -                                               | x-access-token | -                                                      | Returns the post with the id |
| POST /api/posts/              | True       | title, text, postedAt, peopleReached, filePaths | -              | Creates a new post                                     |
| PUT /api/posts/               | True       | title, text, postedAt, peopleReached, filePaths | -              | Updates the post                                       |
| DELETE /api/posts/:id         | True       | -                                               | x-access-token | -                                                      | Deletes the post             |
| POST /api/file-uploads/add    | True       | image attached in "multiple_files"              | -              | Stores the image                                       |
| POST /api/file-uploads/remove | True       | paths                                           | -              | Removes the images                                     |

### GET /api/posts/

Lists all the posts.

The authentication token needs to be passed in the header field `x-access-token`.

You can filter by `posted` (boolean), `minPostedAt` or `maxPostedAt` and order (desc) by people reached using `orderByPeopleReached` (boolean) using query string params (e.g. `/api/posts/?posted=true&minPostedAt=2021-01-01`)

When request is done correctly, returns success (200). Example response:

```json
[
  {
    "id": 1,
    "title": "Post for docs",
    "text": "this is a cool post",
    "peopleReached": 800,
    "postedAt": "2021-01-01T00:00:00.000Z",
    "createdAt": "2021-05-15T23:55:58.745Z",
    "updatedAt": "2021-05-15T23:55:58.745Z",
    "files": [
      {
        "id": 1,
        "path": "path/to/file",
        "postId": 1,
        "createdAt": "2021-05-15T23:55:58.887Z",
        "updatedAt": "2021-05-15T23:55:58.887Z"
      }
    ]
  }
]
```

When token is missing, returns unauthorized (401). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### GET /api/posts/:id

Gets project with id passed

The authentication token needs to be passed in the header field `x-access-token`.

When request is done correctly, returns success (200). Example response:

```json
{
  "id": 1,
  "title": "Post for docs",
  "text": "this is a cool post",
  "peopleReached": 800,
  "postedAt": "2021-01-01T00:00:00.000Z",
  "createdAt": "2021-05-15T23:55:58.745Z",
  "updatedAt": "2021-05-15T23:55:58.745Z",
  "files": [
    {
      "id": 1,
      "path": "path/to/file",
      "postId": 1,
      "createdAt": "2021-05-15T23:55:58.887Z",
      "updatedAt": "2021-05-15T23:55:58.887Z"
    }
  ]
}
```

When token is missing, returns unauthorized (401). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### POST /api/posts/

Creates a new post.

The authentication token needs to be passed in the header field `x-access-token`.

Params:

- title: string
- text: string, optional
- postedAt: date, format `yyyy-mm-dd`, optional
- peopleReached: integer, optional
- filePaths: array of strings (required but can be empty - `[]`)

Example body:

```json
{
  "title": "Post for docs",
  "text": "this is a cool post",
  "postedAt": "2021-01-01",
  "peopleReached": 800,
  "filePaths": ["path/to/file"]
}
```

When request is done correctly, returns success (200). Example response:

```json
{
  "id": 1,
  "title": "Post for docs",
  "text": "this is a cool post",
  "postedAt": "2021-01-01T00:00:00.000Z",
  "peopleReached": 800,
  "files": [
    {
      "id": 1,
      "path": "path/to/file",
      "postId": 1,
      "updatedAt": "2021-05-15T23:55:58.887Z",
      "createdAt": "2021-05-15T23:55:58.887Z"
    }
  ],
  "updatedAt": "2021-05-15T23:55:58.745Z",
  "createdAt": "2021-05-15T23:55:58.745Z"
}
```

When token is missing, returns unauthorized (401). When there is an error with the request body, returns bad request (400). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### PUT /api/posts/:id

Updates the project from the id passed. It has the power to destroy/create new files, depending on the value passed for "filePaths".

The authentication token needs to be passed in the header field `x-access-token`.

It is necessary to pass all the params (that are mandatory). Params:

- title: string
- text: string, optional
- postedAt: date, format `yyyy-mm-dd`, optional
- peopleReached: integer, optional
- filePaths: array of strings (required but can be empty - `[]`)

Example body:

```json
{
  "title": "Updated Post for docs",
  "text": "this is a cool post",
  "postedAt": "2021-01-01",
  "peopleReached": 800,
  "filePaths": []
}
```

When request is done correctly, returns success (200). Example response:

```json
{
  "id": 1,
  "title": "Updated Post for docs",
  "text": "this is a cool post",
  "peopleReached": 800,
  "postedAt": "2021-01-01",
  "createdAt": "2021-05-15T23:55:58.745Z",
  "updatedAt": "2021-05-15T23:59:39.290Z",
  "files": []
}
```

When token is missing, returns unauthorized (401). When there is an error with the request body, returns bad request (400). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### DELETE /api/posts/:id

Deletes the post from the id passed.

The authentication token needs to be passed in the header field `x-access-token`.

When request is done correctly, returns success (200). Example response:

```json
{
  "message": "Destroyed!"
}
```

When token is missing, returns unauthorized (401). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### POST /api/file-uploads/add

Store the files attached.

The authentication token needs to be passed in the header field `x-access-token`. It is also necessary to set the `Content-Type` as `multipart/form-data`.

The file be in the formats: jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|pdf.

Attach the file in the field "multiple_files". It is possible to attach up to 10 files.

When request is done correctly, returns success (200). Example response:

```json
{
  "images": [
    {
      "fieldname": "multiple_files",
      "originalname": "kitten.jpg",
      "encoding": "7bit",
      "mimetype": "image/jpeg",
      "destination": "./test/public-files",
      "filename": "multiple_files-1621123669575.jpg",
      "path": "public-files\\multiple_files-1621123669575.jpg",
      "size": 45354
    },
    {
      "fieldname": "multiple_files",
      "originalname": "kitten2.jpg",
      "encoding": "7bit",
      "mimetype": "image/jpeg",
      "destination": "./public-files",
      "filename": "multiple_files-1621123669576.jpg",
      "path": "public-files\\multiple_files-1621123669576.jpg",
      "size": 31417
    }
  ]
}
```

When token is missing, returns unauthorized (401). When there is an error with the request body, returns bad request (400). When token is incorrect or there was an error with the attached file, returns internal server error (500).

---

### POST /api/file-uploads/remove

Removes the files from the paths passed.

The authentication token needs to be passed in the header field `x-access-token`.

Params:

- paths: array of strings

Example body:

```json
{
  "paths": ["path/to/file/file.png"]
}
```

When request is done correctly, returns success (200). Example response:

```json
{
  "success": true
}
```

When token is missing, returns unauthorized (401). When there is an error with the request body, returns bad request (400). When token is incorrect or the file doesn't exist, returns internal server error (500).

---

## Testing

The tests that need token, it is necessary to have the authentication service running and have the following user/password registered:

```
{
  email: "test@example.com",
  password: "password1234"
}
```

It may also be necessary to create the `./test/public-files` folder.

Then, you can just run:

```
$ npm test
```
