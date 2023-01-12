const searchUserForm = document.querySelector(".search-user-form");

searchUserForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const searchError = document.querySelector(".search-error");
  searchError.innerText = "";

  let keyword = searchUserForm.search_user.value;

  try {
    const res = await fetch("/manage-user", {
      method: "POST",
      body: JSON.stringify({ keyword }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (data.user) {
      const tbody = document.querySelector("tbody");

      tbody.innerHTML = "";

      data.user.forEach((user) => {
        const tr = document.createElement("tr");

        tr.classList.add("data-user");

        const id = document.createElement("th");
        const username = document.createElement("th");
        const number = document.createElement("th");
        const status = document.createElement("th");
        const lastSignIn = document.createElement("th");
        const manageUserContainer = document.createElement("th");
        const manageUserBtn = document.createElement("a");

        manageUserBtn.innerText = "Manage User";
        manageUserBtn.classList.add("btn-manage-user");
        manageUserBtn.href = `/manage-user/${user._id}`;
        manageUserContainer.appendChild(manageUserBtn);

        id.innerText = user._id;
        username.innerText = user.username;
        number.innerText = user.number;
        status.innerText = "Active";
        lastSignIn.innerText = "Yesterday";

        tr.appendChild(id);
        tr.appendChild(username);
        tr.appendChild(number);
        tr.appendChild(status);
        tr.appendChild(lastSignIn);
        tr.appendChild(manageUserContainer);

        tbody.appendChild(tr);
      });
    }

    if (data.error) {
      searchError.innerText = data.error;
    }
  } catch (error) {
    console.log(error);
  }
});
