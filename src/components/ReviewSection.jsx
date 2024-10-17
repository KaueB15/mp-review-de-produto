import "./ReviewSection.css";
import api from "../services/api"
import GreenStar from "../assets/green-star.svg";
import GrayStar from "../assets/gray-star.svg"
import { useEffect, useState } from "react";

export default function ReviewSection() {

  const [ reviews, setReviews ] = useState([])

  const getAllReviews = async () => {
    await api.get("/reviews").then((response) => setReviews(response.data.data))
  }

  const dateFormat = (date) => {

    const options = {year:"numeric", month:"long", day:"numeric"}
    const dateReview = new Date(date).toLocaleDateString('pt-BR', options)
    return dateReview
  }

  useEffect(() => {
    getAllReviews()
  }, [])  

  return (
    <section className="reviews">
      <h3>O que nossos clientes dizem</h3>

      {reviews && reviews.map((review) => (
        <div class="review" key={review.id}>
          <h4>{review.name}</h4>
          <span>{dateFormat(review.created_at)}</span>
          <div className="rating">
            {Array(review.stars).fill(0).map((star) => (
              <img src={GreenStar} alt="Green Star" key={star} />          
            ))}
            {Array(5 - review.stars).fill(0).map((star) => (
              <img src={GrayStar} alt="Green Star" key={star} />
            ))}
          </div>
          <p>{review.description}</p>
          <div id="line"></div>
        </div>
      ))}
    </section>
  );
}
