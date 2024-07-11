import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

const userFilePath = path.resolve(process.cwd(), "./data/user.json");

export const protect = (request, response, next) => {
  try {
    const authToken = request.headers.authorization;
    const loggedUser = jwt.verify(authToken, process.env.SECRET_TOKEN);

    fs.readFile(userFilePath, (error, data) => {
      if (error) throw error;
      const existingData = JSON.parse(data);
      const user = existingData.find(({ id }) => id === loggedUser.id);
      if (!user) {
        response.status(401).json({ message: "Invalid User" });
      } else {
        next();
      }
    });
  } catch (error) {
    console.log(error);
    response.status(401).json({ message: "Invalid User", error });
  }
};
