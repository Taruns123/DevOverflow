"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByIdParams,
  UpdateUserParams,
  GetUserLoginParams,
  GetUserByTokenParams,
  GetAllUsersParams,
  ToggleSaveQuestionParams,
  GetSavedQuestionsParams,
} from "./shared.type";
import Question from "@/database/question.model";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Tag from "@/database/tag.model";

export async function getUserByEmailId(params: GetUserByIdParams) {
  try {
    connectToDatabase();
    const { email } = params;
    const user = await User.findOne({
      email,
    });
    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserByToken(params: GetUserByTokenParams) {
  try {
    connectToDatabase();
    const { token } = params;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decoded;
  } catch (error) {
    console.error(error);
  }
}

export async function userLogin(params: GetUserLoginParams) {
  try {
    connectToDatabase();
    const { email, password } = params;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found", user: null });
    }
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: "Incorrect password", user: null });
    }
    console.log("Login successful", user);
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    return JSON.parse(JSON.stringify({ user, token }));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", user: null });
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();
    userData.password = await bcryptjs.hash(userData.password, 10);
    const newUser = await User.create(userData);
    console.log("newUser", newUser);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error(error);
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { email, updateData, path } = params;
    await User.findOneAndUpdate({ email }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}
export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();
    const { email } = params;

    const user = await User.findOneAndDelete({ email });

    if (!user) {
      throw new Error("User not found");
    }

    // Delete user from database
    // and questions, answers, comments, etc.

    // get user question ids
    // const userQuestionIds = await Question.find({
    //   author: user._id,
    // }).distinct("_id");

    // Delete user questions
    await Question.deleteMany({ author: user._id });

    // Delete user answers

    const deletedUser = await User.findOneAndDelete({ email });

    return NextResponse.json({ message: "OK", user: deletedUser });
  } catch (error) {
    console.error(error);
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();
    // const {page = 1, pageSize = 20, filter, searchQuery} = params;

    const users = await User.find({}).sort({ createdAt: -1 });
    return { users };
  } catch (error) {
    console.error(error);
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();
    const { userId, questionId, path } = params;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const isQuestionSaved = user.saved.includes(questionId);
    console.log("saved question");
    if (isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase();
    const { email, page = 1, pageSize = 10, filter, searchQuery } = params;
    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};
    const user = await User.findOne({ email }).populate({
      path: "saved",
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id email name picture" },
      ],
    });

    if (!user) {
      throw new Error("User not found");
    }

    const savedQuestions = user.saved;

    return { questions: savedQuestions };
  } catch (error) {
    console.error(error);
  }
}
