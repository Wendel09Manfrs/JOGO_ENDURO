const playground = document.querySelector('.playground')
const espacoJogador = document.querySelector('.espaco-jogador')
const main = document.querySelector('main')
const alturaEspacoJogador = espacoJogador.clientHeight
const larguraTela = main.clientWidth
const larguraPlayground = playground.clientWidth
const larguraMargem = (larguraTela - larguraPlayground) / 2
const larguraPlayer = 100
const ptoInicialPlayround = 0 + larguraPlayer
const ptoFinalPlayground = larguraTela - larguraMargem * 2 - larguraPlayer
let selecaoDificuldade = 2000 //valor padrao faacil

var hours

class Dificuldade {
  constructor() {
    this.dificuldade = document.getElementById('selecao-dificuldade')
    // this.selecao = 1100;
    this.setupEventListeners()
  }

  setupEventListeners() {
    this.dificuldade.addEventListener('change', () => {
      this.selecao = parseInt(this.dificuldade.value)
    })
  }

  escolhaDificuldade(callback) {
    // Chamamos o callback com o valor selecionado após o evento de mudança
    this.dificuldade.addEventListener('change', () => {
      this.selecao = parseInt(this.dificuldade.value)
      callback(this.selecao)
    })
  }
}

const dificuldade = new Dificuldade()
dificuldade.escolhaDificuldade((selecaoValue) => {
  selecaoDificuldade = selecaoValue
})

const tempo = document.querySelector('.timer')
const posto = document.querySelector('.gasolina')
const distancia = document.querySelector('.metros')
const lugar = document.querySelector('.rank')
const hour = document.querySelector('.hora-input')

// Função para atualizar as informações
function atualizarInformacoes() {
  // Obter os valores dos inputs
  const metrosInseridos = parseInt(
    document.querySelector('.metros-input').value,
  )
  const postoInserido = parseInt(
    document.querySelector('.gasolina-input').value,
  )
  const lugarInserido = parseInt(document.querySelector('.rank-input').value)
  const horaInserido = parseInt(document.querySelector('.hora-input').value)

  // Verificar se os valores inseridos são números válidos (números ou NaN)
  const metrosValidos = !isNaN(metrosInseridos)
  const postoValido = !isNaN(postoInserido)
  const lugarValido = !isNaN(lugarInserido)
  const horaValido = !isNaN(horaInserido)

  // Atualizar as informações na página
  if (metrosValidos) {
    distancia.innerHTML = metrosInseridos
  } else {
    distancia.innerHTML = 10000
  }

  if (postoValido) {
    posto.innerHTML = postoInserido
  } else {
    posto.innerHTML = 30 // Valor padrão se não for inserido um número válido
  }

  if (lugarValido) {
    lugar.innerHTML = lugarInserido
  } else {
    lugar.innerHTML = 100 // Valor padrão se não for inserido um número válido
  }
  if (horaValido) {
    hours = horaInserido
  } else {
    hours = 5 // Valor padrão se não for inserido um número válido
  }
}

const lugarWin = document.querySelector('.posicaoWin')
const distanciaWin = document.querySelector('.percorreuWin')

const lugarLoss = document.querySelector('.posicaoLoss')
const distanciaLoss = document.querySelector('.percorreuLoss')

const botao = document.querySelector('.start-button')

const distanciaMontain = parseInt(distancia.innerHTML)

function novoElemento(tagName, className) {
  const elemento = document.createElement(tagName)
  elemento.className = className

  return elemento
}

class Timer {
  constructor() {
    this.timer = document.querySelector('.timer')
    this.segundos = 0
    this.minutos = 0
    this.horas = 0
    this.cronometroRodando = false
    this.cronometroInterval = null
  }

  iniciarTemporizador(minutos) {
    if (!this.cronometroRodando) {
      const segundosTotais = minutos * 60
      this.segundos = segundosTotais % 60
      this.minutos = Math.floor(segundosTotais / 60)
      this.horas = 0

      this.timer.innerText = this.formatarTempo(
        this.horas,
        this.minutos,
        this.segundos,
      )
      this.cronometroInterval = setInterval(
        () => this.atualizarTemporizador(),
        1000,
      )
      this.cronometroRodando = true
    }
  }

  atualizarTemporizador() {
    if (this.segundos === 0 && this.minutos === 0 && this.horas === 0) {
      this.parar()
    }

    if (this.segundos === 10 && this.minutos === 0 && this.horas === 0) {
      this.timer.classList.add('red-blink')
    }

    if (this.segundos === 0) {
      if (this.minutos > 0) {
        this.minutos--
        this.segundos = 59
      }
      if (this.minutos === 0 && this.horas > 0) {
        this.horas--
        this.minutos = 59
      }
    } else {
      this.segundos--
    }

    this.timer.innerHTML = this.formatarTempo(
      this.horas,
      this.minutos,
      this.segundos,
    )
  }
  parar() {
    clearInterval(this.cronometroInterval)
    this.cronometroRodando = false
  }

  formatarTempo(horas, minutos, segundos) {
    return `${this.adicionarZeroEsquerda(horas)}:${this.adicionarZeroEsquerda(
      minutos,
    )}:${this.adicionarZeroEsquerda(segundos)}`
  }

  adicionarZeroEsquerda(numero) {
    return numero < 10 ? `0${numero}` : numero
  }
}
let timer = new Timer()

class TimerPassa {
  constructor() {
    this.timerPassaLoss = document.querySelector('.timerPassaLoss')
    this.timerPassaWin = document.querySelector('.timerPassaWin')

    this.segundos = 0
    this.minutos = 0
    this.horas = 0
    this.cronometroRodando = false
    this.cronometroInterval = null
  }

  inicia() {
    if (!this.cronometroRodando) {
      this.cronometroInterval = setInterval(
        () => this.atualizarCronometro(),
        1000,
      )
      this.cronometroRodando = true
    }
  }

  atualizarCronometro() {
    this.segundos++
    if (this.segundos === 60) {
      this.segundos = 0
      this.minutos++
      if (this.minutos === 60) {
        this.minutos = 0
        this.horas++
      }
    }
    this.timerPassaLoss.innerText = this.formatarTempo(
      this.horas,
      this.minutos,
      this.segundos,
    )
    this.timerPassaWin.innerText = this.formatarTempo(
      this.horas,
      this.minutos,
      this.segundos,
    )
  }

  formatarTempo(horas, minutos, segundos) {
    return `${this.adicionarZeroEsquerda(horas)}:${this.adicionarZeroEsquerda(
      minutos,
    )}:${this.adicionarZeroEsquerda(segundos)}`
  }

  adicionarZeroEsquerda(numero) {
    return numero < 10 ? `0${numero}` : numero
  }

  parar() {
    clearInterval(this.cronometroInterval)
    this.cronometroRodando = false
  }

  reiniciar() {
    this.parar()
    this.segundos = 0
    this.minutos = 0
    this.horas = 0
    this.timerPassa.innerText = this.formatarTempo(
      this.horas,
      this.minutos,
      this.segundos,
    )
  }
}
let timerPassa = new TimerPassa()

class Pista {
  constructor() {
    this.elemento = novoElemento('div', 'pista')
  }

  getPista() {
    return this.elemento
  }
}

