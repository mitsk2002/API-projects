const details = document.querySelector(".details");
const imgContainer = document.querySelector(".img-container");
const getUserBtn = document.getElementById("get-user-btn");
const url = "https://randomuser.me/api/";

const getUser = () => {
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      const user = data.results[0];

      // Set image and user details
      imgContainer.innerHTML = `<img src="${user.picture.large}" alt="User Avatar">`;
      details.innerHTML = `
        <h2>${user.name.first} ${user.name.last}</h2>
        <h3>${user.login.username}</h3>
        <h4><i class="fa-solid fa-location-dot"></i> ${user.location.city}, ${user.location.country}</h4>
      `;

      // Set a random theme color
      const randomColor = "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
      document.documentElement.style.setProperty("--theme-color", randomColor);
    })
    .catch((err) => console.error("Fetch error:", err));
};

// Load a user when page loads
window.addEventListener("load", getUser);

// Load a new user when button is clicked
getUserBtn.addEventListener("click", getUser);
