# Home Library Service
Home music library service
RS School NodeJS course final task
## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/existanz/nodejs2023Q2-service.git
```
change branch to develop
```
git checkout develop
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm run start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

## Auto-fix and format

```
npm run lint
```

```
npm run format
```
## Api
Full documentation of all entries are available in swagger [/doc](http://localhost:4000/doc/)

<details> 
<summary>/user:</summary>

- `GET /user` - to get all users

- `GET /user/:id` - get single user by id

- `POST /user` - create new user 

- `PUT /user/:id` - update user's password _only if you know old password_

- `DELETE /user/:id` - delete user

</details>

<details>
<summary>/track:</summary>

- `GET /track` - get all tracks

- `GET /track/:id` - get single track by id

- `POST /track` - create new track:

- `PUT /track/:id` - update track

- `DELETE /track/:id` - delete track

</details>
<details>
<summary>/artist:</summary>

- `GET /artist` - get all artists

- `GET /artist/:id` - get single artist by id

- `POST /artist` - create new artist

- `PUT /artist/:id` - update artist

- `DELETE /artist/:id` - delete artist
</details>
<details>
<summary>
/album:
</summary>

- `GET /album` - get all albums

- `GET /album/:id` - get single album by id

- `POST /album` - create new album

- `PUT /album/:id` - update album

- `DELETE /album/:id` - delete album
</details>
<details>
<summary>
/favs:
</summary>

- `GET /favs` - get all favorites

- `POST /favs/track/:id` - add track to the favorite

- `DELETE /favs/track/:id` - delete track from favorites

- `POST /favs/album/:id` - add album to the favorites

- `DELETE /favs/album/:id` - delete album from favorites

- `POST /favs/artist/:id` - add artist to the favorites

- `DELETE /favs/artist/:id` - delete artist from favorites
</details>