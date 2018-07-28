const { Section, Project } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const { projectId } = req.params;

      await Section.create(
        {
          ...req.body,
          ProjectId: projectId,
        },
      );

      req.flash('suceess', 'Seção criada com sucesso');

      return res.redirect(`/app/projects/${projectId}/`);
    } catch (error) {
      return next(error);
    }
  },

  async show(req, res, next) {
    try {
      const { projectId, id } = req.params;

      // const projects = await Project.findAll({
      //   include: [Section],
      //   where: {
      //     UserId: req.session.user.id,
      //   },
      // });

      const sections = await Section.findAll({
        where: { ProjectId: projectId },
      });

      const section = await Section.findById(id);

      return res.redirect(`/app/projects/${projectId}/section/${id}`, {
        currentSection: section,
        sections,
      });
    } catch (error) {
      return next(error);
    }
  },
  async find(req, res, next) {
    try {
      const project = await Project.findById(req.params.projectId);

      const sections = await Section.findAll({
        where: { ProjectId: req.params.projectId },
      });

      const section = await Section.findById(req.params.id);

      return res.render('project/index', {
        user: req.session.user, project, sections, section, activeSection: req.params.id,
      });
    } catch (error) {
      return next(error);
    }
  },
  async destroy(req, res, next) {
    try {
      await Section.destroy({ where: { id: req.params.id } });

      req.flash('success', 'Seção deletada com sucesso');

      return res.redirect(`/app/projects/${req.params.projectId}/`);
    } catch (error) {
      return next(error);
    }
  },

};
