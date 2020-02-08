import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class EnrollmentMail {
  get key() {
    return 'EnrollmentMail';
  }

  // handle é o método que executa o job
  async handle({ data }) {
    const { enrollment, student, plan, end_date, priceEnrollment } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula Confirmada',
      template: 'enrollment',
      context: {
        name: student.name,
        plan: `${plan.title} (${plan.duration} meses)`,
        start_dade: format(parseISO(enrollment.start_date), "dd'/'MM'/'yyyy", {
          locale: pt,
        }),
        end_date: format(parseISO(end_date), "dd'/'MM'/'yyyy", {
          locale: pt,
        }),
        price_calculed: `R$ ${priceEnrollment}`,
      },
    });
  }
}

export default new EnrollmentMail();
