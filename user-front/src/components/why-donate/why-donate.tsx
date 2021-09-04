import React from "react";
import { ReasonCard, ReasonsContainer } from "./why-donate.style";

interface IWhyDonate {}

const WhyDonate: React.FC<IWhyDonate> = () => {
  return (
    <ReasonsContainer>
      <ReasonCard>👓 Porque somos transparentes</ReasonCard>
      <ReasonCard>
        📈 Porque investimos o dinheiro doado em marketing digital para captar
        mais recursos
      </ReasonCard>
      <ReasonCard>📅 Porque gerenciamos bem nossos projetos</ReasonCard>
      <ReasonCard>
        🧑‍🤝‍🧑 Porque temos toda uma equipe de colaboradores por trás de nossa
        organização
      </ReasonCard>
    </ReasonsContainer>
  );
};

export default WhyDonate;
