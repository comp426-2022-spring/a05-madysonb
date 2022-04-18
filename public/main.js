// Focus div based on nav button click
function focusDiv(divname) {
    var activeDivs = document.getElementsByClassName("active");
    var activeDivsArr = Array.from(activeDivs)
    activeDivsArr.forEach(function (currentdiv) {
        currentdiv.setAttribute("class", "hidden");
    })

    document.getElementById(divname).setAttribute("class", "active");
}

// Flip one coin and show coin image to match result when button clicked
function flipImage() {
    fetch('http://localhost:5000/app/flip/')
        .then(function (response) {
            return response.json()
        })
        .then(function (result) {
            document.getElementById("flipResult").innerHTML = result.flip;
            document.getElementById("quarter").setAttribute("src", "assets/img/" + result.flip + ".png")
        })
}

// Flip multiple coins and show coin images in table as well as summary results


// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button
