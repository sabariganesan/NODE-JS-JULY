import { MongoClient, ObjectId } from "mongodb";
import CONST from "../constant/meta.js";

// export const getSampleUser = async (_, response) => {
//   const cluster = await MongoClient.connect(process.env.MONGO_URL);
//   const database = cluster.db("sample_mflix");
//   const collection = database.collection("users");
//   const user = await collection.find({}).toArray();
//   response.status(200).json(user);
// };

export const createVendor = (request, response) => {
  const { body } = request;
  MongoClient.connect(process.env.MONGO_URL)
    .then(async (cluster) => {
      const database = cluster.db(CONST.DATABASE);
      const collections = await (
        await database.listCollections().toArray()
      ).map(({ name }) => name);
      let collection;
      if (!collections.includes(CONST.COLLECTIONS.VENDOR)) {
        collection = await database.createCollection(CONST.COLLECTIONS.VENDOR);
      } else {
        collection = database.collection(CONST.COLLECTIONS.VENDOR);
      }
      collection
        .insertOne(body)
        .then(() => {
          response.status(200).json({ message: "Vendor created successfully" });
        })
        .catch((error) => {
          response.status(500).json({ message: "DB connection failed", error });
        })
        .finally(() => {
          cluster.close();
        });
    })
    .catch((error) => {
      response.status(500).json({ message: "DB connection failed", error });
    });
};

export const findVendor = (_, response) => {
  MongoClient.connect(process.env.MONGO_URL)
    .then(async (cluster) => {
      const database = cluster.db(CONST.DATABASE);
      const collection = database.collection(CONST.COLLECTIONS.VENDOR);
      collection
        .find({}, { projection: { phoneNumber: 0 } })
        .toArray()
        .then((dbData) => {
          response
            .status(200)
            .json({ message: "Vendor created successfully", data: dbData });
        })
        .catch((error) => {
          response.status(500).json({ message: "DB connection failed", error });
        })
        .finally(() => {
          cluster.close();
        });
    })
    .catch((error) => {
      response.status(500).json({ message: "DB connection failed", error });
    });
};

export const updateVendor = (request, response) => {
  const { params, body } = request;
  const { userId } = params;
  MongoClient.connect(process.env.MONGO_URL)
    .then((cluster) => {
      const database = cluster.db(CONST.DATABASE);
      const collection = database.collection(CONST.COLLECTIONS.VENDOR);
      collection
        .findOneAndUpdate(
          {
            _id: new ObjectId(userId),
          },
          {
            $set: body,
          }
        )
        .then(() => {
          response.status(200).json({ message: "Vendor updated successfully" });
        })
        .catch((error) => {
          response.status(500).json({ message: "DB connection failed", error });
        })
        .finally(() => {
          cluster.close();
        });
    })
    .catch((error) => {
      response.status(500).json({ message: "DB connection failed", error });
    });
};
