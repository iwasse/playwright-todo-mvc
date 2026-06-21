# Testes com Playwright integrado a Pipeline de CI/CD (GitHub Actions)

Este repositório contém uma suíte de testes automatizados para a aplicação **TodoMVC** utilizando **[Playwright](https://playwright.dev/)**, integrada a uma pipeline de integração contínua (CI) robusta e otimizada via **GitHub Actions**.

**Disclaimer:** o repositório não tem todos os testes que deveria, é apenas um projeto para servir de exemplo

---

## Objetivos Atendidos pelo Projeto

O projeto contempla integralmente todos os seguintes objetivos de integração contínua e automação de testes:

1. **Pipeline de CI Automatizada**: Configurada no arquivo `ci.yml`.
2. **Execução por Push**: O pipeline roda automaticamente sempre que há novos commits ou Pull Requests nas branches `main`.
3. **Execução Manual (`workflow_dispatch`)**: Possibilidade de iniciar o pipeline sob demanda diretamente pela interface web do GitHub.
4. **Execução Agendada (`schedule/cron`)**: Configurado para rodar de forma agendada todos os dias às `00:00 UTC` (21:00 no horário de Brasília) para validar a estabilidade periódica do ambiente.
5. **Geração de Relatórios**: Execução de testes configurada para gerar relatórios detalhados em formato HTML (`playwright-report`).
6. **Armazenamento e Publicação de Artefatos**: O relatório gerado é empacotado e anexado à execução da pipeline como um artefato (`playwright-report`), ficando disponível para download por até 30 dias.

---

## Conceitos e Soluções Utilizadas no Pipeline

### Gatilhos de Execução (Triggers)
Definidos sob a chave `on:` no arquivo de workflow, o pipeline responde a:
* **`push` e `pull_request`**: Garante feedback rápido de integração.
* **`workflow_dispatch`**: Útil para executar testes pontuais após alterações de infraestrutura ou testes exploratórios.
* **`schedule`**: Execuções automáticas periódicas sem necessidade de intervenção humana (ideal para testes de regressão noturnos).

### Estratégias de Otimização e Cache
Para reduzir o tempo de execução e o consumo de recursos (minutos cobrados pelo GitHub Actions):
* **Cache do NPM**: Utiliza a diretiva `cache: 'npm'` no passo `actions/setup-node` para evitar baixar novamente os pacotes instalados por `npm ci`.
* **Cache dos Navegadores**: Utiliza `actions/cache` para salvar a pasta `~/.cache/ms-playwright`. Se houver um *cache hit*, os arquivos dos navegadores (Chromium, Firefox, WebKit) não são baixados novamente, poupando minutos preciosos de rede e processamento.
* **Controle de Concorrência**: A configuração `concurrency` com `cancel-in-progress: true` garante que se um novo commit for enviado à mesma branch/PR enquanto um teste anterior ainda estiver rodando, a execução antiga será abortada imediatamente, focando apenas no código mais recente.

---

## Padrão de Projeto de Testes (Design Pattern)

Este projeto implementa uma variação simplificada de **Page Objects**, frequentemente chamada de **Action-Based Testing**:
* **Ações Compartilhadas ([todo-actions.ts](file:///Users/iwasse/Projects/playwright-todo-mvc-1/app-actions/todo-actions.ts))**: Funções como **[addToDo](file:///Users/iwasse/Projects/playwright-todo-mvc-1/app-actions/todo-actions.ts#L10)** e **[removeToDo](file:///Users/iwasse/Projects/playwright-todo-mvc-1/app-actions/todo-actions.ts#L26)** encapsulam seletores complexos e interações com a página. Isso centraliza e simplifica a manutenção dos testes.
* **Cenários de Teste ([todo-demo1.spec.ts](file:///Users/iwasse/Projects/playwright-todo-mvc-1/tests/todo-demo1.spec.ts))**: Arquivo focado apenas em fluxo de execução e asserções (comparações dos estados esperados usando `expect`).

---

## Como Executar o Projeto Localmente

### Pré-requisitos
* [Node.js](https://nodejs.org/) (versão 20 ou superior recomendada)
* npm (geralmente instalado junto ao Node.js)

### Instruções

1. **Instalar as dependências do projeto:**
   ```bash
   npm install
   ```

2. **Instalar os navegadores do Playwright:**
   ```bash
   npx playwright install
   ```

3. **Executar a suite completa de testes:**
   ```bash
   npx playwright test
   ```

4. **Visualizar o relatório de testes interativo:**
   ```bash
   npx playwright show-report
   ```