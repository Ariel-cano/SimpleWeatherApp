//http://api.weatherapi.com/v1/current.json?key=8622c1b65b044e0fb43192552241310&q= Samara&aqi=no

const temperatureField = document.querySelector(".temp")
const locationField = document.querySelector(".time_location p")
const dateField = document.querySelector(".time_location span")
const conditionField = document.querySelector(".condition p")
const searchField = document.querySelector(".search_area")
const form = document.querySelector("form")


form.addEventListener("submit", searchForLocation)
let target = "Samara"
const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=8622c1b65b044e0fb43192552241310&q=${targetLocation}&aqi=no`

    const res = await fetch(url)
    const data =  await res.json()

    console.log(data)

    let locationName = data.location.name
    let time = data.location.localtime
    let temp = data.current.temp_c
    let condition = data.current.condition.text
    updateDetails(temp, condition, locationName, time)

}
function updateDetails(temp, condition, locationName, time) {

    let splitDate = time.split(" ")[0]
    let splitTime = time.split(" ")[1]
    let currentDay = getDayName(new Date(splitDate).getDay())
    temperatureField.innerText = temp;
    locationField.innerText = locationName;
    dateField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerText = condition;
}
function getDayName(number){
    switch(number){
        case 0:
            return "Sunday"
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"

    }
}

function searchForLocation(e){
    e.preventDefault()
    target = searchField.value
    fetchResults(target)
}
fetchResults(target)