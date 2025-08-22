let entries = [];
let editIndex = -1;

function renderTable() {
  const tbody = document.getElementById("tallyTableBody");
  tbody.innerHTML = "";

  entries.forEach((entry, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${entry.companyName}</td>
        <td>${entry.vaultPassword} <i class="bi bi-clipboard copy-icon" onclick="copyToClipboard('${entry.vaultPassword}')"></i></td>
        <td>${entry.userName}</td>
        <td>${entry.password} <i class="bi bi-clipboard copy-icon" onclick="copyToClipboard('${entry.password}')"></i></td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="editEntry(${index})"><i class="bi bi-pencil-square"></i></button>
          <button class="btn btn-sm btn-danger" onclick="deleteEntry(${index})"><i class="bi bi-trash"></i></button>
        </td>
      </tr>
    `;
  });

  console.log("Table rendered with entries:", entries);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
  });
}

document.getElementById("tallyForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const companyName = document.getElementById("companyName").value.trim();
  const vaultPassword = document.getElementById("vaultPassword").value.trim();
  const userName = document.getElementById("userName").value.trim();
  const password = document.getElementById("password").value.trim();

  // Duplicate check (ignore case)
  const isDuplicate = entries.some((entry, idx) =>
    entry.companyName.toLowerCase() === companyName.toLowerCase() &&
    idx !== editIndex
  );

  if (isDuplicate) {
    alert("Company name already exists!");
    return;
  }

  if (editIndex === -1) {
    entries.push({ companyName, vaultPassword, userName, password });
  } else {
    entries[editIndex] = { companyName, vaultPassword, userName, password };
    editIndex = -1;
  }

  this.reset();
  renderTable();
});

function editEntry(index) {
  const entry = entries[index];
  document.getElementById("companyName").value = entry.companyName;
  document.getElementById("vaultPassword").value = entry.vaultPassword;
  document.getElementById("userName").value = entry.userName;
  document.getElementById("password").value = entry.password;
  editIndex = index;
}

function deleteEntry(index) {
  if (confirm("Are you sure you want to delete this entry?")) {
    entries.splice(index, 1);
    renderTable();
  }
}