/*//////MUDANÇA NO MOVIMENTO DA ESTRADA BASEADO NA VELOCIDADE RECEBIDA, USANDO GIFS/////*/
class Horizonte {
  constructor() {
    this.distancia = document.querySelector('.metros')
    this.metros = parseInt(distancia.innerHTML)
    this.montanha = document.querySelector('.montanha')
    this.width = 20 //objtivo 80%
    this.height = 10 //objetivo 40%
    this.total = parseInt(distancia.innerHTML)
  }
  animMontanha(velocidadeFinal) {
    const velocidadeRanges = [
      { start: 0, end: 0, subtracao: 0 },
      { start: 1, end: 60, subtracao: 0.2 },
      { start: 61, end: 130, subtracao: 0.4 },
      { start: 130, end: 200, subtracao: 0.6 },
    ]

    let selectedRange = velocidadeRanges.find(
      (range) => velocidadeFinal >= range.start && velocidadeFinal <= range.end,
    )

    if (selectedRange) {
      this.metros -= selectedRange.subtracao
      this.distancia.innerHTML = Math.ceil(this.metros)

      if (selectedRange.subtracao !== 0) {
        this.totalInterval = this.total / selectedRange.subtracao
        this.taxaWidth = 60 / this.totalInterval
        this.taxaHeight = 30 / this.totalInterval
      } else {
        this.taxaWidth = 0
        this.taxaHeight = 0
      }

      this.width += this.taxaWidth
      this.height += this.taxaHeight

      this.montanha.style.width = this.width + '%'
      this.montanha.style.height = this.height + '%'

      if (this.metros < 0) {
        this.metros = 0
        this.distancia.innerHTML = this.metros
      }
    }
  }
}

/*///////CLASSE COM OS MÉTODOS PARA AUDIO E EFEITOS SONOROSL/////////////////////*/

class PlaygroundAudio {
  constructor() {
    this.context = new AudioContext()
    this.volume = this.context.createGain()
    this.volume.connect(this.context.destination)
    this.oscillator = null
    this.audio = new Audio('./music/MusicCarJimmyFontanez.mp3')
    // this.audio = new Audio('./music/musicCar.mp3');
    this.audio.volume = 0.01
    this.audio.loop = true
    this.volumeFixo = 0.03 // Valor fixo para o volume (por exemplo, 0.5)
    this.volume.gain.value = this.volumeFixo
    this.timer = document.querySelector('.timer')
    this.varTimer3 = this.timer.innerHTML

    this.audioWin = new Audio('./music/win.mp3')
    this.audioLoss = new Audio('./music/loss.mp3')
    this.audioGas = new Audio('./music/gasolina.mp3')
    this.audioStar = new Audio('./music/estrelas.mp3')
    this.audioPower = new Audio('./music/power.mp3')
    this.audioWin.volume = 0.1
    this.audioLoss.volume = 0.1
    this.audioGas.volume = 0.1
    this.audioStar.volume = 0.1
    this.audioPower.volume = 0.2
  }
  play() {
    if (this.oscillator) {
      this.oscillator.stop(this.context.currentTime)
      this.oscillator.disconnect(this.volume)
      this.oscillator = null
    }

    this.oscillator = this.context.createOscillator()
    this.oscillator.frequency.value = 0
    this.oscillator.detune.value = 0
    this.oscillator.type = 'sawtooth'
    this.oscillator.connect(this.volume)
    this.oscillator.start(0)
  }
  stop() {
    if (this.oscillator) {
      this.oscillator.stop(this.context.currentTime)
      this.oscillator.disconnect(this.volume)
      this.oscillator = null
    }
  }

  atualizaFrequenciaOscilador(velocidadeFinal) {
    const frequenciaMinima = 20
    const frequenciaMaxima = 200
    const proporcao = (velocidadeFinal - 0) / (200 - 0)
    const frequencia =
      frequenciaMinima + proporcao * (frequenciaMaxima - frequenciaMinima)
    this.oscillator.frequency.value = frequencia
  }
  playMusic() {
    this.audio.play()
  }
  playWin() {
    this.audioWin.play()
  }
  playLoss() {
    this.audioLoss.play()
  }
  playGas() {
    this.audioGas.play()
  }
  playStar() {
    this.audioStar.play()
  }
  playPower() {
    this.audioPower.play()
  }
  stopMusic() {
    this.audio.pause()
    this.audio.currentTime = 0
  }
}

const playgroundAudio = new PlaygroundAudio()

class Carro {
  constructor(largura) {
    this.elemento = novoElemento('span', 'player')
    this.largura = largura
    this.velocidade = 0
    this.teclasPressionadas = {}

    document.addEventListener('keydown', (event) => {
      this.teclasPressionadas[event.key.toLowerCase()] = true
    })

    document.addEventListener('keyup', (event) => {
      this.teclasPressionadas[event.key.toLowerCase()] = false
    })

    // Inicia o loop de atualização contínua para a movimentação horizontal e vertical
    this.atualizarMovimento()
  }
  getCarro() {
    return this.elemento
  }
  getX() {
    const x = parseInt(this.elemento.style.left.split('px')[0]) || 375
    return x
  }
  setX(x) {
    this.elemento.style.left = `${x}px`
  }
  movimentaHorizontal(x) {
    const coordX = this.getX()
    const soma = x + coordX

    if (soma < ptoFinalPlayground && soma > 0) {
      this.elemento.style['filter'] = 'none'
      this.setX(soma)
    } else if (soma <= ptoInicialPlayround || soma >= ptoFinalPlayground) {
      this.elemento.style['filter'] =
        'grayscale(10%) sepia(200%) brightness(50%)'
    }
  }
  // Função para atualizar o movimento horizontal e velocidade do carro de forma contínua
  atualizarMovimento() {
    if (this.teclasPressionadas['d']) {
      this.movimentaHorizontal(10) // Ajuste a velocidade horizontal como desejar
    } else if (this.teclasPressionadas['a']) {
      this.movimentaHorizontal(-10) // Ajuste a velocidade horizontal como desejar
    }
    requestAnimationFrame(this.atualizarMovimento.bind(this))
  }
}

class Jogo {
  constructor() {
    this.pontos = 0
    this.areaDoJogo = document.querySelector('.playground')
    this.altura = this.areaDoJogo.clientHeight
    this.largura = this.areaDoJogo.clientWidth
    this.carro = new Carro(this.largura)
    this.pista = new Pista()
  }

  insereNoPlayground(...array) {
    array.forEach((el) => {
      espacoJogador.appendChild(el)
    })
  }
  inicia() {
    const pista = this.pista.getPista()
    const jogador = this.carro.getCarro()
    const elementos = [jogador, pista]
    const periodoDia = new PeriodoDia()
    periodoDia.startAnimation()
    this.insereNoPlayground(...elementos)

    const animationController = new AnimationController()
    playgroundAudio.playMusic()
    timer.iniciarTemporizador(hours)
    timerPassa.inicia()

    const movDiv = new MovingDiv('container')
    movDiv.start()
    movDiv.verificaCondicoes()
    movDiv.criarDivs()
    movDiv.empilhamento()
    // const borda = new Borda();
    movDiv.animaBorda()
    movDiv.verificando()

    const pistBord = new PistaBorda()
    pistBord.aplicarEstilos()
  }
}

