import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== "12345") {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { name },
    process.env.JWT_SECRET || "defaultsecret",
    { expiresIn: "1d" }
  );

  return res.status(200).json({
    message: "Login successful",
    token,
    user: {
      name,
      role: "participant",
    },
  });
};

export const checkAuth = (req,res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checking auth:",error.message);
        return res.status(401).json({message:"Internal Server Error"});
    }
}