document.getElementById("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const department = document.getElementById("department").value;

  const response = await fetch("/student", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age, department }),
  });

  const result = await response.json();
  alert(result.message);
});