class AnimationController {
  constructor() {
    this.anim = 0
    this.step = 0 // Valor inicial do incremento
    this.animationActivated = Array(9).fill(false)

    this.gasolina = parseInt(posto.innerHTML)
    this.relogio = tempo.innerHTML
    this.metros = parseInt(distancia.innerHTML)
    this.rank = lugar.innerHTML

    document.addEventListener('touchstart', this.touchStart.bind(this));
    document.addEventListener('touchend', this.touchEnd.bind(this));
    
    document.addEventListener('keydown', this.teclaPress.bind(this))
    document.addEventListener('keyup', this.teclaNoPress.bind(this))
    window.addEventListener('blur', this.stopIncrement.bind(this))

    
  }

  moveDivsToRight(tempoDeTransicao) {
    const fatiasEstrada = document.querySelectorAll('#container .div-layer')

    for (var i = 0; i < 105; i++) {
      var div = fatiasEstrada[i]
      var currentMargin = parseInt(window.getComputedStyle(div).marginLeft || 0)
      var newMargin = currentMargin + Math.exp(6.055 - 0.025 * i)
      div.style.marginLeft = newMargin + 'px'
      div.style.transition = `margin-left ${tempoDeTransicao}s ease`
    }
  }
  //Math.exp((6.055 - 0.04*i));
  moveDivsToLeft(tempoDeTransicao) {
    const fatiasEstrada2 = document.querySelectorAll('#container .div-layer')

    for (var i = 0; i < 105; i++) {
      var div = fatiasEstrada2[i]
      var currentMargin = parseInt(
        window.getComputedStyle(div).marginRight || 0,
      )
      var newMargin = currentMargin + Math.exp(6.055 - 0.025 * i)
      div.style.marginRight = newMargin + 'px'

      div.style.transition = `margin-right ${tempoDeTransicao}s ease`
    }
  }
  teclaPress(event) {
    if (event.key === 'w') {
      this.changeAnimation(this.step)
      this.step += 1 // aumenta o incremento
      if (this.step > 10) {
        this.step = 10 // Define um valor máximo para o incremento
      }
      this.stopIncrement()
    } else if (event.key === 's') {
      this.changeAnimation(this.step)
      this.step -= 1 // Diminui o incremento
      if (this.step < 0) {
        this.step = 0 // Define um valor mínimo para o incremento
      }
      this.stopIncrement()
    }
  }
  teclaNoPress(event) {
    this.stopIncrement()
    this.startIncrement()
  }

  touchStart(event) {
    // Obtém as coordenadas do toque
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
  
    if (touchY < window.innerHeight / 2) {
      // Toque acima do centro da tela (gesto "w")
      this.changeAnimation(this.step);
      this.step += 1;
      if (this.step > 10) {
        this.step = 10;
      }
      this.stopIncrement();
    } else if (touchY >= window.innerHeight / 2) {
      // Toque abaixo do centro da tela (gesto "s")
      this.changeAnimation(this.step);
      this.step -= 1;
      if (this.step < 0) {
        this.step = 0;
      }
      this.stopIncrement();
    }
  }
  
  touchEnd(event) {
    this.stopIncrement();
    this.startIncrement();
  }
  




  startIncrement() {
    this.relogio = tempo.innerHTML
    this.metros = parseInt(distancia.innerHTML)

    this.incrementInterval = setInterval(() => {
      this.gasolina = parseFloat(posto.innerHTML)
      this.relogio = tempo.innerHTML

      this.changeAnimation(this.step)
      this.step -= 1
      if (this.step < 0) {
        this.step = 0 // Define um valor mínimo para o incremento
      }
      if (
        this.relogio === '00:00:00' ||
        this.metros === 0 ||
        this.gasolina === 0
      ) {
        this.stopIncrement()
      }
    }, 1000)
  }
  stopIncrement() {
    // Parar o setInterval para interromper o incremento contínuo
    clearInterval(this.incrementInterval)
  }

  changeAnimation(amount) {
    const montanha = document.querySelector('.montanha')
    this.gasolina = parseFloat(posto.innerHTML)
    this.relogio = tempo.innerHTML
    this.metros = parseInt(distancia.innerHTML)
    this.contador = 0
    this.rank = lugar.innerHTML
    if (
      this.relogio === '00:00:00' ||
      this.metros === 0 ||
      this.gasolina === 0
    ) {
      amount = 0
    }

    this.anim += amount

    const animationRanges = [
      { start: 3000, end: 3500, moveDirection: 'left', index: 1 },
      { start: 4000, end: 4500, moveDirection: 'right', index: 2 },
      { start: 7500, end: 8000, moveDirection: 'right', index: 3 },
      { start: 9000, end: 10500, moveDirection: 'left', index: 4 },
      { start: 13500, end: 14000, moveDirection: 'left', index: 5 },
      { start: 15500, end: 15600, moveDirection: 'right', index: 6 },
      { start: 21500, end: 22000, moveDirection: 'left', index: 7 },
      { start: 25000, end: 25500, moveDirection: 'right', index: 8 },
    ]

    for (const range of animationRanges) {
      let currentMargin = parseInt(
        window.getComputedStyle(montanha).marginRight || 0,
      )
      if (
        this.anim > range.start &&
        this.anim < range.end &&
        !this.animationActivated[range.index]
      ) {
        if (range.moveDirection === 'left') {
          this.contador++
          this.moveDivsToLeft(1) //esquerda
          montanha.style.marginRight = currentMargin + this.contador + 'px'
          montanha.style.transition = `margin-right ${1}s ease`
        } else if (range.moveDirection === 'right') {
          this.moveDivsToRight(1)
          montanha.style.marginLeft = currentMargin + this.contador + 'px'
          montanha.style.transition = `margin-left ${1}s ease`
        }
        this.animationActivated[range.index] = true
        break
      }
    }
    if (this.anim > 29500) {
      this.anim = 0
      this.animationActivated = Array(9).fill(false)
    }
  }
}
class PistaBorda {
  constructor() {
    this.fatiasEstrada = document.querySelectorAll('#container .div-layer')
    this.listaValores = []
    this.indice = 0
    this.listaCores = []
    this.medidorV = document.querySelector('.velocidade-span')

    for (let i = 0; i <= 100; i++) {
      this.listaValores.push(i)
    }
  }

  aplicarEstilos() {
    this.fatiasEstrada.forEach((elemento, i) => {
      if (i <= 100) {
        const cor = i % 30 < 15 ? 'red' : 'rgb(186, 186, 186)'
        const largura = `${i / 40}rem`
        this.listaCores.push(cor)
        elemento.style.borderRight = `${largura} solid ${cor}`
        elemento.style.borderLeft = `${largura} solid ${cor}`
      }
    })
  }
}

