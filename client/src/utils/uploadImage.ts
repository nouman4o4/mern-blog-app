export async function uploadProfileImage(userId: string, file: Blob) {
  const url = `http://localhost:3000/api/v1/users/update-profile/${userId}`;
  const formData = new FormData();
  formData.append("profile", file, `${userId}_profile.jpg`);
  const response = await fetch(url, {
    method: "PUT",
    body: formData,
    credentials: "include",
  });
  const jsonReponse = await response.json();
  console.log({ response });
  console.log({ jsonReponse });
  return jsonReponse;
}
