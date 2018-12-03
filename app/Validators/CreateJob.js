'use strict'

class CreateJob {
  get rules() {
    return {
      title: 'required',
      link: 'required'
    }
  }

  get messages() {
    return {
      required: 'The {{ field }} is required.'
    }
  }

  async fails(err) {
    this.ctx.session.withErrors(err).flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = CreateJob
