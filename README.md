# Snake Game - Minha Versão

  [![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/marcelloc97/snake-game/blob/master/LICENSE)
  ![](https://img.shields.io/badge/version-v1.0-red)
  ![](https://img.shields.io/badge/languages-3-blue)
  [![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/)
  ![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)

  ## Índice

  - [Descrição](#descrição)
  - [Versões](#versões)
  - [Game](#game)
    - [Requisitos](#requisitos)
    - [Bonus-tasks](#bonus-tasks)
    - [Adicionais](#adicionais)
    - [Como jogar?](#como-jogar)
  
  - [Meu GITHUB](#meu-github)

  ## Descrição
  Fui desafiado a criar, em curto prazo, um jogo. A proposta foi criar um 'snake game' básico, porém, minhas ideias continuam crescendo. \
  Em breve criarei outras mecânicas e inclusive um modo **Multiplayer online**, será mais trabalhoso, porém divertido. \
  Futuramente haverá mais atualizações no projeto.

  ## Versões
  Existe duas versões atualmente, ***singleplayer*** e ***two players***. \
  A singleplayer estará disponível junto com os arquivos desse repositório. Pode ser acessado através da página principal! \
  A multiplayer online estará disponível em breve no meu github.

  ## Game

  ### Requisitos

  O que você precisa é só acessar [esta](https://marcelloc97.github.io/snake-game) página para jogar. \
  Necessário conexão para acessar a página. \
  Pontuações serão armazenadas no seu computador. Para ter acesso offline. \
  **PS.: Apenas no navegador em um computador. Não disponível para Mobile.**

    O jogo foi constituído com:
  
      * Arena. Simplesmente um espaço com, no mínimo, 10x10 pixels. ✅
      * Cobra. Nossa cobra será o elemento que será controlado pelo jogador. Ela deverá ser composta por, pelo menos, um quadrado de 1x1 pixels. ✅
      * Fruta. A fruta será o objetivo do jogador. Ela deverá ser feita por um quadrado de 1x1 pixels e com uma cor diferente do da Cobra. ✅

    As regras são simples:
    
      * O jogador deverá controlar a cobra pela arena atrás da fruta. ✅
      * Ao encostar na fruta, ela é consumida e o jogador ganha pontos, que devem ser exibidos em algum lugar na tela. ✅
      * Sempre deve ter pelo menos uma fruta na arena, então, se o jogador consumir a fruta, outra deve ser gerada ao mesmo tempo. ✅

  ### Bonus-tasks:
  
    As tarefas abaixo não são obrigatórias, mas serão diferenciais!

      * A cobra cresce em 1 pixel a cada fruta comida. Os pixels subsequentes devem seguir o primeiro comando gerado. ✅
      * Quando a cobra tenta avançar sobre os limites da arena, ela surge na direção oposta. ✅
      * O jogo acaba quando a cobra encosta em alguma parte do seu próprio corpo. ✅
      * O jogo está adaptado para interface mobile. ❌ (Ainda não!)
      * Multi-jogador! É possível ter 2 jogadores ao mesmo tempo na tela competindo. Os jogadores não interagem entre si, somente comem as frutas. ✅

  ### Adicionais:
    * Highscore, uma pontuação máxima que fica registrada no localStorage do Browser.
    * Efeitos sonoros, sim! Fica daora o jogo. Dentre esses sons tem um BGM (Background Music) e mais 3 sons referentes a consumo da Fruta, quando toca seu próprio corpo e Game Over.

  ### Como jogar?
  É bem simples. \
  Ao jogar o modo *Singleplayer*, tudo que precisa fazer é mover a ~~cobrinha~~ (retângulo que se move...) e coletar as ~~frutas~~ (quadrados vermelhos). Para controlar a "cobrinha", utilize W, A, D ou S. \
  \
  Jogando o modo *Two players*, cada um controla uma "cobrinha". Uma verde e outra amarela. O objetivo é o mesmo, porém, vocês "competem" entre si. \
  Mas um **detalhe**!!! Se um morrer, começa tudo de novo. ***Um desafio a mais para vocês***! Para controlar suas "cobrinhas", o jogador nº 1 usa W, A, D ou S, o jogador nº 2 usa as setas! \
  \
  Fácil não é?



# Meu GITHUB
  O repositório está livre! Use **``git clone https://github.com/marcelloc97/snake-game``** para poder editar. \
  O código ficará aberto para quem quiser contribuir.


# Muito obrigado e um forte abraço!