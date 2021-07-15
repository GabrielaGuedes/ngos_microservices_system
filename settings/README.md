# Settings

Microservice to activate/deactivate services and details settings.
The default value for services is:

```json
{
  "donations": true,
  "employees": true,
  "financialControl": true,
  "invoices": true,
  "marketing": true,
  "projects": true,
  "reports": true,
  "volunteers": true
}
```

The default value for details settings is:

```json
{
  "name": "ONG"
}
```

Before running this, pleashe check the `.sample-env` file and then create the `.env` file. The "SECRET" var needs to be the same as the one from the Authentication service.

To run it, use the `docker-compose.yml` file in the main folder from the invoice.

## Routes

You can check the full description of each one below the table.

| Endpoint            | Only Admin | Request Fields                                                                              | Headers        | Filters | Description                              |
| ------------------- | ---------- | ------------------------------------------------------------------------------------------- | -------------- | ------- | ---------------------------------------- |
| GET /api/services   | False      | -                                                                                           | x-access-token | -       | Returns the current service config       |
| POST /api/services/ | True       | donations, employees, financialControl, invoices, marketing, projects, reports, volunteeers | x-access-token | -       | Updates the permissions for the services |
| GET /api/details    | False      | -                                                                                           | -              | -       | Returns the current details config       |
| POST /api/details/  | True       | name                                                                                        | x-access-token | -       | Updates the details configs              |

### GET /api/services/

Returns the current service config. If there isn't a current config on the database, returns the default value.

When request is done correctly, returns success (200). Example response:

```json
{
  "donations": true,
  "employees": true,
  "financialControl": true,
  "invoices": true,
  "marketing": true,
  "projects": true,
  "reports": true,
  "volunteers": true
}
```

When there was an error, returns internal server error (500).

---

### POST /api/services/

Upserts the current config for the services.

The authentication token needs to be passed in the header field `x-access-token`.

Params:

- donations: boolean, optional
- employees: boolean, optional
- financialControl: boolean, optional
- invoices: boolean, optional
- marketing: boolean, optional
- projects: boolean, optional
- reports: boolean, optional
- volunteers: boolean, optional

Example body:

```json
{
  "donations": false,
  "employees": true,
  "financialControl": false
}
```

When request is done correctly, returns success (200). Example response:

```json
{
  "current": true,
  "donations": false,
  "employees": true,
  "financialControl": false,
  "invoices": true,
  "marketing": true,
  "projects": true,
  "reports": true,
  "volunteers": true,
  "_id": "60b24ea94354b56dffd5f73c",
  "__v": 0,
  "createdAt": "2021-05-29T14:24:41.703Z",
  "updatedAt": "2021-05-29T14:24:41.703Z"
}
```

When token is missing, returns unauthorized (401). When there is an error with the request body, returns bad request (400). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### GET /api/details/

Returns the current details config. If there isn't a current config on the database, returns the default value.

The authentication token needs to be passed in the header field `x-access-token`.

When request is done correctly, returns success (200). Example response:

```json
{
  "name": "ONG"
}
```

When token is missing, returns unauthorized (401). When token is incorrect or there was an error, returns internal server error (500).

---

### POST /api/details/

Upserts the current config for the details.

The authentication token needs to be passed in the header field `x-access-token`.

Params:

- name: string, optional

Example body:

```json
{
  "name": "New ONG"
}
```

When request is done correctly, returns success (200). Example response:

```json
{
  "current": true,
  "name": "New ONG",
  "_id": "60b24ffd4354b56dffd5f7cc",
  "__v": 0,
  "createdAt": "2021-05-29T14:30:21.652Z",
  "updatedAt": "2021-05-29T14:30:21.652Z"
}
```

When token is missing, returns unauthorized (401). When there is an error with the request body, returns bad request (400). When token is incorrect or there was an error with the params passed, returns internal server error (500).

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
