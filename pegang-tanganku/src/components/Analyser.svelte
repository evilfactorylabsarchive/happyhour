<script>
  import { onMount, onDestroy } from 'svelte'

  export let audio
  export let totalDuration
  export let updateCurrentTime
  export let showCredit

  let isMobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig)
  let showPlayButton = false
  let bufferLength = 0
  let fftSize = 512
  let frequencyData = []

  let rafId
  let audioRef
  let audioContext
  let canvasRef

  let source
  let analyser

  onMount(() => {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
    analyser = audioContext.createAnalyser()
    source = audioContext.createMediaElementSource(audioRef)

    const destination = audioContext.destination

    analyser.fftSize = fftSize

    analyser.connect(destination)
    source.connect(analyser)

    bufferLength = analyser.frequencyBinCount
    frequencyData = new Uint8Array(bufferLength)

    if (audioContext.state !== 'running') {
      showPlayButton = true
    } else {
      start()
    }

    let canvas = canvasRef
    canvasRef.width = window.innerWidth
    canvasRef.height = window.innerHeight

    rafId = requestAnimationFrame(nextTick)
  })

  onDestroy(() => {
    cancelAnimationFrame(rafId)
    analyser.disconnect()
    source.disconnect()
  })

  function start () {
    audioContext.resume()
    audioRef.play()
    showPlayButton = false
  }

  function drawImage ({ ctx, src, width, height }) {
    const img = new Image()

    img.src = src
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height)
    }
  }

  function drawBar ({ ctx, color, width, height, x, y }) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
  }

  function paint () {
    const canvas = canvasRef
    const ctx = canvas.getContext('2d')

    const CANVAS_WIDTH = canvas.width
    const CANVAS_HEIGHT = canvas.height

    drawImage({
      src: '/bg.jpg',
      ctx: ctx,
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT
    })

    let x = 0

    frequencyData.map((_, index) => {
      const height = frequencyData[index] / 2
      const width = (CANVAS_WIDTH / bufferLength) * 1.5
      const y = CANVAS_HEIGHT - height

      drawBar({
        color: '#ffffff',
        ctx: ctx,
        x,
        y,
        width,
        height
      })

      return (x += width + 1)
    })
  }

  function nextTick () {
    analyser.getByteFrequencyData(frequencyData)
    frequencyData = frequencyData

    updateCurrentTime(audioRef.currentTime)

    rafId = requestAnimationFrame(nextTick)
    
    paint()

    if (Math.floor(audioRef.currentTime) >= totalDuration) {
      showCredit()
      setTimeout(() => {
        cancelAnimationFrame(rafId)
      }, 5000)
    }
  }
</script>

<style>

  audio {
    background-color: #eeeeee;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  audio::-webkit-media-controls-panel {
    background-color: #eeeeee;
  }

  canvas {
    width: 100%;
    height: 100%;
    transition: 0.8s all;
  }

  @media screen and (min-width: 30em) {
    canvas {
      width: 100%;
      height: 100vh;
    }
  }

</style>

  <div>
    {#if showPlayButton}
      <div class="o-lyrics">
        <p>click button below to play</p>
        <button on:click={start}>
          play
        </button>
      </div>
    {/if}

    <canvas bind:this={canvasRef} />
    <audio
      bind:this={audioRef}
      src={audio}
      controls={isMobile}
    />
  </div>
