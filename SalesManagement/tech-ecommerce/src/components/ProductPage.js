import React, { useState, useEffect } from 'react';
import './ProductPage.css'; // CSS for styling
import { FaShoppingCart } from 'react-icons/fa'; // Add shopping cart icon
import axios from 'axios'; // Import axios for API requests
import Navbar from './NavBar';

const ProductPage = () => {
  const [superCategories, setSuperCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSuperCategory, setSelectedSuperCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [showReviews, setShowReviews] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [reviews, setReviews] = useState([]); // To store fetched reviews
  const [averageRating, setAverageRating] = useState(null); // To store average rating

  const [showAddReview, setShowAddReview] = useState(false); // Show Add Review form
  const [rating, setRating] = useState(1); // Default rating
  const [reviewText, setReviewText] = useState(''); // Default review text

  // Retrieve customerId from sessionStorage
  useEffect(() => {
    const customerId = sessionStorage.getItem('customerId');
    console.log('Retrieved customerId from sessionStorage:', customerId);
  }, []);

  // Fetch all Super Categories
  useEffect(() => {
    const fetchSuperCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products/supercategories'); // Adjust to your endpoint
        setSuperCategories(response.data);
        if (response.data.length > 0) {
          setSelectedSuperCategory(response.data[0].Super_Category); // Set default to first super category
        }
      } catch (error) {
        console.error('Error fetching super categories:', error);
      }
    };

    fetchSuperCategories();
  }, []);

  // Fetch Subcategories when Super Category is selected
  useEffect(() => {
    const fetchSubCategories = async () => {
      if (selectedSuperCategory) {
        try {
          const response = await axios.post('http://localhost:3000/products/subcategories', { superCategory: selectedSuperCategory });
          setSubCategories(response.data);
          if (response.data.length > 0) {
            setSelectedSubCategory(response.data[0].Category_Name); // Set default to first subcategory
          }
        } catch (error) {
          console.error('Error fetching sub categories:', error);
        }
      }
    };

    fetchSubCategories();
  }, [selectedSuperCategory]);

  // Fetch Products when Sub Category is selected
  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedSubCategory) {
        try {
          const response = await axios.post('http://localhost:3000/products/items', { categoryName: selectedSubCategory });
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }
    };

    fetchProducts();
  }, [selectedSubCategory]);

  const addToCart = async (productId) => {
    const customerId = sessionStorage.getItem('customerId'); // Retrieve customerId from sessionStorage
    console.log(`Adding product with id ${productId} to cart for customerId: ${customerId}`);
    try {
      const response = await axios.post('http://localhost:3000/api/cart', {
        productId,
        customerId,
        quantity: 1, // Default quantity to add
      });
      console.log('Product added to cart:', response.data);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleShowReviews = async (product) => {
    try {
      const response = await axios.post('http://localhost:3000/products/reviews', { productId: product.Product_ID });
      if (response.data.reviews.length === 0) {
        // If no reviews found, set reviews to an empty array
        setReviews([]);
        setAverageRating(null);
      } else {
        setReviews(response.data.reviews);
        setAverageRating(response.data.averageRating);
      }
      setCurrentProduct(product);
      setShowReviews(true);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleCloseReviews = () => {
    setShowReviews(false); // Close the reviews modal
    setCurrentProduct(null); // Reset current product
    setReviews([]); // Clear reviews
    setAverageRating(null); // Clear average rating
  };

  // Function to submit a review
  const handleAddReview = async () => {
    const customerId = sessionStorage.getItem('customerId');
    if (!customerId) {
      console.error('No customerId found in sessionStorage');
      return;
    }
      // Logging to check the values before sending them to the backend
  console.log('Submitting review with:', {
    customerId,
    productId: currentProduct.Product_ID,
    rating, // This should not be undefined
    reviewText
  });

    try {
      const response = await axios.post('http://localhost:3000/api/addreview', {
        customerId,
        productId: currentProduct.Product_ID,
        reviewRating : rating,
        reviewText
      });

      console.log('Review submitted:', response.data);
      setShowAddReview(false); // Close review form after submission
      setRating(1); // Reset rating
      setReviewText(''); // Reset review text
      // Optionally, fetch updated reviews after submission
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="product-page">
      <Navbar />
      <h1>Products</h1>
      {/* Super Categories */}
      <div className="super-categories">
        {superCategories.map(superCategory => (
          <button
            key={superCategory.Super_Category}
            className={selectedSuperCategory === superCategory.Super_Category ? 'active' : ''}
            onClick={() => {
              setSelectedSuperCategory(superCategory.Super_Category);
              setSelectedSubCategory(''); // Reset subcategory on supercategory change
              setProducts([]); // Clear products when changing supercategory
            }}
          >
            {superCategory.Super_Category}
          </button>
        ))}
      </div>

      {/* Subcategories */}
      <div className="sub-categories">
        {subCategories.map(subCategory => (
          <button
            key={subCategory.Category_ID}
            className={selectedSubCategory === subCategory.Category_Name ? 'active' : ''}
            onClick={() => setSelectedSubCategory(subCategory.Category_Name)}
          >
            {subCategory.Category_Name}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product.Product_ID}>
            <img src={product.image} alt={product.Product_Name} />
            <h3>{product.Product_Name}</h3>
            <p>{product.Price}</p>
            <div className="button-container">
              <button className="add-to-cart" title="Add to Cart" onClick={() => addToCart(product.Product_ID)}>
                <FaShoppingCart /> {/* Using react-icons shopping cart icon */}
              </button>
              <button className="reviews-button" onClick={() => handleShowReviews(product)}>
                Reviews
              </button>
              <button className="add-review-button" onClick={() => {
                setCurrentProduct(product);
                setShowAddReview(true);
              }}>
                Add Review
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reviews Modal */}
      {showReviews && currentProduct && (
        <div className="reviews-modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseReviews}>&times;</span>
            <h2>Reviews for {currentProduct.Product_Name}</h2>
            <p>Average Rating: {averageRating ? averageRating.toFixed(1) : 'No ratings available'}</p>
            <ul>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <li key={index}>
                    <p><strong>Rating:</strong> {review.Rating}/5</p>
                    <p><strong>Review:</strong> {review.ReviewText}</p>
                  </li>
                ))
              ) : (
                <p>No reviews available for this product.</p> // Message for no reviews
              )}
            </ul>
          </div>
        </div>
      )}

{showAddReview && currentProduct && (
  <div className="add-review-modal">
    <div className="modal-content">
      <h2>Add Review for {currentProduct.Product_Name}</h2>
      
      <label>Rating:</label>
      <div className="rating-buttons">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            className={`rating-button ${rating === num ? 'selected' : ''}`}
            onClick={() => setRating(num)} // Set the selected rating
          >
            {num}
          </button>
        ))}
      </div>

      <label>Review:</label>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)} // Capture review text
      />
      <button onClick={handleAddReview}>Submit Review</button>
      <button onClick={() => setShowAddReview(false)}>Cancel</button>
    </div>
  </div>
)}
    </div>
  );
};

export default ProductPage;

