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
}

// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button
