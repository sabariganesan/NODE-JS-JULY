import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import bcrypt from "bcrypt";

const filePath = path.resolve(process.cwd(), "./data/user.json");

export const postUser = async (request, response) => {
  try {
    let { name, email, password } = request.body;
    password = await bcrypt.hash(password, 10);
    const id = uuidv4();
    fs.readFile(filePath, (error, data) => {
      if (error) throw error;
      const existingData = JSON.parse(data);
      existingData.push({
        name,
        email,
        password,
        id,
      });
      // For write the file content
      fs.writeFile(filePath, JSON.stringify(existingData), (error) => {
        if (error) throw error;
        response.status(200).json({ message: "User submitted successfully" });
      });
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Something went wrong", error });
  }
};

export const login = (request, response) => {
  const { email, password } = request.body;
  fs.readFile(filePath, async (error, users) => {
    if (error) throw error;
    // check user email
    users = JSON.parse(users);
    const matchedUser = users.find((doc) => doc.email === email);
    if (!matchedUser) {
      response.status(500).json({ message: "Email address is not matching" });
    } else {
      const isPasswordMatched = await bcrypt.compare(
        password,
        matchedUser.password
      );
      if (isPasswordMatched) {
        const { password, ...user } = matchedUser;
        response.status(200).json({ message: "Succcess", data: user });
      } else {
        response.status(500).json({ message: "Password is not matching" });
      }
    }
  });
};
