import api from "./axios"; 

export async function getMe() {
  try {
    const token = localStorage.getItem("token"); 
    if (!token) {
      throw new Error("No token found. User is not authenticated.");
    }

    const res = await api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return res.data.payload;

  } catch (err: any) {
    console.error("Failed to fetch /me:", err);
    return null;
}
}