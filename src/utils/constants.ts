export enum ERROR_MSG {
  INVALID_USERNAME = 'Invalid name, only letters, digits and @-_. are correct',
  SHORT_USERNAME = 'Length of name must be at least 5 chars',
  SHORT_PASSWORD = 'Length of password must be at least 5 chars',
  WRONG_PASSWORD = 'Wrong password',
  NOT_FOUND_USER = 'Not found user with this UUID',
  NOT_FOUND_TRACK = 'Not found track with this UUID',
  NOT_FOUND_ARTIST = 'Not found artist with this UUID',
  NOT_FOUND_ALBUM = 'Not found album with this UUID',
  NOT_FOUND_IN_FAVS = 'Favorites doesnt contain this element',
  NOT_AUTHORIZED = 'Only authorized users can access this entry',
  LOGIN_IS_USED = 'This login is already used, try another',
  SERVER_ERROR = 'Interval server error',
}
