import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

import {
  CreateReviewInput,
  createReviewWorkflow,
} from "src/workflows/create-review";

export async function POST(
  req: MedusaRequest<CreateReviewInput>,
  res: MedusaResponse
) {
  const { product_id } = req.params;
  const { subject } = req.body;
  const { result: post } = await createReviewWorkflow(req.scope).run({
    input: {
      subject,
      product_id,
    },
  });

  res.json({
    post,
  });
}
