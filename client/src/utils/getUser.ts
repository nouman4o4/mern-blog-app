const getSingleUser = async (authorId: string) => {
  if (!authorId) {
    console.log("Couldn't find the provided user id")

    return null
  }
  const baseUrl = import.meta.env.VITE_BASE_SERVER_URL
  const url = `${baseUrl}/users/${authorId}`

  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    })
    const jsonResponse = await response.json()

    if (!jsonResponse.success) {
      console.log(
        jsonResponse?.message ||
          "Something went wrong while fetching the author data!"
      )

      return null
    }
    return jsonResponse.data
  } catch (error) {
    console.log(error)

    return null
  }
}

export default getSingleUser
