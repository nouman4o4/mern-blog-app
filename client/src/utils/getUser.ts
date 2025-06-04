import toast from "react-hot-toast";

const getSingleUser = async (authorId: string) => {
  if (!authorId) {
    toast.error("Couldn't find the provided user_id");
    return null;
  }

  const url = `http://localhost:3000/api/v1/users/${authorId}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    const jsonResponse = await response.json();
    if (!jsonResponse.success) {
      toast.error(
        "Something went wrong while fetching the author data!"
      );
      return null;
    }
    return jsonResponse.data;
  } catch (error) {
    console.log(error);
    toast.error("Opps! something went wrong");
    return null;
  }
};

export default getSingleUser;
