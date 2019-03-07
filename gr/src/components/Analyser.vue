<template>
  <div>
    <div
      v-if="showPlayButton"
      class="o-lyrics"
    >
      <p>click button below to play</p>
      <button @click="start">
        play
      </button>
    </div>
    <canvas
      ref="canvasRef"
    />
    <audio
      ref="audioRef"
      :src="audio"
      :controls="isMobile"
    />
  </div>
</template>

<script>
/* globals window */
export default {
  props: {
    audio: {
      type: String,
      default: ''
    },
    totalDuration: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      bufferLength: 0,
      showPlayButton: false,
      frequencyData: [],
      fftSize: 512
    }
  },
  computed: {
    isMobile () {
      return !!navigator.userAgent.match(/iphone|android|blackberry/ig)
    }
  },
  mounted () {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()

    this.analyser = this.audioContext.createAnalyser()

    this.source = this.audioContext.createMediaElementSource(
      this.$refs.audioRef
    )
    this.destination = this.audioContext.destination

    this.analyser.fftSize = this.fftSize
    this.analyser.connect(this.destination)
    this.source.connect(this.analyser)

    this.bufferLength = this.analyser.frequencyBinCount
    this.frequencyData = new Uint8Array(this.bufferLength)

    if (this.audioContext.state !== 'running') {
      this.showPlayButton = true
    } else {
      this.start()
    }
    const canvas = this.$refs.canvasRef
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    this.rafId = requestAnimationFrame(this.nextTick)
  },
  beforeDestroy () {
    cancelAnimationFrame(this.rafId)
    this.analyser.disconnect()
    this.source.disconnect()
  },
  methods: {
    drawImage ({ ctx, src, width, height }) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height)
      }
    },
    drawBar ({ ctx, color, width, height, x, y }) {
      ctx.fillStyle = color
      ctx.fillRect(x, y, width, height)
    },
    paint () {
      const canvas = this.$refs.canvasRef
      const ctx = canvas.getContext('2d')
      const CANVAS_WIDTH = canvas.width
      const CANVAS_HEIGHT = canvas.height

      canvas.style.filter = 'blur(0px)'
      this.drawImage({
        src: '/bg.jpeg',
        ctx: ctx,
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT
      })

      let x = 0

      this.frequencyData.map((_, index) => {
        const height = this.frequencyData[index] / 2
        const width = (CANVAS_WIDTH / this.bufferLength) * 1.5
        const y = CANVAS_HEIGHT - height

        this.drawBar({
          color: '#ffffff',
          ctx: ctx,
          x,
          y,
          width,
          height
        })
        return (x += width + 1)
      })
    },
    start () {
      this.audioContext.resume()
      this.$refs.audioRef.play()
      this.showPlayButton = false
    },
    nextTick () {
      this.analyser.getByteFrequencyData(this.frequencyData)
      this.frequencyData = this.frequencyData
      this.$emit('updateCurrentTime', this.$refs.audioRef.currentTime)
      this.rafId = requestAnimationFrame(this.nextTick)
      this.paint()

      if (Math.floor(this.$refs.audioRef.currentTime) >= this.totalDuration) {
        this.$emit('showCredit')
        setTimeout(() => {
          cancelAnimationFrame(this.rafId)
        }, 5000)
      }
    }
  }
}
</script>
