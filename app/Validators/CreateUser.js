'use strict'

class CreateUser {
  get rules() {
    return {
      'username': 'required|unique:users',
      'email': 'required|unique:users',
      'password': 'required'
    }
  }

  get messages() {
    return {
      'required': 'Slow down, the {{ field }} is required',
      'unique': 'Wait, that {{ field }} already exists'
    }
  }

  async fails(err) {
    this.ctx.session.withErrors(err).flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = CreateUser
