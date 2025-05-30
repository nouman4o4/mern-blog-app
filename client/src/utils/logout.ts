import toast from "react-hot-toast";

export const logout = async (userId: string) => {
  const url = `http://localhost:3000/api/v1/auth/logout/${userId}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    console.log({ response });
    if (!response.ok) {
      toast.error("Error, Failed to logout, try again.");
      console.log(response);
      return false;
    }
    const jsonResponse = await response.json();

    if (!jsonResponse.success) {
      toast.error("Error, Failed to logout, try again.");
      return false;
    }
    toast.success("Logout successfully.");
    return true;
  } catch (error) {
    console.error(error);
    toast.error("Error, Failed to logout, try again.");
    return false;
  }
};
