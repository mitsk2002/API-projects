let meme = document.getElementById("meme");
let title = document.getElementById("title");
let getMemeBtn = document.getElementById("getMemeBtn");
// API URL
let url = "https://meme-api.com/gimme/";
// Array of subreddits of your choice
let subreddits = ["catmemes","wholesomememes","dogmemes","me_irl"];

// function to get random meme
let getMeme = () => {
    // Choose a random subreddit from the subreddits array
    let randomSubreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
    // Fetch data from api
    fetch(url + randomSubreddit)
        .then((resp) => resp.json())
        .then((data) => {
            let memeImg = new Image();
            // Display meme image and title only after image loads
            memeImg.onload = () => {
                meme.src = data.url;
                title.innerHTML = data.title;
            };
            memeImg.src = data.url
    });
};

// Call the getMeme() on button click and on window load

getMemeBtn.addEventListener("click", getMeme);
window.addEventListener("load", getMeme);