/////////////////////////////////////////////////////////
class MovingDiv {
  constructor(containerId) {
    this.speed = -0.5 // Initial speed
    this.maxSpeed = 5.0 // Maximum speed
    this.minSpeed = -5.0 // Minimum speed
    this.interval = null
    this.isPageVisible = true
    this.container = document.getElementById(containerId)
    this.container2 = document.querySelector('#container')
    this.interval = null
    this.quilometragem = 0
    this.maxQuilometragem = 200
    this.minQuilometragem = 0
    this.ponteiroV = -45
    this.maxVel = 45
    this.minVel = -45
    this.inicio = 0
    this.limite = 10

    this.limite2 = Math.ceil(this.limite)
    this.reductionInterval = null
    this.medidorVel = document.querySelector('.velocidade-span')

    this.power = document.querySelector('.pontos')
    this.pontao = 0

    this.listaValores = []
    this.listaCores = []
    this.listaCoresCentro = []

    this.indice = 0
    this.speedBord = 0 // Velocidade inicial

    this.speedBordMax = 5
    this.speedBordMin = 0
    this.speedBordCeil = 0

    for (let i = 0; i <= 100; i++) {
      this.listaValores.push(i)
    }
    for (let i = 0; i <= 100; i++) {
      const cor = i % 20 < 10 ? 'red' : 'rgb(186, 186, 186)'
      this.listaCores.push(cor)
    }

    for (let i = 0; i <= 100; i++) {
      const cor = i % 20 < 10 ? '#272a2c' : 'white'
      this.listaCoresCentro.push(cor)
    }

    this.gas = parseFloat(posto.innerHTML)
    this.gasolina = posto.innerHTML
    this.relogio = tempo.innerHTML
    this.metros = parseInt(distancia.innerHTML)
    this.total = parseInt(distancia.innerHTML)
    this.rank = lugar.innerHTML

    this.loss = document.querySelector('.loss')
    this.win = document.querySelector('.win')

    this.horizonte = new Horizonte()
    this.elementoNeedle = document.querySelector('.needle')

    this.mensagemWin = document.querySelector('.winRazao')
    this.mensagemLoss = document.querySelector('.lossRazao')
    this.keysPressed = {}

    document.addEventListener('keydown', this.apertaTecla.bind(this))
    document.addEventListener('keyup', this.liberaTecla.bind(this))
    window.addEventListener('blur', this.stopIncrement2.bind(this))

    document.addEventListener('touchstart', this.touchStart.bind(this));
    document.addEventListener('touchend', this.touchEnd.bind(this));

    playgroundAudio.play()
  }

  apertaTecla(event) {
    playgroundAudio.atualizaFrequenciaOscilador(this.quilometragem)

    if (event.key === 'w') {
      this.speed += 0.025
      this.speedBord += 0.0125

      this.quilometragem += 0.5
      this.ponteiroV += 0.225
      this.medidorVel.innerHTML = Math.ceil(this.quilometragem)

      this.elementoNeedle.style.transform = `translate(-50%, -50%) rotate(${this.ponteiroV}deg)`
      this.gas -= 0.005
      posto.innerHTML = Math.ceil(this.gas)

      if (this.speed > this.maxSpeed) {
        this.speed = this.maxSpeed
      }

      if (this.speedBord > this.speedBordMax) {
        this.speedBord = this.speedBordMax
      }

      if (this.gas <= 0) {
        this.gas = 0
        posto.innerHTML = this.gas
      }

      if (this.quilometragem > this.maxQuilometragem) {
        this.quilometragem = this.maxQuilometragem
        this.medidorVel.innerHTML = this.quilometragem
      }

      if (this.ponteiroV > this.maxVel) {
        this.ponteiroV = this.maxVel
      }

      this.stopIncrement2()
    } else if (event.key === 's') {
      this.speed -= 0.025
      this.speedBord -= 0.0125 // Initial speed

      this.quilometragem -= 0.5
      this.ponteiroV -= 0.225
      this.medidorVel.innerHTML = Math.ceil(this.quilometragem)
      this.elementoNeedle.style.transform = `translate(-50%, -50%) rotate(${this.ponteiroV}deg)`

      if (this.speed < this.minSpeed) {
        this.speed = this.minSpeed
      }

      if (this.speedBord < this.speedBordMin) {
        this.speedBord = this.speedBordMin
      }

      if (this.quilometragem < this.minQuilometragem) {
        this.quilometragem = this.minQuilometragem
        this.medidorVel.innerHTML = Math.ceil(this.quilometragem)
      }

      if (this.ponteiroV < this.minVel) {
        this.ponteiroV = this.minVel
      }
      this.stopIncrement2()
    }
    this.speedBordCeil = Math.ceil(this.speedBord)
    this.animaBorda(this.speedBordCeil)
  }
  liberaTecla(event) {
    playgroundAudio.atualizaFrequenciaOscilador(this.quilometragem)

    this.stopIncrement2()
    this.startIncrement2()
  }


  touchStart(event) {
    // Obtém as coordenadas do toque
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
  
    if (touchY < window.innerHeight / 2) {
      this.speed += 0.025
      this.speedBord += 0.0125

      this.quilometragem += 0.5
      this.ponteiroV += 0.225
      this.medidorVel.innerHTML = Math.ceil(this.quilometragem)

      this.elementoNeedle.style.transform = `translate(-50%, -50%) rotate(${this.ponteiroV}deg)`
      this.gas -= 0.005
      posto.innerHTML = Math.ceil(this.gas)

      if (this.speed > this.maxSpeed) {
        this.speed = this.maxSpeed
      }

      if (this.speedBord > this.speedBordMax) {
        this.speedBord = this.speedBordMax
      }

      if (this.gas <= 0) {
        this.gas = 0
        posto.innerHTML = this.gas
      }

      if (this.quilometragem > this.maxQuilometragem) {
        this.quilometragem = this.maxQuilometragem
        this.medidorVel.innerHTML = this.quilometragem
      }

      if (this.ponteiroV > this.maxVel) {
        this.ponteiroV = this.maxVel
      }

      this.stopIncrement2()
    } else if (touchY >= window.innerHeight / 2) {
      this.speed -= 0.025
      this.speedBord -= 0.0125 // Initial speed

      this.quilometragem -= 0.5
      this.ponteiroV -= 0.225
      this.medidorVel.innerHTML = Math.ceil(this.quilometragem)
      this.elementoNeedle.style.transform = `translate(-50%, -50%) rotate(${this.ponteiroV}deg)`

      if (this.speed < this.minSpeed) {
        this.speed = this.minSpeed
      }

      if (this.speedBord < this.speedBordMin) {
        this.speedBord = this.speedBordMin
      }

      if (this.quilometragem < this.minQuilometragem) {
        this.quilometragem = this.minQuilometragem
        this.medidorVel.innerHTML = Math.ceil(this.quilometragem)
      }

      if (this.ponteiroV < this.minVel) {
        this.ponteiroV = this.minVel
      }
      this.stopIncrement2()
    }
  
    this.speedBordCeil = Math.ceil(this.speedBord)
    this.animaBorda(this.speedBordCeil)
  }
  
  touchEnd(event) {
    playgroundAudio.atualizaFrequenciaOscilador(this.quilometragem)
    this.stopIncrement2()
    this.startIncrement2()
  }
  









  stopIncrement2() {
    clearInterval(this.incrementInterval2)
  }

