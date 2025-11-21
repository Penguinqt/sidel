import "../Style/Reviews.css";

export default function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      text: "We don't just make your life better, we improve your overall experience. From a mobile app that streamlines onboarding and requesting time off, to a modern experience that lets employees sign up for benefits online.",
      name: "ASHLEY LANDAZO",
      role: "CEO & Co-Founder, EQ3",
      rating: 4,
    },
    {
      id: 2,
      text: "We don't just make your life better, we improve your overall experience. From a mobile app that streamlines onboarding and requesting time off, to a modern experience that lets employees sign up for benefits online.",
      name: "ASHLEY LANDAZO",
      role: "CEO & Co-Founder, EQ3",
      rating: 4,
    },
    {
      id: 3,
      text: "We don't just make your life better, we improve your overall experience. From a mobile app that streamlines onboarding and requesting time off, to a modern experience that lets employees sign up for benefits online.",
      name: "ASHLEY LANDAZO",
      role: "CEO & Co-Founder, EQ3",
      rating: 3,
    },
  ];

  return (
    <div className="reviews-container">
      <div className="carousel-wrapper">
        <div className="carousel-container">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <p className="review-text">{review.text}</p>
              
              <div className="reviewer-section">
                <div className="avatar"></div>
                <div className="reviewer-info">
                  <div className="reviewer-name">{review.name}</div>
                  <div className="reviewer-role">{review.role}</div>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className="star"
                        style={{opacity: i < review.rating ? 1 : 0.3}}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="dots-container">
          {reviews.map((_, i) => (
            <div 
              key={i} 
              className={`dot ${i === 0 ? 'active-dot' : ''}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}