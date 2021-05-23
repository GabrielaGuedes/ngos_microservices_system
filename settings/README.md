# Settings

Microservice to manage donated invoices. Only admins can use it

Before running this, pleashe check the `.sample-env` file and then create the `.env` file. The "SECRET" var needs to be the same as the one from the Authentication service.

To run it, use the `docker-compose.yml` file in the main folder from the invoice.

## Routes

You can check the full description of each one below the table.

| Endpoint                 | Only Admin | Request Fields                          | Headers        | Filters          | Description                     |
| ------------------------ | ---------- | --------------------------------------- | -------------- | ---------------- | ------------------------------- |
| GET /api/invoices        | True       | -                                       | x-access-token | minDate, maxDate | Returns all invoices            |
| GET /api/invoices/:id    | True       | -                                       | x-access-token | -                | Returns the invoice with the id |
| POST /api/invoices/      | True       | donationDate, donatorEmail, donatorName |
| PUT /api/invoices/       | True       | donationDate, donatorEmail, donatorName | x-access-token | -                | Updates the invoice             |
| DELETE /api/invoices/:id | True       | -                                       | x-access-token | -                | Deletes the invoice             |

### GET /api/invoices/

Lists all the invoices.

The authentication token needs to be passed in the header field `x-access-token`.

You can filter by `minDate` or `maxDate` using query string params (e.g. `/api/invoices/?maxDate=2020-01-01`)

When request is done correctly, returns success (200). Example response:

```json
[
  {
    "_id": "60a9a2b90fb6eb072b843e1b",
    "donationDate": "2021-01-01T22:00:00.700Z",
    "donatorName": "Example for docs",
    "donatorEmail": "example@docs.com",
    "createdAt": "2021-05-23T00:32:57.700Z",
    "updatedAt": "2021-05-23T00:32:57.700Z",
    "__v": 0
  }
]
```

When token is missing, returns unauthorized (401). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### GET /api/invoices/:id

Gets invoice with id passed

The authentication token needs to be passed in the header field `x-access-token`.

When request is done correctly, returns success (200). Example response:

```json
{
  "_id": "60a9a2b90fb6eb072b843e1b",
  "donationDate": "2021-01-01T22:00:00.700Z",
  "donatorName": "Example for docs",
  "donatorEmail": "example@docs.com",
  "createdAt": "2021-05-23T00:32:57.700Z",
  "updatedAt": "2021-05-23T00:32:57.700Z",
  "__v": 0
}
```

When token is missing, returns unauthorized (401). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### POST /api/invoices/

Creates a new invoice.

The authentication token needs to be passed in the header field `x-access-token`.

Params:

- donationDate: date, format `yyyy-mm-ddThh:mm:ss.sssZ`
- donatorName: string
- donatorEmail: string

Example body:

```json
{
  "donationDate": "2021-01-01T22:00:00.700Z",
  "donatorName": "Example for docs",
  "donatorEmail": "example@docs.com"
}
```

When request is done correctly, returns success (200). Example response:

```json
{
  "_id": "60a9a2b90fb6eb072b843e1b",
  "donationDate": "2021-01-01T22:00:00.700Z",
  "donatorName": "Example for docs",
  "donatorEmail": "example@docs.com",
  "createdAt": "2021-05-23T00:32:57.700Z",
  "updatedAt": "2021-05-23T00:32:57.700Z",
  "__v": 0
}
```

When token is missing, returns unauthorized (401). When there is an error with the request body, returns bad request (400). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### PUT /api/invoices/:id

Updates the invoice from the id passed.

The authentication token needs to be passed in the header field `x-access-token`.

It is necessary to pass all the params (that are mandatory). Params:

- donationDate: date, format `yyyy-mm-ddThh:mm:ss.sssZ`
- donatorName: string
- donatorEmail: string

Example body:

```json
{
  "donationDate": "2021-01-01T22:00:00.700Z",
  "donatorName": "Updated Example for docs",
  "donatorEmail": "example@docs.com"
}
```

When request is done correctly, returns success (200). Example response:

```json
{
  "_id": "60a9a2b90fb6eb072b843e1b",
  "donationDate": "2021-01-01T22:00:00.700Z",
  "donatorName": "Updated Example for docs",
  "donatorEmail": "example@docs.com",
  "createdAt": "2021-05-23T00:32:57.700Z",
  "updatedAt": "2021-05-23T00:35:56.588Z",
  "__v": 0
}
```

When token is missing, returns unauthorized (401). When there is an error with the request body, returns bad request (400). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### DELETE /api/invoices/:id

Deletes the invoice from the id passed.

The authentication token needs to be passed in the header field `x-access-token`.

When request is done correctly, returns success (200). Example response:

```json
{
  "message": "Destroyed!"
}
```

When token is missing, returns unauthorized (401). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

## Testing

The tests that need token, it is necessary to have the authentication service running and have the following user/password registered:

```
{
  email: "test@example.com",
  password: "password1234"
}
```

Then, you can just run:

```
$ npm test
```
