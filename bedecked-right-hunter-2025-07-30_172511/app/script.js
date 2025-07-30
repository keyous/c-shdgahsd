document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reportForm");
  const confirmation = document.getElementById("confirmation");
  const reportList = document.getElementById("reportList");

  let reports = [];
  let editingIndex = null;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const report = {
      location: form.location.value,
      time: form.time.value,
      species: form.species.value,
      size: form.size.value || "N/D",
      danger: form.danger.value,
      behavior: form.behavior.value || "N/D",
      squad: form.squad.value,
      description: form.description.value,
      contact: form.contact.value,
      civilians: form.civilians.checked,
      evacuated: form.evacuated.checked
    };

    if (editingIndex !== null) {
      reports[editingIndex] = report;
      editingIndex = null;
    } else {
      reports.push(report);
    }

    updateReportList();

    form.classList.add("hidden");
    confirmation.classList.remove("hidden");

    setTimeout(() => {
      form.reset();
      form.classList.remove("hidden");
      confirmation.classList.add("hidden");
    }, 2000);
  });

  function updateReportList() {
    reportList.innerHTML = "";

    if (reports.length === 0) {
      reportList.innerHTML = "<p>Nessuna segnalazione ancora registrata.</p>";
      return;
    }

    reports.forEach((r, index) => {
      const div = document.createElement("div");
      div.className = "report-entry";
      div.innerHTML = `
        <strong>#${index + 1}</strong><br/>
        <strong>Luogo:</strong> ${r.location}<br/>
        <strong>Orario:</strong> ${new Date(r.time).toLocaleString()}<br/>
        <strong>Specie:</strong> ${r.species}<br/>
        <strong>Dimensione:</strong> ${r.size} m<br/>
        <strong>Pericolosità:</strong> ${r.danger}<br/>
        <strong>Comportamento:</strong> ${r.behavior}<br/>
        <strong>Squadra inviata:</strong> ${r.squad}<br/>
        <strong>Dettagli:</strong> ${r.description}<br/>
        <strong>Operatore:</strong> ${r.contact}<br/>
        <strong>Civili in pericolo:</strong> ${r.civilians ? "Sì" : "No"}<br/>
        <strong>Zona evacuata:</strong> ${r.evacuated ? "Sì" : "No"}<br/>
      `;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Modifica";
      editBtn.classList.add("edit-btn");
      editBtn.onclick = () => editReport(index);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Elimina";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.onclick = () => deleteReport(index);

      div.appendChild(editBtn);
      div.appendChild(deleteBtn);

      reportList.appendChild(div);
    });
  }

  function editReport(index) {
    const r = reports[index];
    form.location.value = r.location;
    form.time.value = r.time;
    form.species.value = r.species;
    form.size.value = r.size === "N/D" ? "" : r.size;
    form.danger.value = r.danger;
    form.behavior.value = r.behavior === "N/D" ? "" : r.behavior;
    form.squad.value = r.squad;
    form.description.value = r.description;
    form.contact.value = r.contact;
    form.civilians.checked = r.civilians;
    form.evacuated.checked = r.evacuated;

    editingIndex = index;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteReport(index) {
    if (confirm("Confermi l'eliminazione della segnalazione?")) {
      reports.splice(index, 1);
      updateReportList();
    }
  }
});
