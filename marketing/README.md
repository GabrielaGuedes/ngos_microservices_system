# Marketing

Microservice to manage the finances from the organization. Only admins can use it.

Before running this, pleashe check the `.sample-env` file and then create the `.env` file. The "SECRET" var needs to be the same as the one from the Authentication service.

To run it, use the `docker-compose.yml` file in the main folder from the project.

## Routes

You can check the full description of each one below the table.

| Endpoint                                | Only Admin | Response                                                      | Headers        | Filters                                             | Description                                                              |
| --------------------------------------- | ---------- | ------------------------------------------------------------- | -------------- | --------------------------------------------------- | ------------------------------------------------------------------------ |
| GET /api/transactions                   | True       | -                                                             | x-access-token | origin, recurrent, showCanceled, minValue, maxValue | Returns all transactions                                                 |
| GET /api/transactions/:id               | True       | -                                                             | x-access-token | -                                                   | Returns the transaction with the id                                      |
| POST /api/transactions/                 | True       | date, value, origin, kind, recurrent, description, canceledAt | x-access-token | -                                                   | Creates a new transaction                                                |
| PUT /api/transactions/                  | True       | date, value, origin, kind, recurrent, description, canceledAt | x-access-token | -                                                   | Updates the transaction                                                  |
| DELETE /api/transactions/:id            | True       | -                                                             | x-access-token | -                                                   | Deletes the transaction                                                  |
| GET /api/goals                          | True       | -                                                             | x-access-token | reached                                             | Returns all goals                                                        |
| GET /api/goals/:id                      | True       | -                                                             | x-access-token | -                                                   | Returns the goal with id                                                 |
| POST /api/goals/                        | True       | goalValue, currentValue, deadline, reached, description       | x-access-token | -                                                   | Creates a new goal                                                       |
| PUT /api/goals/                         | True       | goalValue, currentValue, deadline, reached, description       | x-access-token | -                                                   | Updates the goal                                                         |
| DELETE /api/goals/:id                   | True       | -                                                             | x-access-token | -                                                   | Deletes the goal                                                         |
| GET /api/grouped-transactions/by-origin | True       | -                                                             | x-access-token | kind, showCanceled                                  | Returns the not canceled transactions grouped by origin                  |
| GET /api/totals/current-value           | True       | -                                                             | x-access-token | -                                                   | Returns the total value considering the INs and OUTs                     |
| GET /api/totals/recurrent-transactions  | True       | -                                                             | x-access-token | -                                                   | Returns the recurrent value per month, without the canceled transactions |
| GET /api/totals/all-origins             | True       | -                                                             | x-access-token | -                                                   | Returns all the origins found in the transactions                        |

### GET /api/transactions/

Lists all the transactions not canceled sorted by date (DESC).

The authentication token needs to be passed in the header field `x-access-token`.

You can filter by `origin`, `minValue`, `maxValue`, `recurrent` or `showCanceled` (boolean) using query string params (e.g. `/api/transactions/?origin=Donation&maxValue=10`)

When request is done correctly, returns success (200). Example response:

```json
[
  {
    "id": 1,
    "date": "2021-01-01",
    "value": 100,
    "origin": "Donation",
    "kind": "IN",
    "recurrent": true,
    "description": "Donation that occurs every month",
    "canceledAt": null,
    "createdAt": "2021-05-07T01:14:24.893Z",
    "updatedAt": "2021-05-07T01:14:24.893Z"
  }
]
```

When token is missing, returns unauthorized (401). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### GET /api/transactions/:id

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

### POST /api/transactions/

Creates a new employee.

The authentication token needs to be passed in the header field `x-access-token`.

Params:

- date: date, format `yyyy-mm-dd`
- value: float
- origin: string
- kind: string; must be from enum `["IN", "OUT"]`
- recurrent: boolean (the considered period for recurrence is month)
- description: string, optional
- canceledAt: date, format `yyyy-mm-dd`, optional; this field is only necessary for canceled transactions that are recurrent

Example body:

```json
{
  "date": "2021-01-01",
  "value": 100.0,
  "origin": "Donation",
  "kind": "IN",
  "recurrent": true,
  "description": "Donation that occurs every month"
}
```

When request is done correctly, returns success (200). Example response:

```json
{
  "id": 1,
  "date": "2021-01-01",
  "value": 100,
  "origin": "Donation",
  "kind": "IN",
  "recurrent": true,
  "description": "Donation that occurs every month",
  "updatedAt": "2021-05-07T01:14:24.893Z",
  "createdAt": "2021-05-07T01:14:24.893Z",
  "canceledAt": null
}
```

When token is missing, returns unauthorized (401). When there is an error with the request body, returns bad request (400). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### PUT /api/transactions/:id

Updates the project from the id passed.

The authentication token needs to be passed in the header field `x-access-token`.

It is necessary to pass all the params (that are mandatory). Params:

- date: date, format `yyyy-mm-dd`
- value: float
- origin: string
- kind: string; must be from enum `["IN", "OUT"]`
- recurrent: boolean (the considered period for recurrence is month)
- description: string, optional
- canceledAt: date, format `yyyy-mm-dd`, optional; this field is only necessary for canceled transactions that are recurrent

Example body:

```json
{
  "date": "2021-01-01",
  "value": 100.0,
  "origin": "Donation",
  "kind": "IN",
  "recurrent": true,
  "description": "Donation that occurs every month",
  "canceledAt": "2021-02-02"
}
```

