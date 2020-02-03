import * as Yup from 'yup';

import Help_order from '../models/Help_order';
import Student from '../models/Student';

class Help_orderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const help_order = await Help_order.findAll({
      where: {
        student_id: req.params.id,
      },
      attributes: ['id', 'answer', 'created_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(help_order);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Vaidação de campos inválida' });
    }

    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(401).json({ error: 'Estudante não encontrado' });
    }

    const help_order = await Help_order.create({
      student_id: student.id,
      question: req.body.question,
    });

    return res.json(help_order);
  }
}

export default new Help_orderController();
