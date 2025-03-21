# 🎬 OxeVídeo

<!-- ![OxeVídeo Logo](public/og-image.png) -->

## 📝 Descrição

**OxeVídeo** é uma plataforma online rápida e intuitiva para baixar vídeos de forma prática, inspirada no carisma do Nordeste brasileiro. Com uma interface amigável e processamento eficiente, o OxeVídeo permite que você salve seus vídeos favoritos de diversas plataformas com apenas alguns cliques.

## 🚀 Tecnologias Utilizadas

- **React** - Biblioteca para construção de interfaces
- **TypeScript** - Superset tipado de JavaScript
- **Vite** - Build tool e ambiente de desenvolvimento
- **TailwindCSS** - Framework CSS para estilização
- **Radix UI** - Componentes modernos e acessíveis
- **React Router DOM** - Gerenciamento de rotas
- **Zod** - Validação de dados
- **Lucide React** - Biblioteca de ícones

## ✨ Funcionalidades Principais

- ✅ **Página inicial (Landing Page)** com explicação sobre o serviço
- ✅ **Página de download** com campo para inserir o link do vídeo
- ✅ **Validação da URL** antes do download
- ✅ **Suporte a temas claro e escuro** com persistência em localStorage
- ✅ **Responsividade total** para dispositivos móveis
- ✅ **Mensagens de erro amigáveis** para o usuário
- ✅ **Visualização de informações do vídeo** antes do download
- ✅ **Escolha de formatos e qualidades** para download

## 🔧 Instalação e Configuração

Siga os passos abaixo para configurar o projeto em sua máquina local:

```bash
# Clone o repositório
git clone https://github.com/marlloncps/oxevideo.git

# Entre no diretório
cd oxevideo

# Instale as dependências
bun i 

# Ou
bun install

# Crie o arquivo .env.local com as variáveis de ambiente necessárias
echo "VITE_API_URL=https://vstream-api.vinion.dev" > .env.local

# Ou crie um aquivo .env.local na raiz do projeto e adicione a env da API
VITE_API_URL=https://vstream-api.vinion.dev

# Inicie o servidor de desenvolvimento
bun dev
```

O aplicativo estará disponível em `http://localhost:5173` em seu navegador.

## 📂 Estrutura do Projeto

```
oxevideo/
├── public/               # Arquivos estáticos
├── src/                  # Código fonte
│   ├── components/       # Componentes reutilizáveis
│   │   ├── ui/           # Componentes de UI (shadcn)
│   │   ├── layouts/      # Layouts de página
│   │   └── ...           # Outros componentes
│   ├── hooks/            # Hooks personalizados
│   ├── lib/              # Funções Úteis
│   ├── pages/            # Páginas da aplicação
│   │   ├── Index.tsx     # Página inicial
│   │   ├── Download.tsx  # Página de download
│   │   └── NotFound.tsx  # Página 404
│   ├── App.tsx           # Componente principal
│   └── main.tsx          # Ponto de entrada
├── index.html            # Template HTML
├── tailwind.config.ts    # Configuração do Tailwind
├── tsconfig.json         # Configuração do TypeScript
└── vite.config.ts        # Configuração do Vite
```

## 👥 Como Contribuir

Se você quiser contribuir com o projeto, você é bem vindo! Siga os passos abaixo e mande sua contribuição:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato e Créditos

- **Desenvolvido por:** Márllon César
- **Email:** marllon.cps@gmail.com
<!-- - **Website:** [www.oxevideo.com.br](http://www.none.com.br) -->
- **GitHub:** [github.com/marlloncps](https://github.com/marlloncps)

## 🙏 Agradecimentos

- Vinicuis José [vinicuisjosedev](https://github.com/viniciusjosedev) - Criador da API de download de vídeos.

---

Feito com ❤️ no Nordeste Brasileiro 🌵