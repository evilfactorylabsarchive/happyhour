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
  data () {
    return {
      isShowCredit: false,
      totalDuration: 265,
      currentTime: 0,
      estimatedIndex: 0,
      songTitle: 'Senja - Perih',
      // thanks: https://genius.com/Senja-perih-lyrics
      lyrics: [
        '',
        'Waktu perlahan menuntunku',
        'Berjumpa lagi denganmu',
        'Seseorang yang dulu',
        'Bersamaku',
        'Takdir tak ingin kita bersatu',
        'Kini kau bersamanya',
        'Tak ada ruang untukku',
        'Di hatimu',
        'Terlambat kusesali semua yang terjadi',
        'Di saat kutahu kau tak mungkin kembali',
        'Tak kusangka sedalam ini ku terluka',
        'Karena cinta yang kuingkari',
        'Andai saja aku bisa merubah sang waktu',
        'Tak akan pernah ku berpaling meninggalkanmu',
        'Mencoba sekuat hatiku merelakanmu',
        'Dengannya... meski ku takkan bisa'
      ]
    }
  },
  mounted () {
    setTimeout(() => {
      document.body.style.opacity = 1
    }, 1000)
  },
  methods: {
    triggerRaf () {
      window.scrollTo(0, 31337)
    },
    hideScroll () {
      // IYKWIM
      window.scrollTo(0, 0)
      document.body.style.overflow = 'hidden'
      document.getElementsByTagName('audio')[0].style.display = 'none'
    },
    showCredit () {
      this.isShowCredit = true
      document.getElementsByTagName('canvas')[0].style.filter = 'blur(5px)'
    },
    updateCurrentTime (time) {
      this.currentTime = Math.floor(time)
      this.checkLyrics(this.currentTime)
    },
    checkLyrics (time) {
      let activeLyrics
      // Does JavaScript has Macro or something related with that?
      switch (true) {
        case time < 19:
          activeLyrics = 0
          this.triggerRaf()
          break
        case time < 28:
          activeLyrics = 1
          this.hideScroll()
          break
        case time < 35:
          activeLyrics = 2
          break
        case time < 42:
          activeLyrics = 3
          break
        case time < 47:
          activeLyrics = 4
          break
        case time < 55:
          activeLyrics = 5
          break
        case time < 64:
          activeLyrics = 6
          break
        case time < 71:
          activeLyrics = 7
          break
        case time < 78:
          activeLyrics = 8
          break
        case time < 85:
          activeLyrics = 9
          break
        case time < 92:
          activeLyrics = 10
          break
        case time < 100:
          activeLyrics = 11
          break
        case time < 108:
          activeLyrics = 12
          break
        case time < 122:
          activeLyrics = 0
          break
        case time < 132:
          activeLyrics = 5
          break
        case time < 138:
          activeLyrics = 6
          break
        case time < 145:
          activeLyrics = 7
          break
        case time < 150:
          activeLyrics = 8
          break
        case time < 178:
          activeLyrics = 0
          break
        case time < 185:
          activeLyrics = 9
          break
        case time < 192:
          activeLyrics = 10
          break
        case time < 199:
          activeLyrics = 11
          break
        case time < 207:
          activeLyrics = 12
          break
        case time < 213:
          activeLyrics = 13
          break
        case time < 220:
          activeLyrics = 14
          break
        case time < 228:
          activeLyrics = 15
          break
        case time < 240:
          activeLyrics = 16
          break
        case time < 265:
          activeLyrics = 0
          break
        default:
          activeLyrics = 0
          break
      }
      this.estimatedIndex = activeLyrics
    }
  }
}
</script>
