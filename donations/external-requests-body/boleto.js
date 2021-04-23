const formatDonatedValue = require("../utils/format-donated-value");

const dueDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
};

exports.boletoBody = (
  donatedValue,
  name,
  email,
  cpf,
  country,
  state,
  city,
  postalCode,
  street,
  number,
  neighborhood
) => ({
  reference_id: "donation",
  description: "Doação",
  amount: {
    value: formatDonatedValue(donatedValue),
    currency: "BRL",
  },
  payment_method: {
    type: "BOLETO",
    boleto: {
      due_date: dueDate(),
      instruction_lines: {
        line_1: "Pagamento processado para DESC Fatura",
        line_2: "Via PagSeguro",
      },
      holder: {
        name,
        tax_id: cpf.toString(),
        email,
        address: {
          country,
          regionCode: state,
          city,
          postal_code: postalCode.toString(),
          street,
          number: number.toString(),
          locality: neighborhood,
        },
      },
    },
  },
  notification_urls: [
    // TODO: ADD URL
    "https://yourserver.com/nas_ecommerce/277be731-3b7c-4dac-8c4e-4c3f4a1fdc46/",
  ],
});
