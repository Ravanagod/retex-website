/* =====================
   AUTH GUARD
===================== */
if (localStorage.getItem("adminLoggedIn") !== "true") {
  window.location.replace("login.html");
}

/* =====================
   ADMIN NAME
===================== */
document.getElementById("adminName").textContent =
  localStorage.getItem("adminName") || "Admin";

/* =====================
   LOAD DASHBOARD DATA
===================== */
function loadDashboard() {
  const data = JSON.parse(localStorage.getItem("requests")) || [];
  const table = document.getElementById("table");

  table.innerHTML = "";

  let totalKg = 0;
  let cottonCount = 0;

  data.forEach((r, i) => {
    const name = r.name || "—";
    const location = r.location || "—";
    const address = r.address || "—";
    const fabric = r.fabric || "—";
    const quantity = Number(r.quantity) || 0;
    const timestamp = r.timestamp || "—";
    const status = r.status || "Pending";

    totalKg += quantity;
    if (fabric === "Cotton") cottonCount++;

    table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${name}</td>
        <td>${location}</td>
        <td>${address}</td>
        <td>${fabric}</td>
        <td>${quantity}</td>
        <td>${timestamp}</td>
        <td>
          <select onchange="updateStatus(${i}, this.value)">
            <option ${status === "Pending" ? "selected" : ""}>Pending</option>
            <option ${status === "Scheduled" ? "selected" : ""}>Scheduled</option>
            <option ${status === "Collected" ? "selected" : ""}>Collected</option>
          </select>
        </td>
        <td>
          <button onclick="deleteRequest(${i})">Delete</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("total").textContent = data.length;
  document.getElementById("kg").textContent = totalKg + " kg";
  document.getElementById("cotton").textContent = cottonCount;
}

/* =====================
   UPDATE STATUS
===================== */
function updateStatus(index, value) {
  let data = JSON.parse(localStorage.getItem("requests")) || [];
  data[index].status = value;
  localStorage.setItem("requests", JSON.stringify(data));
}

/* =====================
   DELETE REQUEST
===================== */
function deleteRequest(index) {
  let data = JSON.parse(localStorage.getItem("requests")) || [];
  data.splice(index, 1);
  localStorage.setItem("requests", JSON.stringify(data));
  loadDashboard();
}

/* =====================
   LOGOUT
===================== */
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("adminLoggedIn");
  localStorage.removeItem("adminName");
  window.location.replace("login.html");
});

/* =====================
   INIT
===================== */
loadDashboard();
