import { getTags } from "@/lib/actions/tag.actions";

const Tags = async () => {
  const { success, data, error } = await getTags({
    page: 1,
    pageSize: 10,
    // query: "java",
  });

  const { items } = data || {};

  console.log("TAGS", JSON.stringify(items, null, 2));

  return <div>Tags</div>;
};

export default Tags;
