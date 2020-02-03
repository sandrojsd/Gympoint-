import * as Yup from 'yup';
import { parseISO, addMonths, isBefore } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

class EnrollmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const enrollments = await Enrollment.findAll({
      attributes: ['id', 'price', 'start_date', 'end_date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'price', 'duration'],
        },
      ],
    });

    return res.json(enrollments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Vaidação de campos inválida' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const activePlan = await Enrollment.findOne({
      where: { student_id, end_date: null },
    });

    if (activePlan) {
      return res
        .status(401)
        .json({ error: 'O estudante tem um plano ainda ativo' });
    }

    const startDay = parseISO(start_date);

    if (isBefore(startDay.getDate(), new Date().getDate())) {
      return res
        .status(400)
        .json({ error: 'A data inicial do plano é inferior ao dia atual' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(401).json({ error: 'Plano não encontrado' });
    }

    const priceEnrollment = plan.price * plan.duration;

    const end_date = addMonths(startDay, plan.duration);

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price: priceEnrollment,
    });

    return res.json(enrollment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Vaidação de campos inválida' });
    }

    const { plan_id, start_date } = req.body;

    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(401).json({ error: 'Matrícula não encontrada' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(401).json({ error: 'Plano não encontrodo' });
    }

    const calcPrice = plan.price * plan.duration;
    enrollment.price = calcPrice;
    enrollment.start_date = start_date;
    enrollment.end_date = addMonths(parseISO(start_date), plan.duration);

    enrollment.save();

    return res.json(enrollment);
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(401).json({ error: 'Matrícula não encontrada.' });
    }

    await Enrollment.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({ sucess: 'Matrícula exluída com sucesso' });
  }
}

export default new EnrollmentController();