  startIncrement2() {
    this.relogio = tempo.innerHTML

    this.incrementInterval2 = setInterval(() => {
      this.gasolina = parseInt(posto.innerHTML)
      this.relogio = tempo.innerHTML
      this.metros = parseInt(distancia.innerHTML)
      this.rank = lugar.innerHTML

      playgroundAudio.atualizaFrequenciaOscilador(this.quilometragem)

      if (
        this.relogio === '00:00:00' ||
        this.metros === 0 ||
        this.gasolina === 0
      ) {
        this.stopIncrement2()
      }
      this.speed -= 0.025

      this.speedBord -= 0.0125
      this.quilometragem -= 0.5
      this.ponteiroV -= 0.225
      this.medidorVel.innerHTML = Math.ceil(this.quilometragem)
      this.elementoNeedle.style.transform = `translate(-50%, -50%) rotate(${this.ponteiroV}deg)`

      if (this.speed < this.minSpeed) {
        this.speed = this.minSpeed
      }
      if (this.speedBord < this.speedBordMin) {
        this.speedBord = this.speedBordMin
      }

      this.speedBordCeil = Math.ceil(this.speedBord)
      this.animaBorda(this.speedBordCeil)

      if (this.ponteiroV < this.minVel) {
        this.ponteiroV = this.minVel
      }

      if (this.quilometragem < this.minQuilometragem) {
        this.quilometragem = this.minQuilometragem
        this.medidorVel.innerHTML = Math.ceil(this.quilometragem)
      }
    }, 50)
  }


  
  verificando() {
    this.framez = setInterval(() => {
      this.animaBorda(this.speedBordCeil)
    }, 15)
  }
  animaBorda(vel) {
    const fatiasBorda = document.querySelectorAll('#container .div-layer')
    if (
      this.relogio === '00:00:00' ||
      this.metros === 0 ||
      this.gasolina === 0
    ) {
      vel = 0
    }
    for (let i = 0; i < vel; i++) {
      let ultimoElemento = this.listaValores.pop()
      this.listaValores.unshift(ultimoElemento)
    }
    for (let j = 0; j <= 100; j++) {
      this.indice = this.listaValores[j]
      fatiasBorda[j].style.borderRightColor = this.listaCores[this.indice]
      fatiasBorda[j].style.borderLeftColor = this.listaCores[this.indice]
      fatiasBorda[
        j
      ].style.background = `linear-gradient(to right, #272a2c 47%, ${
        this.listaCoresCentro[this.indice]
      } 50%, #272a2c 53%)`
    }
  }

