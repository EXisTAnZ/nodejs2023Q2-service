export enum ERROR_MSG {
  INVALID_USERNAME = 'Invalid name, only letters, digits and @-_. are correct',
  SHORT_USERNAME = 'Length of name must be at least 5 chars',
  SHORT_PASSWORD = 'Length of password must be at least 5 chars',
  WRONG_PASSWORD = 'Wrong password',
  FULL_ROOM = 'Room is full, please try another room',
  NOT_FOUND_USER = 'Not found user with this UUID',
  LOGIN_IS_USED = 'This login is already used, try another',
  SERVER_ERROR = 'Interval server error',
}
