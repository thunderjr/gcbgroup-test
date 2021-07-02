const BASE_URL = 'http://localhost:3000';

async function deleteDoctor(id) {
  const reqObj = new Request(`${BASE_URL}/doctors/${id}`, { method: 'DELETE' });
  await fetch(reqObj);
  window.location.reload();
  return;
}
