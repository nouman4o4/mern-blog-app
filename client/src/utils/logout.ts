export const logout = async (userId: string) => {
  const url = `http://localhost:3000/api/v1/auth/logout/${userId}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.log(response);
      return false;
    }
    const jsonResponse = await response.json();

    if (!jsonResponse.success) {
      return false;
    }

    localStorage.removeItem("blog-app-user");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
