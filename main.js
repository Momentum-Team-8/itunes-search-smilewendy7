//to do list: 
    // search + ???

// const url = "https://proxy-itunes-api.glitch.me/search?"
const url = "https://itunes.apple.com/search?"


const inputContent = document.querySelector('#search-field').value

const form = document.querySelector('.search-form')
const musicListing = document.querySelector('#music-listing')

//click search button, then search songs .... 
form.addEventListener('submit', event=> {
    event.preventDefault()
    document.querySelector('#result-hearder').innerText = "Search Results:"
    searchSongs()
  })

//search reset 
form.addEventListener('reset', event=> {
    location.reload()
  })

//get the list of searching results 
function searchSongs(){
    const inputContent = document.querySelector('#search-field').value
    fetch (url + "entity=song&" + "term="+ `${inputContent}`+ "&limit=36")
    .then(res => res.json())
    .then(data=> {
        console.log("whole data is here :", data)
        console.log("this is the url when searching", url + "entity=song&" + "term="+ `${inputContent}`+ "&limit=36")

        for (let result of data.results){
            // console.log(result)
            // console.log("here is data", result.artworkUrl100)
            renderMusic(result)
        }

        // ***** when results are not found
        if(data.resultCount===0){
        document.querySelector('#result-hearder').innerText = "Sorry, No results found."    
        }
    })
} 

// *********???????????????????????********* console.log(music)


// display photo and link for each of the song 
function renderMusic(music) {
    // *********???????????????????????********* console.log(music)
    console.log(music)
    const eachMusic= document.createElement('li')
    eachMusic.setAttribute("id", `${music.trackId}`)
    eachMusic.setAttribute("class", "each-music")
    musicListing.appendChild(eachMusic)

    // *** name of artist *** 
    const musicArtist = document.createElement('p')
    musicArtist.setAttribute("id", "artist-name")
    eachMusic.appendChild(musicArtist)
    musicArtist.innerText= `${music.artistName}`

        // *** name of song *** 
    const musicName = document.createElement('p')
    musicName.setAttribute("id", "music-name")
    eachMusic.appendChild(musicName)
    musicName.innerText= `${music.trackName}`

    // *** photo of each music ***
    const musicImg = document.createElement('img')
    eachMusic.appendChild(musicImg)
    artSrc= document.createAttribute("src")
    artSrc.value = `${music.artworkUrl100}`
    //set attribute node to img
    musicImg.setAttributeNode(artSrc)

    // *** link of each music to play **** 
    const musicPlayLink = document.createElement('audio')
    eachMusic.appendChild(musicPlayLink)
    previewSrc = document.createAttribute("src")
    previewSrc.value = `${music.previewUrl}`
    musicPlayLink.setAttributeNode(previewSrc)
    controlsAttr = document.createAttribute("controls")
    musicPlayLink.setAttributeNode(controlsAttr)
    musicPlayLink.setAttribute("class", "each-audio")

    // *** play-button on the img 
    const playButton = document.createElement('button')
    playButton.innerText = "Play"
    eachMusic.appendChild(playButton)
    playButton.setAttribute("class", "btn")
    playButton.setAttribute("id", `${music.trackId}`)

    // !!!! ------ ********* click on picture play to each music !!!! ------ *********
        playButton.addEventListener('click', event=> {
         console.log(event.target.id, music.trackId)
    // the preview link is in the data base 
        // if(event.target.id === music.trackId){
            console.log(music.previewUrl)
        //}
            let src = document.createAttribute("src")
            document.getElementById("music-player").setAttributeNode(src)
            src.value= music.previewUrl

            // add music name below the player
            let musicTittle = document.getElementById("music-title")
            musicTittle.innerText= "Now Playing :" + " " + music.artistName+ "----"+ music.trackName
    })
}
// floating audio player ----- this part does not work!!!!

// floatPlayer= document.querySelector('.floating-bar')
// windowPage= document.querySelector('.all')
// console.log(floatPlayer)

// windowPage.scroll(function(){
//     if(windowPage.scrollTop() >= 200){
//         floatPlayer.css({position: "fixed", left: "0", top:"o"})
//     }
//     else{
//         floatPlayer.css({position: "absolute", left: "0", top:"200px"})
//         }
// })