When request is done correctly, returns success (200). Example response:

```json
{
  "id": 1,
  "date": "2021-01-01",
  "value": 100,
  "origin": "Donation",
  "kind": "IN",
  "recurrent": true,
  "description": "Donation that occurs every month",
  "canceledAt": "2021-02-02",
  "createdAt": "2021-05-07T01:14:24.893Z",
  "updatedAt": "2021-05-07T01:21:58.292Z"
}
```

When token is missing, returns unauthorized (401). When there is an error with the request body, returns bad request (400). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### DELETE /api/transactions/:id

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

### GET /api/goals/

Lists all the goals not canceled sorted by deadline (ASC).

The authentication token needs to be passed in the header field `x-access-token`.

You can filter by `reached` (boolean) using query string params (e.g. `/api/goals/?reached=true`)

When request is done correctly, returns success (200). Example response:

```json
[
  {
    "id": 1,
    "goalValue": 100,
    "currentValue": 0,
    "deadline": "2025-02-02",
    "reached": null,
    "description": "Very important goal",
    "createdAt": "2021-05-07T01:25:15.449Z",
    "updatedAt": "2021-05-07T01:25:15.449Z"
  }
]
```

When token is missing, returns unauthorized (401). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### GET /api/goals/:id

Gets goal with id passed

The authentication token needs to be passed in the header field `x-access-token`.

When request is done correctly, returns success (200). Example response:

```json
{
  "id": 1,
  "goalValue": 100,
  "currentValue": 0,
  "deadline": "2025-02-02",
  "reached": null,
  "description": "Very important goal",
  "createdAt": "2021-05-07T01:25:15.449Z",
  "updatedAt": "2021-05-07T01:25:15.449Z"
}
```

When token is missing, returns unauthorized (401). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### POST /api/goals/

Creates a new employee.

The authentication token needs to be passed in the header field `x-access-token`.

Params:

- goalValue: float
- currentValue: float
- deadline: date, format `yyyy-mm-dd`
- reached: boolean, optional
- description: string, optional

Example body:

```json
{
  "goalValue": 100.0,
  "currentValue": 0.0,
  "deadline": "2025-02-02",
  "description": "Very important goal"
}
```

When request is done correctly, returns success (200). Example response:

```json
{
  "id": 1,
  "goalValue": 100,
  "currentValue": 0,
  "deadline": "2025-02-02",
  "description": "Very important goal",
  "updatedAt": "2021-05-07T01:25:15.449Z",
  "createdAt": "2021-05-07T01:25:15.449Z",
  "reached": null
}
```

When token is missing, returns unauthorized (401). When there is an error with the request body, returns bad request (400). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### PUT /api/goals/:id

Updates the goal from the id passed.

The authentication token needs to be passed in the header field `x-access-token`.

It is necessary to pass all the params (that are mandatory). Params:

- goalValue: float
- currentValue: float
- deadline: date, format `yyyy-mm-dd`
- reached: boolean, optional
- description: string, optional

Example body:

```json
{
  "goalValue": 100.0,
  "currentValue": 100.0,
  "deadline": "2025-02-02",
  "description": "Very important goal",
  "reached": true
}
```

When request is done correctly, returns success (200). Example response:

```json
{
  "id": 1,
  "goalValue": 100,
  "currentValue": 100,
  "deadline": "2025-02-02",
  "reached": true,
  "description": "Very important goal",
  "createdAt": "2021-05-07T01:25:15.449Z",
  "updatedAt": "2021-05-07T01:29:04.423Z"
}
```

When token is missing, returns unauthorized (401). When there is an error with the request body, returns bad request (400). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### DELETE /api/goals/:id

Deletes the goal from the id passed.

The authentication token needs to be passed in the header field `x-access-token`.

When request is done correctly, returns success (200). Example response:

```json
{
  "message": "Destroyed!"
}
```

When token is missing, returns unauthorized (401). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### GET /api/grouped-transactions/by-origin

Returns the not canceled transactions grouped by origin.

The authentication token needs to be passed in the header field `x-access-token`.

You can filter by `kind` ("IN" or "OUT") or `showCanceled` (boolean) using query string params (e.g. `/api/transactions/?showCanceled=true&kind=IN`)

When request is done correctly, returns success (200). Example response:

```json
[
  {
    "origin": "Bills",
    "totalValue": 100
  },
  {
    "origin": "Donation",
    "totalValue": 100
  }
]
```

When token is missing, returns unauthorized (401). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### GET /api/totals/current-value

Returns the current value (obtained by the sum of all transactions, including recurrent transactions, considering the transaction period to be 1 month)

The authentication token needs to be passed in the header field `x-access-token`.

When request is done correctly, returns success (200). Example response:

```json
{
  "currentValue": 400
}
```

When token is missing, returns unauthorized (401). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### GET /api/totals/recurrent-transactions

Returns the total recurrent value that is in or out (if the result is negative) per month. It does not consider canceled transactions

The authentication token needs to be passed in the header field `x-access-token`.

When request is done correctly, returns success (200). Example response:

```json
{
  "currentValue": 100
}
```

When token is missing, returns unauthorized (401). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### GET /api/totals/all-origins

Returns all the origins registered in reacords

The authentication token needs to be passed in the header field `x-access-token`.

When request is done correctly, returns success (200). Example response:

```json
["Donation", "Bills"]
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
