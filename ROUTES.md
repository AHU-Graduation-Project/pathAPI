# pathAPI routes and endpoints

## Notes:

### All routes start with '/api/v1'
### All endpoints will return the same response when the server fails.
> - status code: 500
> - response body: 
>    ```json
>    {
>        "message": "error message"
>    }
>    ```

## routes
1.  `/auth`

    - /Login

      - Method: `POST`
      - Header: ''
      - Body:
        ```json
        {
          "email": "example@domain.com",
          "password": "ABC123@*()abc"
        }
        ```

      Responses:

      - Success
        - status code: `200`
        - response body
          ```json
          {
            "profile": {
              "firstName": "ahmad",
              "lastName": "Abdelraheem",
              "email": "ahmad@email.com",
              "position": "Software Engineer",
              "Level": "Associate",
              "countryID": 6,
              "countryName": "Jordan",
              "isEmailConfirmed": true,
              "profileImage": "long blob" // may change to id and served from another endpoint
            },
            "token": "the token"
          }
          ```
      - Email does not exist
        - status code: `400`
        - response body
          ```json
          {
            "message": "Email does not exist"
          }
          ```
      - Incorrect Password
        - status code: `401`
        - response body
          ```json
          {
            "message": "Invalid credentials"
          }
          ```

    ***

    - /Signup

      - Method: `POST`
      - Header: ''
      - Body:
        ```json
        {
          "firstName": "Ahmad",
          "lastName": "Abdelraheem",
          "email": "example@domain.com",
          "password": "ABC123@*()abc"
        }
        ```
      - Responses
        - Success
          - status code: `201`
          - response
            ```json
            {
              "profile": {
                "firstName": "ahmad",
                "lastName": "Abdelraheem",
                "email": "ahmad@email.com",
                "position": "",
                "Level": "",
                "countryID": -1,
                "countryName": "",
                "isEmailConfirmed": false,
                "profileImage": null // may change to id and served from another endpoint (null will be -1)
              },
              "token": "the token"
            }
            ```
        - Email already exists
          - status code: `400`
          - response
            ```json
            {
              "message": "Email already exists"
            }
            ```

    ***

    - /Password-Recovery

      - Method: `POST`
      - Header: ''
      - Body:
        ```json
        {
          "email": "example@domain.com"
        }
        ```
      - Responses
        - Success
          - status code: `201`
          - response
            ```json
            {}
             // Will send a link with a token to user email
            ```
        - Email does not exist
          - status code: `400`
          - response
            ```json
            {
              "message": "Email does not exist"
            }
            ```

    ***

    - /Change-Password

      - Method: `POST`
      - Header:
        ```json
        {
          "Authorization": "Bearer ${user-jwt-token}"
        }
        ```
      - Body:
        ```json
        {
          "newPassword": "abcd1234",
          "oldPassword": "12345678" // Will not be required when the token is for changing password.
        }
        ```
      - Responses
        - Success
          - status code: `200`
          - response body
            ```json
            {
              "profile": {
                "firstName": "ahmad",
                "lastName": "Abdelraheem",
                "email": "ahmad@email.com",
                "position": "Software Engineer",
                "Level": "Associate",
                "countryID": 6,
                "countryName": "Jordan",
                "isEmailConfirmed": true,
                "profileImage": "long blob" // may change to id and served from another endpoint
              },
              "token": "the token"
            }
            ```
        - Failed
          - status code: `401`
          - response
            ```json
            {
              "message": "Access Denied" // old password or token is incorrect
            }
            ```

    ***

    - /Confirm-Email

      - Method: `POST`
      - Header:
        ```json
        {
          "Authorization": "Bearer ${user-jwt-token}"
        }
        ```
      - Body:
        ```json
        {
        }
        ```
      - Responses
        - Success
          - status code: `200`
          - response body
            ```json
            {
              "profile": {
                "firstName": "ahmad",
                "lastName": "Abdelraheem",
                "email": "ahmad@email.com",
                "position": "Software Engineer",
                "Level": "Associate",
                "countryID": 6,
                "countryName": "Jordan",
                "isEmailConfirmed": true,
                "profileImage": "long blob" // may change to id and served from another endpoint
              },
              "token": "the token"
            }
            ```
        - Failed
          - status code: `401`
          - response
            ```json
            {
              "message": "Access Denied" // token is incorrect
            }
            ```

2.  `/roadmap`

    - /GetById/{id}

      - Method: `GET`
      - Header: ''
      - Responses:
        - Success
          - status code: `200`
          - response body
            ```json
            {
              "id": 1,
              "title": "Official Roadmap",
              "description": "Description for official roadmap",
              "slug": "official-roadmap",
              "creator": 1,
              "isDeleted": false,
              "isOfficial": true,
              "createdAt": "2024-12-29T00:09:19.264626",
              "updatedAt": "2024-12-29T00:09:19.264626"
            }
            ```
        - Not Found
          - status code: `404`
          - response body
            ```json
            {
              "message": "Roadmap not found"
            }
            ```

    - /GetByTitle/{title}

      - Method: `GET`
      - Header: ''
      - Responses:
        - Success
          - status code: `200`
          - response body
            ```json
            {
              "id": 2,
              "title": "User Roadmap",
              "description": "Description for user roadmap",
              "slug": "user-roadmap",
              "creator": 1,
              "isDeleted": false,
              "isOfficial": false,
              "createdAt": "2024-12-29T00:09:19.264626",
              "updatedAt": "2024-12-29T00:09:19.264626"
            }
            ```
        - Not Found
          - status code: `404`
          - response body
            ```json
            {
              "message": "Roadmap not found"
            }
            ```

    - /GetBySlug/{slug}

      - Method: `GET`
      - Header: ''
      - Responses:
        - Success
          - status code: `200`
          - response body
            ```json
            {
              "id": 3,
              "title": "FrontEnd",
              "description": "front end web development",
              "slug": "frontend-roadmap",
              "creator": null,
              "isDeleted": false,
              "isOfficial": true,
              "createdAt": "2025-01-10T19:43:59.243523",
              "updatedAt": "2025-01-10T19:43:59.243523"
            }
            ```
        - Not Found
          - status code: `404`
          - response body
            ```json
            {
              "message": "Roadmap not found"
            }
            ```

    - /GetAll

      - Method: `GET`
      - Header: ''
      - Responses:
        - Success
          - status code: `200`
          - response body
            ```json
            [
              {
                "id": 1,
                "title": "Official Roadmap",
                "description": "Description for official roadmap",
                "slug": "official-roadmap",
                "creator": 1,
                "isDeleted": false,
                "isOfficial": true,
                "createdAt": "2024-12-29T00:09:19.264626",
                "updatedAt": "2024-12-29T00:09:19.264626"
              },
              {
                "id": 2,
                "title": "User Roadmap",
                "description": "Description for user roadmap",
                "slug": "user-roadmap",
                "creator": 1,
                "isDeleted": false,
                "isOfficial": false,
                "createdAt": "2024-12-29T00:09:19.264626",
                "updatedAt": "2024-12-29T00:09:19.264626"
              }
            ]
            ```
        - Failed
          - status code: `400`
          - response body
            ```json
            {
              "message": "Failed to get roadmaps"
            }
            ```



