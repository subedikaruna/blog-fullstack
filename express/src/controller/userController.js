import { hashPassword } from "../../hashing.js";
import { sendEmail } from "../../sendMail.js";
import jwt from "jsonwebtoken";
import { User } from "../schema/model.js";
import { secretkey } from "../../config.js";
import bcrypt from "bcryptjs";

export let createUserController = async (req, res, next) => {
  try {
    let data = req.body;

    // Hash the password before saving
    data = {
      ...data,
      password: hashPassword, // Correctly hash the password
      isVerifiedEmail: false,
    };

    let result = await User.create(data);

    let infoObj = {
      _id: result._id,
    };

    let expiryInfo = {
      expiresIn: "365d",
    };

    let token = await jwt.sign(infoObj, secretkey, expiryInfo);

    await sendEmail({
      from: "Karuna<karyanna7@gmail.com>",
      to: [req.body.email],
      subject: "Registration",
      html: `
        <h1> Your account has been created successfully </h1>

        <a href="http://localhost:3000/verify-email?token=${token}">
        http://localhost:3000/verify-email?token=${token}
        </a>
        `,
    });
    res.status(201).json({
      success: true,
      message: "WebUser created successfully.",
      result: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
export const verifyEmail = async (req, res, next) => {
  try {
    let tokenString = req.headers.authorization;
    let tokenArray = tokenString.split(" ");
    let token = tokenArray[1];
    console.log(token);

    let infoObj = await jwt.verify(token, secretkey);
    let userId = infoObj._id;
    let result = await User.findByIdAndUpdate(
      userId,
      {
        isVerifiedEmail: true,
      },
      {
        new: true,
      }
    );
    res.status(201).json({
      success: true,
      message: "user verified  successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    let user = await User.findOne({ email: email });

    if (user) {
      if (user.isVerifiedEmail) {
        let isValidpassword = await bcrypt.compare(password, user.password);
        if (isValidpassword) {
          let infoObj = {
            _id: user._id,
          };

          let expiryInfo = {
            expiresIn: "365d",
          };
          let token = await jwt.sign(infoObj, secretkey, expiryInfo);
          res.status(200).json({
            success: true,
            message: "user login successful.",
            data: user,
            token: token,
          });
        } else {
          let error = new Error("credential does not match");
          throw error;
        }
      } else {
        let error = new Error("email not verified");
        throw error;
      }
    } else {
      let error = new Error("credential does not match");
      throw error;
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res, next) => {
  try {
    let _id = req._id;
    console.log(_id);
    let result = await User.findById(_id);
    console.log(_id);
    res.status(200).json({
      success: true,
      message: "user read successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let _id = req._id;
    let data = req.body;
    delete data.email;
    delete data.password;
    let result = await User.findByIdAndUpdate(_id, data, { new: true });

    res.json({
      message: "updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const updatePassword = async (req, res, next) => {
  try {
    let _id = req._id;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    // Find the user by ID
    let data = await User.findById(_id);

    // Get the hashed password from the database
    let hashPassword = data.password;

    // Compare the old password with the hashed password in the database
    let isValidPassword = await bcrypt.compare(oldPassword, hashPassword);

    // Declare the new hashed password variable outside the if block
    let newHashPassword;

    if (isValidPassword) {
      // If old password matches, hash the new password
      newHashPassword = await bcrypt.hash(newPassword, 10);
    } else {
      // If the old password does not match, throw an error
      let error = new Error("credential does not match");
      throw error;
    }

    // Update the user's password with the new hashed password
    let result = await User.findByIdAndUpdate(
      _id,
      { password: newHashPassword },
      { new: true }
    );

    // Respond with success
    res.status(200).json({
      success: true,
      message: "password updated successfully",
      data: result,
    });
  } catch (error) {
    // If an error occurs, respond with the error message
    res.status(400).json({
      success: false,
      message: "update password failed: " + error.message,
    });
  }
};
export const forgotPassword = async (req, res, next) => {
  try {
    let email = req.body.email;
    let result = await User.findOne({ email: email });
    let infoObj = {
      _id: result._id,
    };
    let expiryInfo = {
      expiresIn: "365d",
    };
    let token = await jwt.sign(infoObj, secretkey, expiryInfo);
    await sendEmail({
      from: "Karuna<karyanna7@gmail.com>",
      to: email,
      subject: "Reset your password",
      html: `
      <h1> click here to reset your password </h1>

      <a href="http://localhost:3000/reset-password?token=${token}">
      http://localhost:3000/reset-password?token=${token}
      </a>
      `,
    });

    if (result) {
    } else {
      res.status(404).json({
        success: false,
        message: "email not found" + error.message,
      });
    }
    res.json({
      success: true,
      message: "link has been sent to mail to reset password",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "forgot password failed: " + error.message,
    });
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    let _id = req._id;
    let password = req.body.password;
    let hashPassword = await bcrypt.hash(password, 10);
    let result = await User.findByIdAndUpdate(
      _id,
      {
        password: hashPassword,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "passsword has been reset",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: " password reset failed: " + error.message,
    });
  }
};
