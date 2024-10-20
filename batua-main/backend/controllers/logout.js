

export const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Successfully logged out" });
}