import { model } from "@medusajs/framework/utils";

const Review = model.define("Review", {
  id: model.id().primaryKey(),
  subject: model.text(),
});

export default Review;
