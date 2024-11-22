import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { DetailWidgetProps, AdminProduct } from "@medusajs/framework/types";
import { useEffect, useState } from "react";
import { Container, Heading } from "@medusajs/ui";

const ProductReviewWidget = ({ data }: DetailWidgetProps<AdminProduct>) => {
  const [reviews, setReview] = useState<Record<string, string>[] | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      return;
    }

    fetch(`/admin/products/${data.id}/reviews`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ reviews }) => {
        setReview(reviews);
        setLoading(false);
      });
  }, [loading]);

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Reviews</Heading>
      </div>
      {loading && <span>Loading...</span>}
      {reviews && reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="review-item">
            <div className="ml-6 my-4">- {review.subject}</div>
          </div>
        ))
      ) : (
        <span>No reviews available</span>
      )}
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: "product.details.before",
});

export default ProductReviewWidget;
