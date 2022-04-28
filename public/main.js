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
    const url = "http://localhost:5000/app/flip/"

    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (result) {
            
            document.getElementById("flipResult").innerHTML = result.flip;
            document.getElementById("quarter").setAttribute("src", "assets/img/" + result.flip + ".png")
        })
}

// Flip multiple coins and show coin images in table as well as summary results


const sub = document.getElementById("multiSubmit")
sub.addEventListener("click", multipleCoins)

function multipleCoins() {
    const num = document.querySelector('#number').value

    fetch('http://localhost:5000/app/flip/coins/', {
        body: JSON.stringify({
            "number": num
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
        
        document.getElementById("flipResultHead").innerHTML = result.summ.heads;
        document.getElementById("flipResultTail").innerHTML = result.summ.tails;

        // document.getElementById('all_results').innerHTML = `<p>${result.raw}</p>`
        let all_res = ""
        document.getElementById('all_results').innerHTML = ""
        for (let i = 0; i < result.raw.length; i++) {
            let img = document.createElement('img');
            img.src = "./assets/img/" + result.raw[i] + ".png";
            img.class = "smallestcoin";
            img.style = "width: 80px"
            document.getElementById('all_results').appendChild(img);
            all_res += " " + result.raw[i]
            
        }
        document.getElementById('all_results_text').innerHTML = all_res

    })

}


// Enter number and press button to activate coin flip series


// Guess a flip by clicking either heads or tails button
function guessFlip(guess) {
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

            document.getElementById("winorlose").innerHTML = "You " + result.result;
        })
}