  updateInterval() {
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      const movingDivElements = document.querySelectorAll('.movingDiv')
      const numberOfMovingDivs = movingDivElements.length

      const ultimaDiv = this.container2.lastElementChild
      const ultimoBottom = parseInt(ultimaDiv.style.bottom)
      const containerHeight = this.container2.offsetHeight
      const disTopo = containerHeight - ultimoBottom

      if (
        (disTopo > 55 && numberOfMovingDivs >= 1 && numberOfMovingDivs <= 3) ||
        numberOfMovingDivs === 0
      ) {
        this.moveDiv()
      }
      this.gasolina = parseInt(posto.innerHTML)
      this.relogio = tempo.innerHTML
      this.metros = parseInt(distancia.innerHTML)
      this.rank = lugar.innerHTML

      if (
        this.relogio === '00:00:00' ||
        this.metros === 0 ||
        this.gasolina === 0
      ) {
        this.stop()
      }
    }, selecaoDificuldade)
  }
  updateIntervalPonto() {
    clearInterval(this.interval2)
    this.interval2 = setInterval(() => {
      //  const movingPontosElements = document.querySelectorAll('.pontoDiv');
      //  const numberOfPontosDivs = movingPontosElements.length;

      //  if(numberOfPontosDivs >=0 && numberOfPontosDivs<=3){
      this.moveDivPonto()
      //  }
    }, selecaoDificuldade + 5231)
  }

  updateIntervalPosto() {
    clearInterval(this.interval3)
    this.interval3 = setInterval(() => {
      //   const movingDivElements = document.querySelectorAll('.postoDiv');
      //   const numberOfPostosDivs = movingDivElements.length;
      //  if(numberOfPostosDivs >=0 && numberOfPostosDivs<=3){
      this.moveDivPosto()
      // }
    }, selecaoDificuldade + 10234)
  }
  start() {
    this.updateInterval()
    this.updateIntervalPonto()
    this.updateIntervalPosto()
  }
  stop() {
    clearInterval(this.interval)
    clearInterval(this.interval2)
    clearInterval(this.interval3)
  }
  verificaCondicoes() {
    this.intervalVerifica = setInterval(() => {
      this.gasolina = parseInt(posto.innerHTML)
      this.relogio = tempo.innerHTML
      this.metros = parseInt(distancia.innerHTML)
      this.horizonte.animMontanha(this.quilometragem)
      this.rank = lugar.innerHTML
      lugarWin.innerHTML = this.rank
      distanciaWin.innerHTML = this.total - this.metros
      lugarLoss.innerHTML = this.rank
      distanciaLoss.innerHTML = this.total - this.metros

      if (
        this.relogio === '00:00:00' ||
        this.metros === 0 ||
        this.gasolina === 0
      ) {
        distancia.innerHTML = this.metros

        if (
          this.relogio !== '00:00:00' &&
          this.metros === 0 &&
          this.gasolina >= 1 &&
          this.rank == 1
        ) {
          playgroundAudio.playWin()
          this.mensagemWin.innerHTML = 'Parabéns campeão!'
          this.win.style.display = 'flex'
        } else {
          if (this.relogio == '00:00:00' && this.metros > 0) {
            this.mensagemLoss.innerHTML =
              'Você estorou o tempo limite para terminar a corrida, está eliminado'
          }
          if (this.gasolina == 0 && this.metros > 0) {
            this.mensagemLoss.innerHTML =
              'Você não possui mais combustível para terminar a corrida, está eliminado'
          }
          if (
            this.relogio !== '00:00:00' &&
            this.metros === 0 &&
            this.gasolina >= 1 &&
            this.rank > 1
          ) {
            this.mensagemLoss.innerHTML =
              'Você terminou a corrida, mas não a venceu'
          }
          playgroundAudio.playLoss()
          this.loss.style.display = 'flex'
        }
        timer.parar()
        timerPassa.parar()
        playgroundAudio.stop()
        playgroundAudio.stopMusic()
        this.horizonte.animMontanha(0)
        clearInterval(this.intervalVerifica)
      }
    }, 10)
  }
  moveDiv() {
    if (this.speed >= -0.5 && this.isPageVisible) {
      //criando novo elemento para carros

      let novoInimigo = novoElemento('div', 'movingDiv')
      this.container.appendChild(novoInimigo) // o carro torna-se "filho" do elemento container

      let numeroAleatorio = Math.floor(Math.random() * 4) - 1

      //informações do container
      this.containerWidth = this.container.offsetWidth
      this.containerHeight = this.container.offsetHeight
      this.containerLeft = this.container.offsetLeft
      this.varMarginInitial = this.containerLeft + this.containerWidth / 2 - 180
      let randomMarginLeft = Math.floor(
        Math.random() * (this.containerWidth - 200),
      ) //margem inferior que o elemento irá alcançar
      let horizontal = Math.floor(this.varMarginInitial - randomMarginLeft) //variação nas posições de surgimento dos elementos no entorno do meio do container
      let taxaHorPorVert =
        horizontal /
        this
          .containerHeight /* conforme o elemento desce pele container, ele varia à uma taxa horizontal relativo a uma  taxa vertical, dependendo da posição aletória que o elemento vai alcançar a margem inferior do container*/

      // Generate a random filter color para o carro
      const randomColor = this.generateRandomColor()

      let posicaoAtual = 0
      this.gasolina = parseInt(posto.innerHTML)
      this.relogio = tempo.innerHTML
      this.metros = parseInt(distancia.innerHTML)
      this.rank = lugar.innerHTML
      distanciaWin.innerHTML = this.total - this.metros
      distanciaLoss.innerHTML = this.total - this.metros
      distancia.innerHTML = this.metros

      let ha_Inimigos = document.querySelector('.movingDiv')

      if (ha_Inimigos) {
        novoInimigo.style.left = numeroAleatorio + 'px'
        novoInimigo.style.marginLeft = this.varMarginInitial + 'px'
        novoInimigo.style.filter = `hue-rotate(${randomColor})` // variação nas cores dos elementos(carros inimigos)
      }

      const animate = () => {
        // Exemplo de impressão após a operação
        let ha_Inimigos = document.querySelector('.movingDiv')

        if (
          this.relogio === '00:00:00' ||
          this.metros === 0 ||
          this.gasolina === 0
        ) {
          distanciaWin.innerHTML = this.total - this.metros
          distanciaLoss.innerHTML = this.total - this.metros
          distancia.innerHTML = this.metros
        }

        if (
          posicaoAtual >= this.containerHeight &&
          ha_Inimigos &&
          this.container.contains(novoInimigo)
        ) {
          //se o elemento chegar na base do container ele será deletado
          this.container.removeChild(novoInimigo)

          this.rank -= 1 //caso o player tenha estrelas, ele poderá usá-las para eliminar alguns carros que impedem sua passagem
          lugar.innerHTML = this.rank

          if (this.rank < 1) {
            this.rank = 1
            lugar.innerHTML = this.rank
          }
        } else if (ha_Inimigos) {
          posicaoAtual += this.speed //a posição atual dependerá da variável speed que é influenciada por diversas variaveis, evento de teclas e a falta de tais eventos, simulando o efeito do carro desacelerar caso não haja nenhum comando no carro do player.
          novoInimigo.style.bottom = this.containerHeight - posicaoAtual + 'px'

          if (taxaHorPorVert >= 0) {
            //controle do carro desde a margem inicial até a margem final, com um certo intervalo de aleatoriedade
            novoInimigo.style.marginLeft =
              this.varMarginInitial - posicaoAtual * taxaHorPorVert * 0.3 + 'px' //esquerda
          } else {
            novoInimigo.style.marginLeft =
              this.varMarginInitial - posicaoAtual * taxaHorPorVert * 2 + 'px' //direita
          }

          //uso do posicionamento do carro para simular a perspectiva de aumento ou diminuição do tamanho co carro conforme se distancia ou se aproxima do player
          novoInimigo.style.width = 10 + posicaoAtual / 4 + 'px'
          novoInimigo.style.height = 8 + posicaoAtual / 6 + 'px'
          novoInimigo.style.opacity = (10 * posicaoAtual) / this.containerHeight

          //caso o player fique mais lento que os demais elementos, estes elementos irão até o horizonte da pista e serão apagados em
          //virtude de não sobrecarregar o container com divs ultrapassando o limite superior.
          const limSup = parseInt(novoInimigo.style.bottom)
          if (
            limSup > 420 &&
            ha_Inimigos &&
            this.container.contains(novoInimigo)
          ) {
            this.container.removeChild(novoInimigo)
          } else if (ha_Inimigos) {
            //nessa lógica, conforme o bottom do inimigo abaixa a cada multiplo de 6px do divBottom(altura de cada div da pista), ele toma pra si a margem dessa div e mais uma margem adicional adiquirida anteriormente, respeitando o formato da curva, seja curvada ou reta.
            //da div corres)
            const divBottom = 420 - parseInt(novoInimigo.style.bottom)
            const constIndice = Math.floor(parseInt(divBottom / 4)) //indices de cada div, Ex: div[3], possui bottom 420 - 402= 18(6*3).

            let fatiasEstrada = document.querySelectorAll(
              '#container .div-layer',
            )

            if (constIndice >= 0 && constIndice < 121) {
              let fatias = fatiasEstrada[constIndice]
              var fatiasMarginLeft = fatias.offsetLeft
            }
            novoInimigo.style.marginLeft =
              parseInt(novoInimigo.style.marginLeft) +
              fatiasMarginLeft -
              200 +
              'px' //movimento guiado pelas divs da estrada, com ajuste de 200 para que os ellementos venham pela pista

            const inimigosTodos = document.querySelectorAll('.movingDiv')

            const player = document.querySelector('.player')

            this.margemEsquerdaDoPlayer =
              parseInt(player.style.left.split('px')[0]) || 375
            this.larguraDoPlayer = parseInt(player.offsetWidth)

            this.bottomDoPlayer = 105
            this.alturaDoPlayer = parseInt(player.offsetHeight)

            for (let i = 0; i < inimigosTodos.length; i++) {
              let bottomNovoInimigo = parseInt(inimigosTodos[i].style.bottom)
              let alturaDoInimigo = parseInt(inimigosTodos[i].offsetHeight)
              let diferencaAltura = Math.abs(
                this.bottomDoPlayer - bottomNovoInimigo,
              )

              if (this.bottomDoPlayer > bottomNovoInimigo) {
                this.AlturaDoDeBaixo = alturaDoInimigo
              } else {
                this.AlturaDoDeBaixo = this.alturaDoPlayer
              }

              if (diferencaAltura < this.AlturaDoDeBaixo) {
                let margemEsquerdaDoInimigo = parseInt(
                  inimigosTodos[i].style.marginLeft,
                )
                let larguraDoInimigo = parseInt(inimigosTodos[i].offsetWidth)
                let diferencaMargem = Math.abs(
                  this.margemEsquerdaDoPlayer - margemEsquerdaDoInimigo,
                )

                if (this.margemEsquerdaDoPlayer > margemEsquerdaDoInimigo) {
                  this.larguraDoMaisAesq1 = larguraDoInimigo
                } else {
                  this.larguraDoMaisAesq1 = this.larguraDoPlayer
                }

                this.margemEsquerdaDoPlayer2 =
                  parseInt(player.style.left.split('px')[0]) || 375

                if (diferencaMargem < this.larguraDoMaisAesq1) {
                  //aplicação de redução de velocidade
                  this.speed -= 0.05
                  this.speedBord -= 0.125

                  this.quilometragem -= 5
                  playgroundAudio.atualizaFrequenciaOscilador(
                    this.quilometragem,
                  )
                  this.ponteiroV -= 2.5

                  if (this.pontao > 0 && this.container.contains(novoInimigo)) {
                    //caso, eu tenha pontos de "poderes", posso eliminar os carros na frente do player com um simples "toque"
                    this.container.removeChild(inimigosTodos[i])
                    this.pontao -= 1
                    this.power.innerHTML = this.pontao
                    playgroundAudio.playPower()
                    player.classList.add('powerAnimation')

                    this.rank -= 1
                    lugar.innerHTML = this.rank

                    if (this.rank < 1) {
                      this.rank = 1
                      lugar.innerHTML = this.rank
                    }

                    setTimeout(function () {
                      player.classList.remove('powerAnimation')
                    }, 500)
                  }
                  //limites impostos as variáveis
                  if (this.speed < this.minSpeed) {
                    this.speed = this.minSpeed
                  }
                  if (this.speedBord < this.speedBordMin) {
                    this.speedBord = this.speedBordMin
                  }
                  if (this.ponteiroV < this.minVel) {
                    this.ponteiroV = this.minVel
                  }
                  if (this.quilometragem < this.minQuilometragem) {
                    this.quilometragem = 0
                    this.medidorVel.innerHTML = Math.ceil(this.quilometragem)
                  }
                  if (this.pontao < 0) {
                    this.pontao = 0
                    this.power.innerHTML = this.pontao
                  }

                  this.elementoNeedle.style.transform = `translate(-50%, -50%) rotate(${this.ponteiroV}deg)` //manipulação do medidor
                }
              }
            }
          }
        }
        requestAnimationFrame(animate);
      };
  
      animate();
    }
  }

  moveDivPonto() {
    if (this.speed >= -0.5 && this.isPageVisible) {
      let divPonto = novoElemento('div', 'pontoDiv');
      this.container.appendChild(divPonto);
  
      let numeroAleatorio2 = Math.floor(Math.random() * 4) - 1; // Gera um número aleatório entre -20 e 20
      let randomMarginLeft2 = Math.floor(Math.random() * (this.containerWidth - 200)); // Ajuste o valor "100" de acordo com a largura desejada para as divs
      let horizontal2 = Math.floor(this.varMarginInitial - randomMarginLeft2);
      let taxaHorPorVert2 = horizontal2 / this.containerHeight;
  
      let ha_Pontos = document.querySelector('.pontoDiv');
  
      if (ha_Pontos) {
        divPonto.style.left = numeroAleatorio2 + 'px';
        divPonto.style.marginLeft = this.varMarginInitial + 'px';
      }
  
      let posicaoAtual2 = 0;
  
      const animate = () => {
        let ha_Pontos = document.querySelector('.pontoDiv');
  
        this.gasolina = parseInt(posto.innerHTML);
        this.relogio = tempo.innerHTML;
        this.metros = parseInt(distancia.innerHTML);
        this.rank = lugar.innerHTML;
  
        if (
          this.relogio === '00:00:00' ||
          this.metros === 0 ||
          this.gasolina === 0
        ) {
          return;
        }
  
        if (
          posicaoAtual2 >= this.containerHeight &&
          ha_Pontos &&
          this.container.contains(divPonto)
        ) {
          this.container.removeChild(divPonto);
          return;
        } else if (ha_Pontos) {
          posicaoAtual2 += this.speed;
          divPonto.style.bottom = this.containerHeight - posicaoAtual2 + 'px';
  
          if (taxaHorPorVert2 >= 0) {
            divPonto.style.marginLeft =
              this.varMarginInitial -
              posicaoAtual2 * taxaHorPorVert2 * 0.4 +
              'px'; //taxa de curvatura da parte esquerda
          } else {
            divPonto.style.marginLeft =
              this.varMarginInitial -
              posicaoAtual2 * taxaHorPorVert2 * 1.5 +
              'px'; //taxa de curvatura da parte direita
          }
  
          divPonto.style.width = 2 + posicaoAtual2 / 8 + 'px';
          divPonto.style.height = 6 + posicaoAtual2 / 6 + 'px';
          divPonto.style.opacity = (5 * posicaoAtual2) / this.containerHeight;
  
          const limSup2 = parseInt(divPonto.style.bottom);
  
          if (limSup2 > 420 && ha_Pontos && this.container.contains(divPonto)) {
            this.container.removeChild(divPonto);
          } else if (ha_Pontos) {
            const divBottom2 = 420 - parseInt(divPonto.style.bottom);
            const constIndice2 = Math.floor(parseInt(divBottom2 / 4));
  
            let fatiasPista = document.querySelectorAll('#container .div-layer');
  
            if (constIndice2 >= 0 && constIndice2 < 121) {
              let fatias2 = fatiasPista[constIndice2];
              var fatiasMarginLeft2 = fatias2.offsetLeft;
            }
  
            divPonto.style.marginLeft =
              parseInt(divPonto.style.marginLeft) +
              fatiasMarginLeft2 -
              220 +
              'px';
  
            const divPonto2 = document.querySelector('.pontoDiv');
  
            let bottomPonto = parseInt(divPonto2.style.bottom);
            let alturaDoPonto = parseInt(divPonto2.offsetHeight);
            let diferencaAltura2 = Math.abs(this.bottomDoPlayer - bottomPonto);
  
            if (this.bottomDoPlayer > bottomPonto) {
              this.AlturaDoDeBaixo2 = alturaDoPonto;
            } else {
              this.AlturaDoDeBaixo2 = this.alturaDoPlayer;
            }
            if (diferencaAltura2 < this.AlturaDoDeBaixo2) {
              let margemEsquerdaDoPonto = parseInt(divPonto2.style.marginLeft);
              let larguraDoPonto = parseInt(divPonto2.offsetWidth);
              let diferencaMargem2 = Math.abs(
                this.margemEsquerdaDoPlayer - margemEsquerdaDoPonto
              );
  
              if (this.margemEsquerdaDoPlayer > margemEsquerdaDoPonto) {
                this.larguraDoMaisAesq2 = larguraDoPonto;
              } else {
                this.larguraDoMaisAesq2 = this.larguraDoPlayer;
              }
              if (
                diferencaMargem2 < this.larguraDoMaisAesq2 &&
                ha_Pontos &&
                this.container.contains(divPonto)
              ) {
                playgroundAudio.playStar();
                this.pontao += 1;
                this.power.innerHTML = this.pontao;
                this.container.removeChild(divPonto);
                return;
              }
            }
          }
  
          
        }
        requestAnimationFrame(animate);
      };
  
      animate();
    }
  }
  

  moveDivPosto() {
    if (this.speed >= -0.5 && this.isPageVisible) {
      let divPosto = novoElemento('div', 'postoDiv')
      this.container.appendChild(divPosto)

      let numeroAleatorio3 = Math.floor(Math.random() * 4) - 1 // Gera um número aleatório entre -20 e 20
      let randomMarginLeft3 = Math.floor(
        Math.random() * (this.containerWidth - 200),
      ) // Ajuste o valor "100" de acordo com a largura desejada para as divs
      let horizontal3 = Math.floor(this.varMarginInitial - randomMarginLeft3)
      let taxaHorPorVert3 = horizontal3 / this.containerHeight

      let ha_Postos = document.querySelector('.postoDiv')

      if (ha_Postos) {
        divPosto.style.left = numeroAleatorio3 + 'px'
        divPosto.style.marginLeft = this.varMarginInitial + 'px'
      }

      let posicaoAtual3 = 0

      const animate = () => {
        let ha_Postos = document.querySelector('.postoDiv')

        this.gasolina = parseFloat(posto.innerHTML)
        this.relogio = tempo.innerHTML
        this.metros = parseInt(distancia.innerHTML)
        this.rank = lugar.innerHTML

        if (
          this.relogio === '00:00:00' ||
          this.metros === 0 ||
          this.gasolina === 0
        ) {
          clearInterval(frameInterval3)
        }
        if (
          posicaoAtual3 >= this.containerHeight &&
          ha_Postos &&
          this.container.contains(divPosto)
        ) {
          this.container.removeChild(divPosto) // Remove a div quando atinge o limite inferior
          clearInterval(frameInterval3)
        } else if (ha_Postos) {
          posicaoAtual3 += this.speed
          divPosto.style.bottom = this.containerHeight - posicaoAtual3 + 'px'
          if (taxaHorPorVert3 >= 0) {
            divPosto.style.marginLeft =
              this.varMarginInitial -
              posicaoAtual3 * taxaHorPorVert3 * 0.4 +
              'px' //taxa de curvatura da parte esquerda
          } else {
            divPosto.style.marginLeft =
              this.varMarginInitial -
              posicaoAtual3 * taxaHorPorVert3 * 1.5 +
              'px' //taxa de curvatura da parte direita
          }
          divPosto.style.width = 2 + posicaoAtual3 / 8 + 'px'
          divPosto.style.height = 6 + posicaoAtual3 / 6 + 'px'
          divPosto.style.opacity = (5 * posicaoAtual3) / this.containerHeight

          const limSup3 = parseInt(divPosto.style.bottom)

          if (limSup3 > 420 && ha_Postos && this.container.contains(divPosto)) {
            this.container.removeChild(divPosto)
          } else if (ha_Postos) {
            const divBottom3 = 420 - parseInt(divPosto.style.bottom)
            const constIndice3 = Math.floor(parseInt(divBottom3 / 4))

            let fatiasEstrada3 = document.querySelectorAll(
              '#container .div-layer',
            )

            if (constIndice3 >= 0 && constIndice3 < 121) {
              let fatias3 = fatiasEstrada3[constIndice3]
              var fatiasMarginLeft3 = fatias3.offsetLeft
            }

            let MarginLeft3 = fatiasMarginLeft3

            divPosto.style.marginLeft =
              parseInt(divPosto.style.marginLeft) + MarginLeft3 - 220 + 'px'

            const divPosto3 = document.querySelector('.postoDiv')

            let bottomPosto = parseInt(divPosto3.style.bottom)
            let alturaDoPosto = parseInt(divPosto3.offsetHeight)
            let diferencaAltura3 = Math.abs(this.bottomDoPlayer - bottomPosto)

            if (this.bottomDoPlayer > bottomPosto) {
              this.AlturaDoDeBaixo3 = alturaDoPosto
            } else {
              this.AlturaDoDeBaixo3 = this.alturaDoPlayer
            }
            if (diferencaAltura3 < this.AlturaDoDeBaixo3) {
              let margemEsquerdaDoPosto = parseInt(divPosto3.style.marginLeft)
              let larguraDoPosto = parseInt(divPosto3.offsetWidth)
              let diferencaMargem3 = Math.abs(
                this.margemEsquerdaDoPlayer - margemEsquerdaDoPosto,
              )

              if (this.margemEsquerdaDoPlayer > margemEsquerdaDoPosto) {
                this.larguraDoMaisAesq3 = larguraDoPosto
              } else {
                this.larguraDoMaisAesq3 = this.larguraDoPlayer
              }
              if (
                diferencaMargem3 < this.larguraDoMaisAesq3 &&
                ha_Postos &&
                this.container.contains(divPosto)
              ) {
                playgroundAudio.playGas()
                this.gas += 1
                posto.innerHTML = Math.ceil(this.gas)
                this.container.removeChild(divPosto) // Remove a div quando atinge o limite inferior
              }
            }
          }
        }
        requestAnimationFrame(animate);
      };
  
      animate();
    }
  }

  generateRandomColor() {
    const cor = Math.floor(Math.random() * 360) // Random hue value between 0 and 360
    return `${cor}deg`
  }

  criarDivs() {
    for (let i = 0; i < 125; i++) {
      const div = novoElemento('div', 'div-layer')
      const primeiraDiv = this.container2.firstChild
      if (primeiraDiv) {
        this.container2.insertBefore(div, primeiraDiv)
      } else {
        this.container2.appendChild(div)
      }
    }
  }

  empilhamento() {
    const fatiasEstrada = document.querySelectorAll('#container .div-layer')
    const containerAltura = this.container2.offsetHeight
    const altura = containerAltura / (fatiasEstrada.length - 10)

    for (let i = 0; i < fatiasEstrada.length; i++) {
      const widthPercentage = i * 1
      if (i < 105) {
        fatiasEstrada[i].style.width = widthPercentage + '%'
      } else {
        fatiasEstrada[i].style.width = 100 + '%'
      }

      if (i >= 0 && i < 4) {
        fatiasEstrada[i].remove()
      }
      fatiasEstrada[i].style.height = `${Math.exp(i / 200)}%`
    }
  }
}
class PeriodoDia {
  constructor() {
    this.espacoJogador = document.querySelector('.espaco-jogador')
    this.montanha = document.querySelector('.montanha')
    this.horizonte = document.querySelector('.horizonte')
    this.container = document.querySelector('#container')

    this.gasolina = parseInt(posto.innerHTML)
    this.relogio = tempo.innerHTML
    this.metros = parseInt(distancia.innerHTML)
    this.rank = lugar.innerHTML

    this.filters = [
      {
        backgroundColor: 'green', // Dia
        montanhaBackgroundImage: 'url(./cenarios/montanhas/montanha1.png)',
        horizonteBackgroundImage: 'url(./cenarios/tempo_dia/nuvens.gif)',
        containerFilter: 'brightness(120%) contrast(100%) saturate(120%)',
      },
      {
        backgroundColor: 'black', // Noite
        montanhaBackgroundImage: 'url(./cenarios/montanhas/montanha1.png)',
        horizonteBackgroundImage: 'url(./cenarios/tempo_dia/noite.gif)',
        containerFilter: 'brightness(15%) contrast(100%) saturate(1000%)',
      },
      {
        backgroundColor: 'white', // Neve
        montanhaBackgroundImage: 'url(./cenarios/montanhas/montanha2.png)',
        horizonteBackgroundImage: 'url(./cenarios/tempo_dia/neve.gif)',
        containerFilter: 'brightness(100%) contrast(100%) saturate(80%)',
      },
      {
        backgroundColor: 'DarkSlateGray', // Cerrado
        montanhaBackgroundImage: 'url(./cenarios/montanhas/montanha1.png)',
        horizonteBackgroundImage: 'url(./cenarios/tempo_dia/cerrado.gif)',
        containerFilter:
          'brightness(40%) contrast(80%) saturate(90%) blur(2px)',
      },
    ]
    this.currentIndex = 0
  }
  startAnimation() {
    this.changeColors()
    let frame = setInterval(() => {
      this.gasolina = parseFloat(posto.innerHTML)
      this.relogio = tempo.innerHTML
      this.metros = parseInt(distancia.innerHTML)
      this.rank = lugar.innerHTML

      if (
        this.relogio === '00:00:00' ||
        this.metros === 0 ||
        this.gasolina === 0
      ) {
        clearInterval(frame)
      }
      this.currentIndex = (this.currentIndex + 1) % this.filters.length
      this.changeColors()
    }, 45000)
  }

