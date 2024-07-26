// using file-system

import Customer from "../modal/customer.modal.js";

// import fs from "fs";
// import path from "path";

// const filePath = path.resolve(process.cwd(), "./data/customer.json");

// export const findCustomer = (_, response) => {
//   try {
//     fs.readFile(filePath, (error, data) => {
//       if (error) throw error;
//       const existingData = JSON.parse(data);
//       response.status(200).json(existingData);
//     });
//   } catch (error) {
//     console.log(error);
//     response.status(401).json({
//       message: "Invalid User",
//       error,
//     });
//   }
// };

// export const postCustomer = (request, response) => {
//   const { body } = request;
//   // For read the file
//   fs.readFile(filePath, (error, data) => {
//     if (error) throw error;
//     const existingData = JSON.parse(data);
//     existingData.push(body);
//     // For write the file content
//     fs.writeFile(filePath, JSON.stringify(existingData), (error) => {
//       if (error) throw error;
//       response.status(200).json({ message: "Success" });
//     });
//   });
// };

export const findCustomer = async (_, response) => {
  try {
    const customerData = await Customer.find({});
    response.status(200).json(customerData);
  } catch (error) {
    response.status(500).json({ message: "Internal server error", error });
  }
};

export const postCustomer = async (request, response) => {
  try {
    const { name, info, tags, year } = request.body;
    const customer = new Customer({
      name,
      info,
      tags,
      year,
    });
    await customer.save();
    response.status(200).json({
      message: "Customer created",
      data: {
        _id: customer._id,
      },
    });
  } catch (error) {
    response.status(500).json({ message: "Internal server error", error });
  }
};

export const putCustomer = async (request, response) => {
  try {
    const { name, info, tags, year } = request.body;
    const { customerId } = request.params;
    const customer = await Customer.findByIdAndUpdate(customerId, {
      name,
      info,
      tags,
      year,
    });
    if (!customer) {
      return response.status(500).json({ message: "Invalid Customer" });
    }
    response.status(200).json({ message: "Updated", _id: customer._id });
  } catch (error) {
    response.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteCustomer = async (request, response) => {
  try {
    const { customerId } = request.params;
    const customer = await Customer.findByIdAndDelete(customerId);
    response.status(200).json({ message: "Deleted", _id: customer._id });
  } catch (error) {
    response.status(500).json({ message: "Internal server error", error });
  }
};
