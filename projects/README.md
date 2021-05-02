# Projects

Microservice to manage projects from the organization. Only admins can use it.

Before running this, pleashe check the `.sample-env` file and then create the `.env` file. The "SECRET" var needs to be the same as the one from the Authentication service.

To run it, use the `docker-compose.yml` file in the main folder from the project.

## Routes

### GET /api/projects/

Lists all the projects sorted by startDate (DESC).

The authentication token needs to be passed in the header field `x-access-token`.

You can filter by `status` (which can be `PENDING`, `FINISHED` or `CANCELED`), `minStartDate`, `maxStartDate`, `minCostDate`, `maxCostDate`, `minIncomeDate`, `maxIncomeDate`, `miIncome` or `maxCost` using query string params (e.g. `/api/employees/?status=PENDING&maxCost=10`)

When request is done correctly, returns success (200). Example response:

```json
[
  {
    "id": 1,
    "name": "1st project",
    "startDate": "2021-02-05",
    "endDate": "2021-06-05",
    "incomeDate": "2021-06-05",
    "costDate": "2021-02-05",
    "expectedIncome": 200,
    "expectedCost": 1,
    "description": "cool event",
    "target": "all the people",
    "status": "PENDING",
    "responsibleArea": null,
    "responsibleTeam": null,
    "createdAt": "2021-05-01T22:48:11.650Z",
    "updatedAt": "2021-05-01T22:48:11.650Z"
  }
]
```

When token is missing, returns unauthorized (401). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### GET /api/projects/:id

Gets project with id passed

The authentication token needs to be passed in the header field `x-access-token`.

When request is done correctly, returns success (200). Example response:

```json
{
  "id": 1,
  "name": "1st project",
  "startDate": "2021-02-05",
  "endDate": "2021-06-05",
  "incomeDate": "2021-06-05",
  "costDate": "2021-02-05",
  "expectedIncome": 200,
  "expectedCost": 1,
  "description": "cool event",
  "target": "all the people",
  "status": "PENDING",
  "responsibleArea": null,
  "responsibleTeam": null,
  "createdAt": "2021-05-01T22:48:11.650Z",
  "updatedAt": "2021-05-01T22:48:11.650Z"
}
```

When token is missing, returns unauthorized (401). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### POST /api/projects/

Creates a new employee.

The authentication token needs to be passed in the header field `x-access-token`.

Params:

- name: string
- startDate: date, format `yyyy-mm-dd`
- endDate: date, format `yyyy-mm-dd`, optional
- incomeDate: date, format `yyyy-mm-dd`, optional
- costDate: date, format `yyyy-mm-dd`, optional
- expectedIncome: float, optional
- expectedCost: float, optional
- description: string, optional
- target: string, optional
- status: string; must be one 1 from enum `["FINISHED", "CANCELED", "PENDING"]`, default is "PENDING", optional
- responsibleArea: string, optional
- responsibleTeam: string, optional

Example body:

```json
{
  "name": "Project for the docs",
  "startDate": "2021-02-05",
  "endDate": "2021-06-05",
  "incomeDate": "2022-06-05",
  "costDate": "2021-02-05",
  "expectedIncome": 400.0,
  "expectedCost": 100,
  "description": "cool event",
  "target": "all the people",
  "responsibleArea": "Very cool area",
  "responsibleTeam": "cool team"
}
```

When request is done correctly, returns success (200). Example response:

```json
{
  "id": 7,
  "name": "Project for the docs",
  "startDate": "2021-02-05",
  "endDate": "2021-06-05",
  "incomeDate": "2022-06-05",
  "costDate": "2021-02-05",
  "expectedIncome": 400,
  "expectedCost": 100,
  "description": "cool event",
  "target": "all the people",
  "responsibleArea": "Very cool area",
  "responsibleTeam": "cool team",
  "updatedAt": "2021-05-02T01:02:22.521Z",
  "createdAt": "2021-05-02T01:02:22.521Z",
  "status": "PENDING"
}
```

When token is missing, returns unauthorized (401). When there is an error with the request body, returns bad request (400). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### PUT /api/projects/:id

Updates the project from the id passed.

The authentication token needs to be passed in the header field `x-access-token`.

It is necessary to pass all the params (that are mandatory). Params:

- name: string
- startDate: date, format `yyyy-mm-dd`
- endDate: date, format `yyyy-mm-dd`, optional
- incomeDate: date, format `yyyy-mm-dd`, optional
- costDate: date, format `yyyy-mm-dd`, optional
- expectedIncome: float, optional
- expectedCost: float, optional
- description: string, optional
- target: string, optional
- status: string; must be one 1 from enum `["FINISHED", "CANCELED", "PENDING"]`, default is "PENDING", optional
- responsibleArea: string, optional
- responsibleTeam: string, optional

Example body:

```json
{
  "name": "Updated Project for the docs",
  "startDate": "2021-02-05"
}
```

When request is done correctly, returns success (200). Example response:

```json
{
  "id": 7,
  "name": "Updated Project for the docs",
  "startDate": "2021-02-05",
  "endDate": "2021-06-05",
  "incomeDate": "2022-06-05",
  "costDate": "2021-02-05",
  "expectedIncome": 400,
  "expectedCost": 100,
  "description": "cool event",
  "target": "all the people",
  "status": "PENDING",
  "responsibleArea": "Very cool area",
  "responsibleTeam": "cool team",
  "createdAt": "2021-05-02T01:02:22.521Z",
  "updatedAt": "2021-05-02T01:08:44.275Z"
}
```

When token is missing, returns unauthorized (401). When there is an error with the request body, returns bad request (400). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### DELETE /api/projects/:id

Deletes the project from the id passed.

The authentication token needs to be passed in the header field `x-access-token`.

When request is done correctly, returns success (200). Example response:

```json
{
  "message": "Destroyed!"
}
```

When token is missing, returns unauthorized (401). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### GET /api/total-expected/income/

Return the sum of the total income expected

The authentication token needs to be passed in the header field `x-access-token`.

You can filter by `status` (which can be `PENDING`, `FINISHED` or `CANCELED`), `minStartDate`, `maxStartDate`, `minCostDate`, `maxCostDate`, `minIncomeDate`, `maxIncomeDate`, `miIncome` or `maxCost` using query string params (e.g. `/api/employees/?status=PENDING&maxCost=10`).

When request is done correctly, returns success (200). Example response:

```json
{
  "totalExpectedIncome": 2600
}
```

When token is missing, returns unauthorized (401). When token is incorrect or there was an error with the params passed, returns internal server error (500).

### GET /api/total-expected/cost/

Return the sum of the total cost expected

The authentication token needs to be passed in the header field `x-access-token`.

You can filter by `status` (which can be `PENDING`, `FINISHED` or `CANCELED`), `minStartDate`, `maxStartDate`, `minCostDate`, `maxCostDate`, `minIncomeDate`, `maxIncomeDate`, `miIncome` or `maxCost` using query string params (e.g. `/api/employees/?status=PENDING&maxCost=10`).

When request is done correctly, returns success (200). Example response:

```json
{
  "totalExpectedCost": 601
}
```

When token is missing, returns unauthorized (401). When token is incorrect or there was an error with the params passed, returns internal server error (500).

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