  changeColors() {
    if (this.currentIndex === 3) {
      this.montanha.style.filter = 'brightness(20%)'
      const fumacaDiv = document.createElement('div')
      fumacaDiv.classList.add('fumaca')
      this.espacoJogador.appendChild(fumacaDiv)
    } else {
      const fumacaDiv = document.querySelector('.fumaca')
      if (fumacaDiv) {
        this.espacoJogador.removeChild(fumacaDiv)
      }
    }
    const currentFilter = this.filters[this.currentIndex]

    this.espacoJogador.style.backgroundColor = currentFilter.backgroundColor
    this.montanha.style.backgroundImage = currentFilter.montanhaBackgroundImage
    this.montanha.style.filter = currentFilter.containerFilter
    this.horizonte.style.backgroundImage =
      currentFilter.horizonteBackgroundImage
    this.container.style.filter = currentFilter.containerFilter
  }
}
// script.js
document.addEventListener('DOMContentLoaded', function () {
  // Obtém elementos do DOM
  const startScreen = document.querySelector('.start-screen')
  const startButton = document.querySelector('.start-button')
  const reiniciarBtn = document.querySelector('.jogueNov')
  // Adiciona um ouvinte de evento para o botão de início
  startButton.addEventListener('click', function () {
    startScreen.style.display = 'none'

    const jogo = new Jogo()
    jogo.inicia()
  })
  reiniciarBtn.addEventListener('click', function () {
    let reiniciar = window.location
    reiniciar.reload()
  })
})
