class LoginResponse {
  constructor(username, email, gender, access_token) {
    this.username = username;
    this.email = email;
    this.gender = gender;
    this.access_token = access_token;
  }
}

export default LoginResponse;
