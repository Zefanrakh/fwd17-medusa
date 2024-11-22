import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { REVIEW_MODULE } from "src/modules/review";

type LinkProductToBrandStepInput = {
  productId: string;
  reviewId: string;
};

export const linkProductToBrandStep = createStep(
  "link-product-to-brand",
  async (
    { productId, reviewId }: LinkProductToBrandStepInput,
    { container }
  ) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);

    remoteLink.create({
      [REVIEW_MODULE]: {
        review_id: reviewId,
      },
      [Modules.PRODUCT]: {
        product_id: productId,
      },
    });

    return new StepResponse(undefined, {
      productId,
      reviewId,
    });
  }
);
