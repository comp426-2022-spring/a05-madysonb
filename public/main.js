// Dependencies
const cors = require('cors') // Add cors dependency
app.use(cors()) // Set up cors middleware on all endpoints
    
app.use(express.json()) // Allow JSON body messages on all endpoints

// Focus div based on nav button click

// Flip one coin and show coin image to match result when button clicked

// Flip multiple coins and show coin images in table as well as summary results
app.post('/app/flip/coins/', (req, res, next) => {
    const flips = coinFlips(req.body.number)
    const count = countFlips(flips)
    res.status(200).json({"raw":flips,"summary":count})
})
// Serve static HTML files
app.use(express.static('./index.html'))

// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button
