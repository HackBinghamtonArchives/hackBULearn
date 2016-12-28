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

exports.hackathonForm = {
  name : { presence: true },
  facility : { presence: true },
  university : { presence: true },
  streetAddress : { presence: true },
  city : { presence: true },
  state : { presence: true },
  zipCode : { presence: true },
  country : { presence: true },
  startDate : { presence: true },
  endDate : { presence: true },
  bannerImage : { presence: true },
  websiteURL : { presence: true },
  registrationURL : { presence: true },
  capacity : { presence: true }
};

exports.courseForm = {
  title : { presence: true },
  description: { presence: true },
  thumbnail: { presence: true }
};
