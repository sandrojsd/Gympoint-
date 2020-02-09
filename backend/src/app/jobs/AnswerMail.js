import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  // handle é o método que executa o job
  async handle({ data }) {
    const { help_order } = data;

    await Mail.sendMail({
      to: `${help_order.student.name} <${help_order.student.email}>`,
      subject: 'Resposta de solicitação de ajuda',
      template: 'Answer',
      context: {
        name: help_order.student.name,
        question: help_order.question,
        asnwer: help_order.answer,
        date: format(parseISO(help_order.answer_at), "dd'/'MM'/'yyyy", {
          locale: pt,
        }),
      },
    });
  }
}

export default new AnswerMail();
