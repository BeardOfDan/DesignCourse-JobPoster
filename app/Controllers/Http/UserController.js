'use strict'

const User = use('App/Models/User')

class UserController {
  async create({ request, response, auth }) {
    const user = await User.create(request.only(['username', 'email', 'password']));

    await auth.login(user); // login the user after they are created

    return response.redirect('/')
  }

  async login({ request, response, auth, session }) {
    const { email, password } = request.all();

    try {
      await auth.attempt(email, password);
      return response.redirect('/')
    } catch (err) {
      session.flash({ loginError: 'These credentials are not valid' });
      return response.redirect('back'); // to the login page
    }
  }
}

module.exports = UserController
