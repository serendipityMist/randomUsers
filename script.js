const fonts = document.querySelectorAll("#bottomContainer i");
const api = "https://randomuser.me/api/";
let info = document.querySelector(".info");
let userInfo = document.querySelector(".userInfo");
let img = document.querySelector("#imageContainer");

// Function to fetch new user data
const fetchAPI = async () => {
  // Show loading text before fetching data
  info.innerText = "Fetching user details...";
  userInfo.innerText = "Please wait...";
  img.src = "https://dummyimage.com/150x150/cccccc/ffffff.png&text=Loading"; // Placeholder image

  try {
    const response = await fetch(api);
    const randomData = await response.json();
    console.log(randomData);
    if (randomData) {
      info.innerText = "My Name is";
      userInfo.innerText = `${randomData.results[0].name.first} ${randomData.results[0].name.last}`;
    }

    // Update image immediately after fetching data
    img.src = `${randomData.results[0].picture.large}`;

    fonts.forEach((element, index) => {
      element.addEventListener("mouseenter", () => {
        fonts.forEach((el) => el.classList.remove("active"));

        // Add "active" class to the clicked icon
        element.classList.add("active");
        switch (index) {
          case 0:
            info.innerText = "Hi, My Name is";
            userInfo.innerText = `${randomData.results[0].name.first} ${randomData.results[0].name.last}`;
            break;
          case 1:
            info.innerText = "My email address is";
            userInfo.innerText = `${randomData.results[0].email}`;
            break;
          case 2:
            info.innerText = "My Birthday is";
            userInfo.innerText = `${randomData.results[0].dob.date.slice(
              0,
              10
            )}`;
            break;
          case 3:
            info.innerText = "My address is";
            userInfo.innerText = `${randomData.results[0].location.street.number} ${randomData.results[0].location.street.name}`;
            break;
          case 4:
            info.innerText = "My phone number is";
            userInfo.innerText = `${randomData.results[0].phone}`;
            break;
          case 5:
            info.innerText = "My password is";
            userInfo.innerText = `${randomData.results[0].login.password}`;
            break;
          default:
            console.log("Not working");
            break;
        }
      });
    });
  } catch (error) {
    info.innerText = "Failed to fetch user details.";
    userInfo.innerText = "Please try again later.";
  }
};

// Load new user data when page loads
window.onload = fetchAPI;
