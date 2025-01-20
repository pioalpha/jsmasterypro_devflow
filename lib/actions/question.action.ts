"use server";

import mongoose from "mongoose";

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import TagQuestion from "@/database/tag_question.model";
import {
  ActionResponse,
  ErrorResponse,
  Question as GlobalQuestion,
} from "@/types/global";

import action from "../handlers/action";
import handleError from "../handlers/error";
import logger from "../logger";
import { AskQuestionSchema } from "../validations";

export async function createQuestion(
  params: CreateQuestionParams
): Promise<ActionResponse<GlobalQuestion>> {
  const validationResult = await action({
    params,
    schema: AskQuestionSchema,
    authorize: true,
  });
  logger.info("-4");

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  logger.info("-3");

  const { title, content, tags } = validationResult.params!;
  const userId = validationResult?.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    logger.info("-2");

    const [newQuestion] = await Question.create(
      [{ title, content, author: userId }],
      { session }
    );

    if (!newQuestion) {
      throw new Error("failed to create question");
    }

    const tagIds: mongoose.Types.ObjectId[] = [];
    const tagQuestionDocuments = [];

    logger.info("-1");
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $inc: { questions: 1 } },
        { upsert: true, new: true, session }
      );
      logger.info("1");

      tagIds.push(existingTag._id);
      logger.info("1.5");
      tagQuestionDocuments.push({
        tag: existingTag._id,
        question: newQuestion._id,
      });
      logger.info("2");
    }

    await TagQuestion.insertMany(tagQuestionDocuments, { session });
    logger.info("3");

    await Question.findByIdAndUpdate(
      newQuestion._id,
      { $push: { tags: { $each: tagIds } } },
      { session }
    );
    logger.info("4");

    await session.commitTransaction();

    return { success: true, data: JSON.parse(JSON.stringify(newQuestion)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}
