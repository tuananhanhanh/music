const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'F8_PLAYER'

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const btnNext = $('.btn-next')
const btnprev = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const activeBtn = $('.song.active')
const playlist = $('.playlist')

const app = {
    currentIndex : 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Despacito',
            singer: 'Puerto Rico',
            path: './assets/music/song1.mp3',
            image: './assets/image/song1.jpg'
        },
        {
            name: 'Shape of You',
            singer: 'Ed Sheeran',
            path: './assets/music/song2.mp3',
            image: './assets/image/song2.jpg'
        },
        {
            name: 'See You Again',
            singer: 'Wiz Khalifa',
            path: './assets/music/song3.mp3',
            image: './assets/image/song3.png'
        },
        {
            name: 'Uptown Funk',
            singer: 'Mark Ronson',
            path: './assets/music/song4.mp3',
            image: './assets/image/song4.jpg'
        },
        {
            name: 'GANGNAM STYLE',
            singer: 'PSY',
            path: './assets/music/song5.mp3',
            image: './assets/image/song5.png'
        },
        {
            name: ' Roar ',
            singer: 'Katy Perry',
            path: './assets/music/song6.mp3',
            image: './assets/image/song6.jpg'
        },
        {
            name: ' Waka Waka ',
            singer: 'Shakira',
            path: './assets/music/song7.mp3',
            image: './assets/image/song7.jpg'
        },
        {
            name: ' Counting Stars',
            singer: 'OneRepublic',
            path: './assets/music/song8.mp3',
            image: './assets/image/song8.jpg'
        },
        {
            name: 'Let Her Go',
            singer: 'Passenger',
            path: './assets/music/song9.mp3',
            image: './assets/image/song9.jpg'
        },
        {
            name: 'Perfect',
            singer: 'Ed Sheeran',
            path: './assets/music/song10.mp3',
            image: './assets/image/song10.jpg'
        },
        {
            name: 'Baby ft. Ludacris',
            singer: 'Justin Bieber',
            path: './assets/music/song11.mp3',
            image: './assets/image/song11.jpg'
        },
        {
            name: 'Closer (Lyric) ft. Halsey',
            singer: 'The Chainsmokers',
            path: './assets/music/song12.mp3',
            image: './assets/image/song12.jpg'
        },
        {
            name: 'Rockabye',
            singer: 'Clean Bandit',
            path: './assets/music/song13.mp3',
            image: './assets/image/song13.jpg'
        },
        {
            name: 'This Is What You Came For',
            singer: 'Calvin Harris, Rihanna',
            path: './assets/music/song14.mp3',
            image: './assets/image/song14.jpg'
        },
        {
            name: 'What Do You Mean?',
            singer: 'Justin Bieber',
            path: './assets/music/song15.mp3',
            image: './assets/image/song15.jpg'
        },
        {
            name: 'L???i nh???',
            singer: '??en V??u',
            path: './assets/music/song16.mp3',
            image: './assets/image/song16.jpg'
        },
        {
            name: 'B??i n??y chill ph???t',
            singer: '??en ft. MIN',
            path: './assets/music/song17.mp3',
            image: './assets/image/song17.jpg'
        },
    ],
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config ))
    },
    render   : function() {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        playlist.innerHTML = htmls.join('')
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        const _this = this
        const cdWidth = cd.offsetWidth
        //x??? l?? CD quay / d???ng
        const CdThumdAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000, //10 seconds
            iterations: Infinity
        })

        CdThumdAnimate.pause()
        //x??? l?? ph??ng to / thu nh??? cd
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px': 0
            cd.style.opacity = newCdWidth / cdWidth

        }

        //x??? l?? khi click play
        playBtn.onclick = function () {
            if(_this.isPlaying) {
                audio.pause()
            } else {
                audio.play() 
            }

        }
        //khi b??i h??t ???????c play
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            CdThumdAnimate.play()
        }
        //khi b??i h??t b??? pause
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            CdThumdAnimate.pause()
        }
        //khi ti???n ????? b??i h??t thay ?????i
        audio.ontimeupdate = function () {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }

        }
        // x??? l?? khi tua b??i h??t 
        progress.onchange = function (e) {
            const seekTime = audio.duration / 100 * e.target.value 
            audio.currentTime = seekTime
        }
        //khi next song
        btnNext.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        //khi prev song
        btnprev.onclick = function() {
            if( _this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.PevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        //x??? l?? random b???t t???t 
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active',_this.isRandom)
        }
        // x??? l?? ph??t l???i m???t b??i h??t
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active',_this.isRepeat)
        }

        //x??? l?? next song khi audio ended
        audio.onended = function () {
            if(_this.isRepeat) {
                audio.play()
            } else {
                btnNext.onclick()
            }
        }
        // l???ng nghe h??nh vi click v??o playlist
        playlist.onclick = function(e) {
            const songElement = e.target.closest('.song:not(.active)')
            if(songElement || e.target.closest('.option')) {
                // x??? l?? click v??o song
                if (songElement) {
                    _this.currentIndex= Number(songElement.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                    
                }

                // x??? l?? khi click v??o song option 
                if(e.target.closest('.option')) {

                }
            } 
            
        }
        
    },
    scrollToActiveSong : function() {
        setTimeout(()=> {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }, 200)
    },

    loadConfig: function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat

    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
        
    },  

    nextSong: function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex=0
        }
        this.loadCurrentSong()
    },
    PevSong: function() {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex= this.songs.length -1
        }
        this.loadCurrentSong()
    },

    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random()*this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function() {
        // G??n c???u h??nh t??? config v??o ???ng d???ng
        this.loadConfig()
        //?????nh ngh??a c??c thu???c t??nh cho Object  
        this.defineProperties()

        //L???ng nghe/ x??? l?? c??c s??? ki???n( DOM events)
        this.handleEvents()

        //t???i th??ng tin b??i h??t ?????u ti??n v??o UI khi ch???y ???ng d???ng
        this.loadCurrentSong()

        //render l???i playlist
        this.render()

        //ph??t b??i h??t ti???p theo
        randomBtn.classList.toggle('active',this.isRandom)
        repeatBtn.classList.toggle('active',this.isRepeat)


    }
}

app.start()