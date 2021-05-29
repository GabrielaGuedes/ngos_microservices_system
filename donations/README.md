# Donations

Microservice to make donations using credit card (through [PagSeguro](https://dev.pagseguro.uol.com.br/v4.0/)). The admin can see the donations and the donators.

Before running this, pleashe check the `.sample-env` file and then create the `.env` file. The "SECRET" var needs to be the same as the one from the Authentication service.

To run it, use the `docker-compose.yml` file in the main folder from the project.

## Routes

You can check the full description of each one below the table.

| Endpoint                               | Only Admin | Request Fields                                                                                                                            | Headers        | Filters                                          | Description                                                              |
| -------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------ | ------------------------------------------------------------------------ |
| POST /api/donations/charge-credit-card | False      | creditCardNumber, cvv, donatedValue, expireMonth, expireYear, name, birthDate, occupation, motivation, city, state, country, email, phone | -              | -                                                | Charges the credit card, create a donation, a donator and a transaction. |
| GET /api/donations/                    | True       | -                                                                                                                                         | x-access-token | paid, source, minValue, maxValue, sortBy         | Returns the donations done                                               |
| GET /api/donators/                     | True       | -                                                                                                                                         | x-access-token | city, state, country, minValue, maxValue, sortBy | Redefines the password for the logged user                               |

### POST /api/donations/charge-credit-card

Used to create a credit card charge. It also create a transaction, in the Financial Control service, if it is enabled.

Params:

- creditCardNumber: number
- cvv: number
- donatedValue: number, the minimum is 1.0
- expireMonth: string, format `MM`
- expireYear: string, format `YYYY`
- name: string, name of the donator
- birthDate: date, format `yyyy-mm-ddThh:mm:ss+00:00`
- occupation: string, optional
- motivation: string, optional
- city: string
- state: string, preferable just the code (like `SP`)
- country: string
- email: string, unique
- phone: number, optional

When body is passed correctly, returns success (200). Example response:

```json
{
  "donationId": "12022306",
  "donatorId": "2558745012"
}
```

When there is a required param missing, returns a bad request error (400). When the email is already being used or there is another error, returns internal server error (500).

---

### GET /api/donations/

Used to check donations done

Query string optional params:

- paid: it can be `true` or `false`. If not passed, returns all the donations. When it is true, returns only paid donations. When it is false, returns only not paid donations
- source: currently, there is only 1 source, `CREDIT_CARD`
- minValue: float
- maxValue: float
- sortBy: string, can be sorted by any of the fields: `status`, `updatedAt`, `amount`, `donatorEmail`, `source`

The authentication token needs to be passed in the header field `x-access-token`.

When body is passed correctly, returns success (200). Example response:

```json
{
  "donations": [
    {
      "_id": "6084a92e9ebb06005ee61955",
      "donationId": "CHAR_5291ADCC-DA3E-4C39-B5E6-6715875A694D",
      "status": "PAID",
      "amount": 50.02,
      "donatorEmail": "teste@example.com",
      "source": "CREDIT_CARD",
      "createdAt": "2021-04-24T23:26:38.533Z",
      "updatedAt": "2021-04-24T23:26:38.533Z",
      "__v": 0
    }
  ],
  "total": 50.02
}
```

When token is missing, returns unauthorized (401). When token is incorrect or there was an error with the params passed, returns internal server error (500).

---

### GET /api/donators/

Used to check the donators

Query string optional params:

- city: string
- state: string
- country: string
- minValue: float
- maxValue: float
- sortBy: string, can be sorted by any of the fields: `name`, `birthDate`, `occupation`, `motivation`, `city`, `state`, `country`, `email`, `phone`, `donatedValue`, `updatedAt`

The authentication token needs to be passed in the header field `x-access-token`.

When body is passed correctly, returns success (200). Example response:

```json
[
  {
    "_id": "6084a92ea0bc999088f4afe6",
    "email": "teste@example.com",
    "__v": 0,
    "birthDate": "2018-11-13T20:20:39.000Z",
    "city": "São Paulo",
    "country": "Brasil",
    "createdAt": "2021-04-24T23:26:38.540Z",
    "donatedValue": 50.02,
    "motivation": "pq eu quis",
    "name": "Example name",
    "occupation": "Software Engineer",
    "phone": 5511999999999,
    "state": "SP",
    "updatedAt": "2021-04-24T23:26:38.540Z"
  }
]
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
