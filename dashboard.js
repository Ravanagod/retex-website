/* AUTH GUARD */
if (localStorage.getItem("adminLoggedIn") !== "true") {
  window.location.replace("login.html");
}

/* ADMIN NAME */
document.getElementById("adminName").textContent =
  localStorage.getItem("adminName") || "Admin";

/* LOAD DATA */
function loadDashboard(){
  const data = JSON.parse(localStorage.getItem("requests")) || [];
  const table = document.getElementById("table");

  table.innerHTML = "";

  let totalKg = 0;
  let cottonCount = 0;

  data.forEach((r,i)=>{
    totalKg += r.quantity;
    if(r.fabric === "Cotton") cottonCount++;

    table.innerHTML += `
      <tr>
        <td>${r.name}</td>
        <td>${r.location}</td>
        <td>${r.fabric}</td>
        <td>${r.quantity}</td>
        <td>
          <select onchange="updateStatus(${i}, this.value)">
            <option ${r.status==="Pending"?"selected":""}>Pending</option>
            <option ${r.status==="Scheduled"?"selected":""}>Scheduled</option>
            <option ${r.status==="Collected"?"selected":""}>Collected</option>
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

/* UPDATE STATUS */
function updateStatus(index,value){
  let data = JSON.parse(localStorage.getItem("requests")) || [];
  data[index].status = value;
  localStorage.setItem("requests", JSON.stringify(data));
}

/* DELETE */
function deleteRequest(index){
  let data = JSON.parse(localStorage.getItem("requests")) || [];
  data.splice(index,1);
  localStorage.setItem("requests", JSON.stringify(data));
  loadDashboard();
}

/* LOGOUT */
document.getElementById("logoutBtn").addEventListener("click", ()=>{
  localStorage.removeItem("adminLoggedIn");
  localStorage.removeItem("adminName");
  window.location.replace("login.html");
});

/* INIT */
loadDashboard();
