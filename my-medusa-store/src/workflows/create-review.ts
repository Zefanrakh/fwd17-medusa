import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { REVIEW_MODULE } from "src/modules/review";
import { ReviewModuleService } from "src/modules/review/service";

export type CreateReviewInput = {
  subject: string;
  product_id: string;
};

const createReviewStep = createStep(
  "create-review-test",
  async ({ subject, product_id }: CreateReviewInput, { container }) => {
    const reviewModuleService: ReviewModuleService =
      container.resolve(REVIEW_MODULE);
    const productModuleService = container.resolve(Modules.PRODUCT);

    const review = await reviewModuleService.createReviews({
      subject,
      product_id,
    });

    const product = await productModuleService.retrieveProduct(product_id);
    if (!product) {
      throw new Error("Product not found");
    }

    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);
    const links = [];

    console.log();

    // link reviews to product
    links.push({
      [REVIEW_MODULE]: {
        review_id: review.id,
      },
      [Modules.PRODUCT]: {
        product_id: product.id,
      },
    });

    const a = await remoteLink.create(links);
    console.log({ a });

    return new StepResponse(review, review);
  },
  async (post, { container }) => {
    const reviewModuleService: ReviewModuleService =
      container.resolve(REVIEW_MODULE);

    await reviewModuleService.deleteReviews(post.id);
  }
);

export const createReviewWorkflow = createWorkflow(
  "create-review-test",
  (postInput: CreateReviewInput) => {
    const post = createReviewStep(postInput);

    return new WorkflowResponse(post);
  }
);
