<script>
  import { onMount } from 'svelte'
  import Analyser from './components/Analyser.svelte'

  let isShowCredit = false
  let totalDuration = 309
  let currentTime = 0
  let estimatedIndex = 0
  let songTitle = 'Nosstress - Pegang Tanganku'
  let lyrics = [
    '',
    'Pegang tanganku',
    'Hentikan tawamu sejenak',
    'Sudah terlalu banyak tuk senang',
    'Sudah saatnya merenung',
    'dan bersyukur',

    'Oh indahnya menjalani',
    'denganmu',
    'Oh nikmatnya bersamamu',

    'Tapi kita harus mulai mengerti',
    'Tapi kita harus mulai batasi',

    'karena',

    'Indah itu tak selalu ada',
    'Senang itu sementara',
    'Jika senang jangan terlalu',
    'Jika sedih jangan terlalu',

    'Oh indahnya menjalani',
    'denganmu',
    'Oh nikmatnya bersamamu',

    'Tapi kita harus mulai mengerti',
    'Tapi kita harus mulai batasi',

    'karena',

    'Indah itu tak selalu ada',
    'Senang itu sementara',
    'Jika senang jangan terlalu',
    'Jika sedih jangan terlalu',

    'Sederhanakan diri',
    'di depan masih panjang',
    'karena hidup tak hanya',
    'senang dan indah',
    'indah dan senang',
    'senang dan indah',
    'indah dan senang',
    'senang dan indah',
    'indah dan senang',
    'senang dan indah',
    'indah dan senang',
    'senang dan indah',
    'indah dan senang',
    'senang dan indah',
    'indah dan senang',
    'senang dan indah',
    'indah dan senang',
    'senang dan indah',
    'indah dan senang',
  ]

  onMount(() => {
    setTimeout(() => {
      document.body.style.opacity = 1
    }, 1000)
  })

  function updateCurrentTime (time) {
    currentTime = Math.floor(time)
    checkLyrics(currentTime)
  }

  function triggerRaf() {
    window.scrollTo(0, 31337)
  }

  function hideScroll() {
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'
    document.getElementsByTagName('audio')[0].style.display = 'none'
  }

  function checkLyrics (time) {
    let activeLyrics

    // masalah?
    switch (true) {
      case time < 19:
        activeLyrics = 0
        triggerRaf()
        break
      case time < 27:
        activeLyrics = 1
        hideScroll()
        break
      case time < 36:
        activeLyrics = 2
        break
      case time < 44:
        activeLyrics = 3
        break
      case time < 49:
        activeLyrics = 4
        break
      case time < 56:
        activeLyrics = 5
        break
      case time < 61:
        activeLyrics = 6
        break
      case time < 64:
        activeLyrics = 7
        break
      case time < 71:
        activeLyrics = 8
        break
      case time < 80:
        activeLyrics = 9
        break
      case time < 88:
        activeLyrics = 10
        break
      case time < 102:
        activeLyrics = 11
        break
      case time < 110:
        activeLyrics = 12
        break
      case time < 119:
        activeLyrics = 13
        break
      case time < 127:
        activeLyrics = 14
        break
      case time < 143:
        activeLyrics = 15
        break
      case time < 149:
        activeLyrics = 16
        break
      case time < 152:
        activeLyrics = 17
        break
      case time < 160:
        activeLyrics = 18
        break
      case time < 168:
        activeLyrics = 19
        break
      case time < 176:
        activeLyrics = 20
        break
      case time < 189:
        activeLyrics = 21
        break
      case time < 197:
        activeLyrics = 22
        break
      case time < 206:
        activeLyrics = 23
        break
      case time < 215:
        activeLyrics = 24
        break
      case time < 224:
        activeLyrics = 25
        break
      case time < 228:
        activeLyrics = 26
        break
      case time < 232:
        activeLyrics = 27
        break
      case time < 235:
        activeLyrics = 28
        break
      case time < 239:
        activeLyrics = 29
        break
      case time < 243:
        activeLyrics = 30
        break
      case time < 247:
        activeLyrics = 31
        break
      case time < 251:
        activeLyrics = 32
        break
      case time < 255:
        activeLyrics = 33
        break
      case time < 260:
        activeLyrics = 34
        break
      case time < 264:
        activeLyrics = 35
        break
      case time < 269:
        activeLyrics = 36
        break
      case time < 273:
        activeLyrics = 37
        break
      case time < 276:
        activeLyrics = 38
        break
      case time < 280:
        activeLyrics = 39
        break
      case time < 285:
        activeLyrics = 40
        break
      case time < 290:
        activeLyrics = 41
        break
      case time < 294:
        activeLyrics = 42
        break
      case time < 298:
        activeLyrics = 43
        break
      case time < 302:
        activeLyrics = 44
        break
      case time < 310:
        activeLyrics = 0
        break
    }

    estimatedIndex = activeLyrics
  }

  function showCredit () {
    document.getElementsByTagName('canvas')[0].style.filter = 'blur(5px)'
    setTimeout(() => {
      isShowCredit = true
    }, 1000)
  }
</script>

  <div>
    <div class="o-lyrics">
      {#if estimatedIndex !== 0}
        <h2>{lyrics[estimatedIndex]}</h2>
      {/if}

      {#if isShowCredit}
        <p>
          <span>Song by {songTitle}</span>
          <a href="https://faultable.dev">@faultable</a>
        </p>
      {/if}

    </div>
    <Analyser
      audio="/music.mp3"
      totalDuration={totalDuration}
      updateCurrentTime={updateCurrentTime}
      showCredit={showCredit}
    />
  </div>
