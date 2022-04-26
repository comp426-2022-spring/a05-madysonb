// Focus div based on nav button click
const home = document.getElementById("homenav");
home.addEventListener("click", activeHome);
function activeHome() {
    document.getElementById("home").className = "active";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "hidden";
}
const single = document.getElementById("singlenav");
single.addEventListener("click", activeSingle);
function activeSingle() {
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "active";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "hidden";
}
const multiple = document.getElementById("multinav");
multiple.addEventListener("click", activeMultiple);
function activeMultiple() {
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "active";
    document.getElementById("guess").className = "hidden";
}

const guess = document.getElementById("guessnav");
guess.addEventListener("click", activeGuess);
function activeGuess() {
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "active";
}

// Flip one coin and show coin image to match result when button clicked
const coin = document.getElementById("coin");
coin.addEventListener("click", flipImage);
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
function flipImages() {
    numberCoins = document.getElementById("numberCoins").value

    fetch('http://localhost:5000/app/flip/coins/', {
        body: JSON.stringify({
            "number": numberCoins
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "post"
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (result) {
            document.getElementById("summaryHeads").innerHTML = result.summary.heads
            document.getElementById("summaryTails").innerHTML = result.summary.tails
            var flipTable = document.getElementById("details");
            
            for (var i = 0; i < result.raw.length; i++) {
                var row = document.createElement("tr");

                var num = document.createElement("td");
                
                num.innerHTML = i + 1;
                row.appendChild(num);

                var res = document.createElement("td");
                res.innerHTML = result.raw[i];
                row.appendChild(res);

                var thisImSpot = document.createElement("td");
                var thisCoin = document.createElement("img");
                thisCoin.setAttribute("src", "assets/img/" + result.raw[i] + ".png");
                thisCoin.setAttribute("class", "smallcoin");
                thisCoin.appendChild(thisCoin);
                row.appendChild(thisImSpot);

                flipTable.appendChild(row);
            }
        }) 

        document.getElementById("resultTables").setAttribute("class", "active");
}

// Enter number and press button to activate coin flip series


// Guess a flip by clicking either heads or tails button
function guessFlip(guess) {
    console.log(guess);
    fetch('http://localhost:5000/app/flip/call/', {
        body: JSON.stringify({
            "guess": guess
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "post"
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (result) {
            document.getElementById("guessPickText").innerHTML = result.call;
            document.getElementById("guessPickImage").setAttribute("src", "assets/img/" + result.call + ".png")

            document.getElementById("guessActualResultText").innerHTML = result.flip;
            document.getElementById("guessActualResultImage").setAttribute("src", "assets/img/" + result.flip + ".png");

            document.getElementById("guessWinOrLoss").innerHTML = "You " + result.result + ".";
        })
}
