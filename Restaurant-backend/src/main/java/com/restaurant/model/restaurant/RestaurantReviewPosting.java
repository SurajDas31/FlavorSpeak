package com.restaurant.model.restaurant;

public class RestaurantReviewPosting {
    private int restaurantId;

    private String reviewComment;

    private String rating;

    public int getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(int restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getReviewComment() {
        return reviewComment;
    }

    public void setReviewComment(String reviewComment) {
        this.reviewComment = reviewComment;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    @Override
    public String toString() {
        return "RestarantReviewPosting{" +
                "restaurantId=" + restaurantId +
                ", reviewComment='" + reviewComment + '\'' +
                ", rating='" + rating + '\'' +
                '}';
    }
}
