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
      totalDuration: 174,
      currentTime: 0,
      estimatedIndex: 0,
      songTitle: 'Binar - Gede Rasa',
      lyrics: [
        '',
        'Sembunyi di balik sekat tanpa berani mendekat',
        'Jauh saja sudah merinding',
        'Apalagi dekat',
        'pasti pusing',
        'Tanpa sengaja mata pun bertemu lihat',
        'Rasanya seperti hampir sekarat',
        'Walau tak tahan aku ketagihan',
        'Mungkinkah kita ini sepasang hati yang',
        'tak saling tahu?',
        'Ataukah aku hanya...',
        'si gede rasa yang',
        'bertepuk sebelah tangan?',
        'Oh tuhan, dekatkanku dengannya',
        'Jika memang jodoh',
        'kalau bukan',
        'Tolong periksa lagi'
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
        case time < 9:
          activeLyrics = 0
          this.triggerRaf()
          break
        case time < 16:
          activeLyrics = 1
          this.hideScroll()
          break
        case time < 20:
          activeLyrics = 2
          break
        case time < 22:
          activeLyrics = 3
          break
        case time < 24:
          activeLyrics = 4
          break
        case time < 32:
          activeLyrics = 5
          break
        case time < 36:
          activeLyrics = 6
          break
        case time < 39:
          activeLyrics = 7
          break
        case time < 44:
          activeLyrics = 8
          break
        case time < 47:
          activeLyrics = 9
          break
        case time < 50:
          activeLyrics = 10
          break
        case time < 52:
          activeLyrics = 11
          break
        case time < 56:
          activeLyrics = 12
          break
        case time < 72:
          activeLyrics = 0
          break
        case time < 79:
          activeLyrics = 5
          break
        case time < 83:
          activeLyrics = 6
          break
        case time < 87:
          activeLyrics = 7
          break
        case time < 92:
          activeLyrics = 8
          break
        case time < 95:
          activeLyrics = 9
          break
        case time < 98:
          activeLyrics = 10
          break
        case time < 100:
          activeLyrics = 11
          break
        case time < 104:
          activeLyrics = 12
          break
        case time < 110:
          activeLyrics = 13
          break
        case time < 112:
          activeLyrics = 14
          break
        case time < 114:
          activeLyrics = 15
          break
        case time < 117:
          activeLyrics = 16
          break
        case time < 131:
          activeLyrics = 0
          break
        case time < 136:
          activeLyrics = 8
          break
        case time < 139:
          activeLyrics = 9
          break
        case time < 142:
          activeLyrics = 10
          break
        case time < 144:
          activeLyrics = 11
          break
        case time < 148:
          activeLyrics = 12
          break
        case time < 154:
          activeLyrics = 13
          break
        case time < 156:
          activeLyrics = 14
          break
        case time < 158:
          activeLyrics = 15
          break
        case time < 162:
          activeLyrics = 16
          break
      }
      this.estimatedIndex = activeLyrics
    }
  }
}
</script>
