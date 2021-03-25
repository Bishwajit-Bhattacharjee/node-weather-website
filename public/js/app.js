console.log('In dino!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const correctMsg = document.querySelector('#right')
const wrongMsg = document.querySelector('#wrong')


const findWeather = (loc) => {
    fetch('/weather?address=' + loc).then((response) => {
        response.json().then((data)=> {
            if (data.error){
                correctMsg.textContent = ''
                wrongMsg.textContent = data.error
                console.log(data.error)
            }else {
                correctMsg.textContent = data.location 
                wrongMsg.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })    
    })
}


weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    
    correctMsg.textContent = "Loading!!!!"
    wrongMsg.textContent = ""
    
    const location = search.value
    findWeather(location)

})