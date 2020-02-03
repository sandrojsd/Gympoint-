import * as Yup from 'yup';
import { addDays, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const checkins = await Checkin.findAll({
      where: { student_id: req.params.id },
      attributes: ['id', 'created_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Vaidação de campos inválida' });
    }

    const { student_id } = req.body;

    const startDate = addDays(new Date(), -7);

    const endDate = new Date();

    const countCheckin = Checkin.count({
      where: {
        student_id,
        created_at: {
          [Op.between]: [startOfDay(startDate), endOfDay(endDate)],
        },
      },
    });

    if ((await countCheckin).valueOf() === 7) {
      return res.status(401).json({
        error: 'O aluno já fez 7 checkins no últimos 7 dias',
      });
    }

    const checkin = await Checkin.create(req.body);

    return res.json(checkin);
  }
}

export default new CheckinController();
