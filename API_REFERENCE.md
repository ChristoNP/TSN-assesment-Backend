# API Reference

Base URL: `/api`

## GET /api/questions
Returns the list of assessment questions (ordered by `order` ascending).

**Response 200**
```json
{
  "status": "OK",
  "message": "Questions retrieved successfully",
  "data": [
    {
      "id": 1,
      "text": "string",
      "order": 1,
      "weight": 1,
      "createdAt": "2025-08-20T15:40:00.000Z",
      "updatedAt": "2025-08-20T15:40:00.000Z"
    }
  ]
}
```

---

## GET /api/submissions
Returns the list of all users submission.

**Response 200**
```json
{
  "status": "OK",
  "message": "Submission created successfully",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "department": "Engineering",
    "years": 3,
    "average": 4.2,
    "createdAt": "2025-08-20T16:00:00.000Z",
    "updatedAt": "2025-08-20T16:00:00.000Z"
  }
}
```

**Validation Errors**
- If submission not found, response is `404` with:
```json
{
  "status": "ERROR",
  "message": "Submission not found",
  "data": null
}
```

**Server Error 500**
```json
{
  "status": "ERROR",
  "message": "<error message>",
  "data": null
}
```

## GET /api/submissions/:id
Returns the submission of selected user.

**Response 200**
```json
{
  "status": "OK",
  "message": "Submission created successfully",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "department": "Engineering",
    "years": 3,
    "average": 4.2,
    "createdAt": "2025-08-20T16:00:00.000Z",
    "updatedAt": "2025-08-20T16:00:00.000Z"
  }
}
```

**Validation Errors**
- If submission not found, response is `404` with:
```json
{
  "status": "ERROR",
  "message": "Submission not found",
  "data": null
}
```

**Server Error 500**
```json
{
  "status": "ERROR",
  "message": "<error message>",
  "data": null
}
```

## POST /api/submissions
Stores a user's submission and calculates the average score from `answers`.

**Request Body**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "department": "Engineering",
  "years": 3,
  "answers": [4, 5, 3, 4, 5]
}
```

- `answers` must be an array of numbers. The server computes `average = sum(answers)/answers.length`.

**Response 201**
```json
{
  "status": "OK",
  "message": "Submission created successfully",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "department": "Engineering",
    "years": 3,
    "average": 4.2,
    "createdAt": "2025-08-20T16:00:00.000Z",
    "updatedAt": "2025-08-20T16:00:00.000Z"
  }
}
```

**Validation Errors**
- If Sequelize validation fails, response is `400` with:
```json
{
  "status": "ERROR",
  "message": "Validation error",
  "data": ["<error messages>"]
}
```

**Server Error 500**
```json
{
  "status": "ERROR",
  "message": "<error message>",
  "data": null
}
```

---

## Error Format
All errors are normalized by `middleware/errorHandler.js` as shown above.