<template>
  <div>
    <div class="o-lyrics">
      <template v-if="estimatedIndex !== 0">
        <h2>{{ lyrics[estimatedIndex] }}</h2>
      </template>
      <template v-if="isShowCredit">
        <p>
          <span>Song by {{ songTitle }}</span>
          <a href="https://108kb.io">@108kb</a>
        </p>
      </template>
    </div>
    <Analyser
      audio="/music.mp3"
      :total-duration="totalDuration"
      @updateCurrentTime="updateCurrentTime"
      @showCredit="showCredit"
    />
  </div>
</template>

<script>
import Analyser from '@/components/Analyser'
export default {
  components: {
    Analyser
  },
  data() {
    return {
      isShowCredit: false,
      totalDuration: 64,
      currentTime: 0,
      estimatedIndex: 0,
      songTitle: 'Amigdala - Balada Puan',
      lyrics: [
        '',
        'Kau dan segala cerita ini,',
        'adalah igauan yang tak henti-hentinya minta diberi obat penenang.',
        'Punggungmu adalah bukit yang saban hari tidak kunjung selesai kudaki.',
        'Sampai aku patah kaki,',
        'sementara kau',
        'pura-pura mati.',
        'Kepalaku puisi yang tidak pernah mampu membaca tanda baca di matamu.',
        'Tanda titik',
        'atau kah tanda jeda',
        '...yang berkepanjangan?',
        'Tidak pernah ada rumah',
        'Peta tidak mengenal alamatmu',
        'Berkelok,',
        'dan terlalu banyak persimpangan',
        'Jadi',
        'bagaimana?',
        'Kau yang cuma singgah,',
        'atau aku',
        'yang terlampau sungguh?'
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      document.body.style.opacity = 1
    }, 1000)
  },
  methods: {
    triggerRaf() {
      window.scrollTo(0, 31337)
    },
    hideScroll() {
      // IYKWIM
      window.scrollTo(0, 0)
      document.body.style.overflow = 'hidden'
      document.getElementsByTagName('audio')[0].style.display = 'none'
    },
    showCredit() {
      this.isShowCredit = true
      document.getElementsByTagName('canvas')[0].style.filter = 'blur(5px)'
    },
    updateCurrentTime(time) {
      this.currentTime = Math.floor(time)
      this.checkLyrics(this.currentTime)
    },
    checkLyrics(time) {
      let activeLyrics
      // Does JavaScript has Macro or something related with that?
      switch (true) {
        case time < 4:
          activeLyrics = 0
          this.triggerRaf()
          break
        case time < 6:
          activeLyrics = 1
          this.hideScroll()
          break
        case time < 14:
          activeLyrics = 2
          break
        case time < 20:
          activeLyrics = 3
          break
        case time < 21:
          activeLyrics = 4
          break
        case time < 22:
          activeLyrics = 5
          break
        case time < 26:
          activeLyrics = 6
          break
        case time < 31:
          activeLyrics = 7
          break
        case time < 33:
          activeLyrics = 8
          break
        case time < 35:
          activeLyrics = 9
          break
        case time < 38:
          activeLyrics = 10
          break
        case time < 41:
          activeLyrics = 11
          break
        case time < 44:
          activeLyrics = 12
          break
        case time < 46:
          activeLyrics = 13
          break
        case time < 52:
          activeLyrics = 14
          break
        case time < 53:
          activeLyrics = 15
          break
        case time < 56:
          activeLyrics = 16
          break
        case time < 59:
          activeLyrics = 17
          break
        case time < 60:
          activeLyrics = 18
          break
        case time < 68:
          activeLyrics = 19
          break
        case time < 70:
          activeLyrics = 20
          break
      }
      this.estimatedIndex = activeLyrics
    }
  }
}
</script>
