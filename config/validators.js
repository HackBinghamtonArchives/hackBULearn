const strings = require('./strings');

exports.userLogin = {
  username: {
    presence: { message: strings.missingUsername }
  },
  password: {
    presence: { message: strings.missingPassword }
  }
};

exports.userRegistration = {
  firstname: {
    presence: { message: strings.missingFirstName }
  },
  lastname: {
    presence: { message: strings.missingLastName }
  },
  email: {
    email: true,
    presence: { message: strings.missingEmail },
  },
  username: {
    presence: { message: strings.missingUsername },
    length: { minimum: 3, tooShort: strings.usernameTooShort }
  },
  password: {
    presence: { message: strings.missingPassword },
    length: { minimum: 10, tooShort: strings.passwordTooShort }
  }
};
