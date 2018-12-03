'use strict'

const Job = use('App/Models/Job')

class JobController {
  async home({ view }) {
    const jobs = await Job.all();
    return view.render('index', { jobs: jobs.toJSON() })
  }

  async userIndex({ view, auth }) {
    const jobs = await auth.user.jobs().fetch();
    return view.render('jobs', { jobs: jobs.toJSON() });
  }

  async create({ request, response, session, auth }) {
    const job = request.all();

    await auth.user.jobs().create({
      title: job.title,
      link: job.link,
      description: job.description
    });

    session.flash({ message: 'Your job has been posted!' });
    return response.redirect('back');
  }

  async delete({ response, session, params }) {
    const job = await Job.find(params.id);

    await job.delete();

    session.flash({ message: 'The job has been deleted!' })
    return response.redirect('back');
  }

  async edit({ params, view }) {
    const job = await Job.find(params.id);
    return view.render('edit', { job });
  }

  async update({ response, request, session, params }) {
    const job = await Job.find(params.id);

    job.title = request.all().title;
    job.link = request.all().link;
    job.description = request.all().description;

    await job.save();

    session.flash({ message: 'Your job has been updated.' });
    return response.redirect('/post-a-job');
  }
}

module.exports = JobController
