const container = document.getElementById("container");
const input = document.getElementById("input");
const button = document.getElementById("button");
const userInfo = document.getElementById("userInfo");

button.addEventListener("click", async (e) => {
  e.preventDefault();
  const user = input.value;

  try {
    const response = await fetch("https://api.github.com/users/" + user);
    if (!response.ok) {
      throw new Error(`Error:${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    elemente(data);
    storeData(`${user}`, data);
  } catch (error) {
    if (!user) {
      userInfo.innerHTML = `!!!Please try with valid user!!!`;
      userInfo.style.color = "orange";
      userInfo.style.textDecoration = "underline";
      userInfo.style.fontWeight = "bold";
      return;
    } else {
      userInfo.innerHTML = error.message;
    }
  }
});
const elemente = async (y) => {
  const date = document.createElement("div");
  date.innerHTML = `
        <img src="${y.avatar_url}" alt="avatar" width="150" height="150"></img>
        <h3>${y.name}</h3>
        <h4>Public Repository: ${y.public_repos}</h4>
        <h5>Followers: ${y.followers}</h5>
     `;
  container.appendChild(date);
  userInfo.prepend(date);
};
function storeData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
localStorage.clear();

button.addEventListener("click", function handleClick(event) {
  event.preventDefault();
  const userNameInput = input;
  console.log(userNameInput.value);
  userNameInput.value = "";
});
