# Diogo Personal Trainer

Site comercial em português com Next.js 16, React 19, TypeScript e Tailwind 4.

## Executar

```bash
npm ci
npm run dev
```

Acesse http://localhost:3000. Para produção, use `npm run build` seguido de `npm start`.

Copie `.env.example` para `.env.local` para configurar os canais. Variáveis `NEXT_PUBLIC_*` são incorporadas no build.

| Variável                      | Finalidade                                                                    |
| ----------------------------- | ----------------------------------------------------------------------------- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número oficial com código do país e DDD, somente dígitos                      |
| `NEXT_PUBLIC_INSTAGRAM_URL`   | URL HTTPS do perfil oficial                                                   |
| `NEXT_PUBLIC_SITE_URL`        | URL HTTPS do domínio para metadados de compartilhamento e validação de origem |
| `CHAT_PROVIDER_URL`           | URL HTTPS completa do endpoint de Chat Completions                            |
| `CHAT_PROVIDER_KEY`           | Credencial privada enviada como Bearer                                        |
| `CHAT_PROVIDER_MODEL`         | Identificador de modelo aceito pelo provedor                                  |

A homepage, o catálogo, a orientação do formulário e o assistente funcionam com todas as variáveis vazias. O formulário prepara o resumo no navegador. O WhatsApp abre um rascunho somente com consentimento e ação explícita. O histórico do assistente vive na memória da página e pode ser reiniciado.

O assistente usa escolhas guiadas no navegador e busca de temas no servidor para perguntas digitadas. Com as três variáveis privadas preenchidas, o adaptador de IA seleciona uma entrada autorizada. O endpoint do provedor recebe temas e títulos da base, e deve retornar o identificador em `choices[0].message.content`. O site exibe o texto aprovado da entrada, mantendo o fallback local em caso de indisponibilidade. A API limita tamanho, concorrência e frequência por processo. Em implantação com múltiplas instâncias, configure também limites compartilhados no proxy de entrada antes de habilitar o provedor em produção.

## Conteúdo e evolução

- `data/site-content.ts` contém navegação, serviços, catálogo e FAQ.
- `data/chat-knowledge.ts` contém as respostas aprovadas do assistente.
- `config/site.ts` aponta para as fotos e canais. Substitua as fotografias ilustrativas e seus textos alternativos quando os arquivos oficiais estiverem disponíveis.
- `components/About.tsx` recebe a biografia e as credenciais confirmadas. `components/Testimonials.tsx` recebe depoimentos autorizados.
- O catálogo já usa rotas por slug para evoluir para gestão de produtos, planos e pedidos. Checkout Pix/cartão e eventual integração operacional com MFIT pertencem às próximas etapas.

## Verificação

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Com o site rodando em `localhost:3000`, execute `npm run test:browser`. O conjunto de testes usa Chromium e verifica diferentes telas, navegação por teclado, formulário, catálogo, FAQ e assistente. Para testar os links com um destino fictício, rode o site e os testes com o mesmo `NEXT_PUBLIC_WHATSAPP_NUMBER` e use apenas dados de teste.
