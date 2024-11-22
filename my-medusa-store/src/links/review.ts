import ReviewModule from "../modules/review";
import ProductModule from "@medusajs/medusa/product";
import { defineLink } from "@medusajs/framework/utils";

export default defineLink(
  {
    linkable: ReviewModule.linkable.review,
    isList: true,
  },
  ProductModule.linkable.product
);
