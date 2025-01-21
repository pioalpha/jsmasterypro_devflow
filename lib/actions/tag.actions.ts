"use server";

import { FilterQuery } from "mongoose";

import { Tag } from "@/database";
import {
  ActionResponse,
  ErrorResponse,
  PaginatedSearchParams,
  Tag as GlobalTag,
} from "@/types/global";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { PaginatedSearchParamsSchema } from "../validations";
import { getPaginatedData } from "./model.actions";

export const getTags = async (
  params: PaginatedSearchParams
): Promise<ActionResponse<{ tags: GlobalTag[]; isNext: boolean }>> => {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter } = params;
  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  const filterQuery: FilterQuery<typeof Tag> = {};

  if (query) {
    filterQuery.$or = [{ name: { $regex: query, $options: "i" } }];
  }

  let sortCriteria = {};

  switch (filter) {
    case "popular":
      sortCriteria = { questions: -1 };
      break;
    case "recent":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "name":
      sortCriteria = { name: 1 };
      break;
    default:
      sortCriteria = { questions: -1 };
      break;
  }

  try {
    const totalTags = await Tag.countDocuments(filterQuery);
    const tags = await Tag.find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);
    const isNext = totalTags > skip + tags.length;

    return {
      success: true,
      data: { tags: JSON.parse(JSON.stringify(tags)), isNext },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const getTags2 = async (params: PaginatedSearchParams) =>
  getPaginatedData(Tag, params, {
    queryFields: ["name"],
    sortMapping: {
      popular: { questions: -1 },
      recent: { createdAt: -1 },
      oldest: { createdAt: 1 },
      name: { name: 1 },
    },
    defaultSort: { questions: -1 },
    dataKey: "tags",
  });
