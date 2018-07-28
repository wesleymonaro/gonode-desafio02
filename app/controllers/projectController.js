const { Project, Section } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      await Project.create(
        {
          ...req.body,
          UserId: req.session.user.id,
        },
      );

      req.flash('success', 'Projeto criado com sucesso');

      return res.redirect('/app/dashboard');
    } catch (error) {
      return next(error);
    }
  },
  async show(req, res, next) {
    try {
      const projects = await Project.findAll({
        where: {
          UserId: req.session.user.id,
        },
      });

      return res.render('project/index', { projects });
    } catch (error) {
      return next(error);
    }
  },
  async find(req, res, next) {
    try {
      const project = await Project.findById(req.params.id);

      const sections = await Section.findAll({
        where: { ProjectId: req.params.id },
      });

      return res.render('project/index', {
        project, user: req.session.user, sections, activeSection: null,
      });
    } catch (error) {
      return next(error);
    }
  },
  async destroy(req, res, next) {
    try {
      Project.destroy({ where: { id: req.params.id } });

      req.flash('success', 'Projeto deletado com sucesso');

      return res.redirect('/app/dashboard');
    } catch (error) {
      return next(error);
    }
  },
};
