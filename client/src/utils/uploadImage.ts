export async function uploadProfileImage(userId: string, file: Blob) {
  const baseUrl = import.meta.env.VITE_BASE_SERVER_URL
  const url = `${baseUrl}/users/update-profile/${userId}`
  const formData = new FormData()
  formData.append("profile", file, `${userId}_profile.jpg`)
  const response = await fetch(url, {
    method: "PUT",
    body: formData,
    credentials: "include",
  })
  const jsonReponse = await response.json()

  return jsonReponse
}
