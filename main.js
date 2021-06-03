//to do list: 
    // search + ???
    //favicon where is it?
    //add lines to seperate sections ... 

const url = "https://proxy-itunes-api.glitch.me/search?"
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
    fetch (url + "entity=song&" + "term="+ `${inputContent}`+ "&limit=10")
    .then(res => res.json())
    .then(data=> {
        // console.log(data)
        console.log(data)
        console.log("this is the url when searching", url + "entity=song&" + "term="+ `${inputContent}`+ "&limit=10")

        let i = 0
        for (let result of data.results){
            // console.log(result)
            // console.log("here is data", result.artworkUrl100)
            renderMusic(result, i)
            i = i + 1
        }
        // console.log("END: " + data.results[0].artworkUrl30)
    })
} 

// display photo and link for each of the song 

function renderMusic(music, index) {
    const eachMusic= document.createElement('li')
    eachMusic.setAttribute("id", `${index}`)
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

    // *** play-button on the img 
    const playButton = document.createElement('button')
    playButton.innerText = "Play"
    eachMusic.appendChild(playButton)
    playButton.setAttribute("class", "btn")
    playButton.setAttribute("id", `${index}`)

}

// click on picture play to each music 
musicListing.addEventListener('click', event=> {
    console.log(event.target.id)

})





