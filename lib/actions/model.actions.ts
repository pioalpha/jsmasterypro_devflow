import { Model, FilterQuery } from "mongoose";

import {
  ActionResponse,
  ErrorResponse,
  PaginatedSearchParams,
} from "@/types/global";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { PaginatedSearchParamsSchema } from "../validations";

type PopulateField<T> = { field: keyof T; select?: string };

export async function getPaginatedData<T>(
  model: Model<T>,
  params: PaginatedSearchParams,
  options: {
    queryFields?: (keyof T)[];
    sortMapping?: Record<string, any>;
    extraFilter?: (filter: string | undefined) => FilterQuery<T>;
    populateFields?: PopulateField<T>[];
    defaultSort?: any;
    dataKey: string; // Nome da chave no retorno ("tags", "questions", etc.)
  }
): Promise<ActionResponse<{ items: T[]; isNext: boolean }>> {
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

  const filterQuery: FilterQuery<T> = options.extraFilter
    ? options.extraFilter(filter)
    : {};

  if (query && options.queryFields?.length) {
    filterQuery.$or = options.queryFields.map((field) => ({
      [field as keyof T]: { $regex: query, $options: "i" },
    })) as FilterQuery<T>[];
  }

  const sortCriteria =
    options.sortMapping && filter && filter in options.sortMapping
      ? options.sortMapping[filter!]
      : options.defaultSort || {};

  try {
    const totalItems = await model.countDocuments(filterQuery);
    const queryBuilder = model
      .find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    if (options.populateFields) {
      for (const { field, select } of options.populateFields) {
        queryBuilder.populate(field as string, select);
      }
    }

    const items = await queryBuilder.lean();
    const isNext = totalItems > skip + items.length;

    return {
      success: true,
      data: { items: JSON.parse(JSON.stringify(items)), isNext },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getPaginatedData2<T>(
  model: Model<T>,
  params: PaginatedSearchParams,
  sortOptions: Record<string, any>,
  customFilterQuery?: (
    filter: string,
    query: string | undefined,
    baseQuery: FilterQuery<T>
  ) => void
): Promise<ActionResponse<{ items: T[]; isNext: boolean }>> {
  const { page = 1, pageSize = 10, query, filter } = params;
  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  const filterQuery: FilterQuery<T> = {};

  if (customFilterQuery) {
    customFilterQuery(filter, query, filterQuery);
  } else if (query) {
    filterQuery.$or = [{ name: { $regex: query, $options: "i" } }];
  }

  const sortCriteria = sortOptions[filter] || {};

  try {
    const totalItems = await model.countDocuments(filterQuery);

    const items = await model
      .find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit)
      .lean();
    const isNext = totalItems > skip + items.length;

    return {
      success: true,
      data: { items: JSON.parse(JSON.stringify(items)), isNext },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
