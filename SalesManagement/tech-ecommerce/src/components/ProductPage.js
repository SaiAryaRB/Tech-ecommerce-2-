import React, { useState, useEffect ,  useRef } from 'react';
import './ProductPage.css'; // CSS for styling
import { FaShoppingCart } from 'react-icons/fa'; // Add shopping cart icon
import axios from 'axios'; // Import axios for API requests
import Navbar from './NavBar';
import Slider from 'react-slick'; // Importing React Slick for the carousel
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Lottie from 'react-lottie'; // Import Lottie for animation
import ConsumerElectronicsAnimation from '../assets/ConsumerElectronicsAnimation.json'; 
import HomeElectronicsAnimation from '../assets/HomeElectronicsAnimation.json';  // Add more animation imports
import WearablesAnimation from '../assets/WearablesAnimation.json';
import TechAccesoriesAnimation from '../assets/TechAccesoriesAnimation.json';


const ProductPage = () => {
  const [superCategories, setSuperCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSuperCategory, setSelectedSuperCategory] = useState(null); // Set initial state to null
  const [selectedSubCategory, setSelectedSubCategory] = useState(null); // Set initial state to null
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product
  const [showReviews, setShowReviews] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [reviews, setReviews] = useState([]); // To store fetched reviews
  const [averageRating, setAverageRating] = useState(null); // To store average rating
  const [showAddReview, setShowAddReview] = useState(false); // Show Add Review form
  const [rating, setRating] = useState(1); // Default rating
  const [reviewText, setReviewText] = useState(''); // Default review text
  const [cartResponse, setCartResponse] = useState(null);
  const sliderRef = useRef(null);

  // Animation mappings based on supercategory
  const animationMapping = {
    "Consumer Electronics": ConsumerElectronicsAnimation,
    "Tech Accessories": TechAccesoriesAnimation,
    "Wearables": WearablesAnimation,
    "Home Electronics": HomeElectronicsAnimation,
    // Add more mappings for other supercategories
  };

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
          setSelectedSubCategory(null); // Reset subcategory when supercategory changes
          setProducts([]); // Clear products when changing supercategory
        } catch (error) {
          console.error('Error fetching sub categories:', error);
        }
      }
    };

    if (selectedSuperCategory) {
      fetchSubCategories();
    }
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, [selectedSuperCategory]); // Trigger when super category changes

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

    if (selectedSubCategory) {
      fetchProducts();
    }
  }, [selectedSubCategory]); // Trigger when subcategory changes

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
      setCartResponse(response.data); // Update state with response data for pop-up
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setCartResponse({ message: 'Failed to add product to cart. Please try again.' });
    }
  };

  const handleShowReviews = async (product) => {
    try {
      const response = await axios.post('http://localhost:3000/products/reviews', { productId: product.Product_ID });
      if (response.data.reviews.length === 0) {
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
    console.log('Submitting review with:', {
      customerId,
      productId: currentProduct.Product_ID,
      rating,
      reviewText
    });

    try {
      const response = await axios.post('http://localhost:3000/api/addreview', {
        customerId,
        productId: currentProduct.Product_ID,
        reviewRating: rating,
        reviewText
      });

      console.log('Review submitted:', response.data);
      setShowAddReview(false); // Close review form after submission
      setRating(1); // Reset rating
      setReviewText(''); // Reset review text
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Adjust for smaller screens
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480, // Adjust for even smaller screens
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="product-page">
    <Navbar/>
      {/* Super Categories */}
      <div className="super-categories">
  {superCategories.map(superCategory => (
    <div
      key={superCategory.Super_Category}
      className={`super-category-card ${selectedSuperCategory === superCategory.Super_Category ? 'active' : ''}`}
      onClick={() => {
        // If the same supercategory is clicked again, reset everything
        if (selectedSuperCategory === superCategory.Super_Category) {
          setSelectedSuperCategory(null);
          setSelectedSubCategory(null);
          setProducts([]); // Clear products when unselecting supercategory
        } else {
          setSelectedSuperCategory(superCategory.Super_Category);
          setSelectedSubCategory(null); // Reset subcategory when selecting new supercategory
          setProducts([]); // Clear products when changing supercategory
        }
      }}
    >
      <div className="animation-container">
        <Lottie 
          options={{
            loop: true,
            autoplay: true,
            animationData: animationMapping[superCategory.Super_Category],
            rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
          }}
          height="150px" 
          width="150px"
        />
      </div>
      <h3>{superCategory.Super_Category}</h3>
    </div>
  ))}
</div>


{selectedSuperCategory && (
  <div className="sub-categories-slider">
    <Slider ref={sliderRef} {...sliderSettings}>
      {subCategories.map(subCategory => (
        <div
          key={subCategory.Category_ID}
          className={`sub-category-card ${selectedSubCategory === subCategory.Category_Name ? 'active' : ''}`}
          onClick={() => {
            if (selectedSubCategory === subCategory.Category_Name) {
              setSelectedSubCategory(null);
              setProducts([]); // Clear products when unselecting subcategory
            } else {
              setSelectedSubCategory(subCategory.Category_Name);
            }
          }}
        >
          <h3>{subCategory.Category_Name}</h3>
        </div>
      ))}
    </Slider>
  </div>
)}


      {/* Products: Only show when a Sub Category is selected */}
      {selectedSubCategory && (
  <div className="product-grid">
    {products.length === 0 ? (
      <p>No products available in this subcategory.</p> // Message when no products
    ) : (
      products.map(product => (
        <div 
          className={`product-card ${selectedProduct === product.Product_ID ? 'active' : ''}`} 
          key={product.Product_ID}
          onClick={() => {
            if (selectedProduct === product.Product_ID) {
              setSelectedProduct(null); // Unselect product
            } else {
              setSelectedProduct(product.Product_ID); // Select product
            }
          }}
        >
          <img 
            src={product.image} 
            alt={product.Product_Name} 
            onClick={() => {
              alert('Image clicked: ' + product.Product_Name); // Or any other action
            }}
          />
          <h3>{product.Product_Name}</h3>
          <p>{`₹${parseFloat(product.Price).toFixed(2)}`}</p> {/* Dollar sign before price */}
          <div className="button-container">
            <button onClick={() => addToCart(product.Product_ID)}>
              <FaShoppingCart /> Add to Cart
            </button>
            <button onClick={() => handleShowReviews(product)}>
              View Reviews
            </button>
          </div>
        </div>
      ))
    )}
  </div>
)}

{/* Conditional Pop-Up */}
{cartResponse && (
  <div className="popup">
    <p>{cartResponse.message}</p>
    <button onClick={() => setCartResponse(null)}>Close</button>
  </div>
)}




{showReviews && currentProduct && (
  <div className="reviews-modal">
    <div className="modal-content">
      <h2>REVIEWS FOR {currentProduct.Product_Name}</h2>

      {averageRating && <p><strong>AVERAGE RATING:</strong> {averageRating.toFixed(2)}</p>}

      {/* Display Reviews */}
      <div className="reviews">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p><strong>RATING:</strong> {review.Rating} stars</p>
              <p><strong>REVIEW:</strong> {review.ReviewText}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to write one!</p>
        )}
      </div>

      {/* Close Button - Changed to "Close Review" */}
      <button onClick={handleCloseReviews} className="close-review">
        Close Review
      </button>

      {/* Add Review Button */}
      <button onClick={() => setShowAddReview(true)} className="add-review-btn">
        Add Review
      </button>

      {/* Add Review Form */}
      {showAddReview && (
        <div className="add-review-form">
          <h3>Write a Review</h3>

          {/* Rating scale from 1 to 5 */}
          <div className="rating-scale">
  {[1, 2, 3, 4, 5].map((star) => (
    <button
      key={star}
      onClick={() => setRating(rating === star ? null : star)} // Unselect if the same star is clicked again
      className={`rating-button ${rating === star ? 'selected' : ''}`}
    >
      {star}
    </button>
  ))}
</div>

          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
          />
          <button onClick={handleAddReview} className="submit-review-btn">Submit Review</button>
          <button onClick={() => setShowAddReview(false)} className="cancel-review-btn">Cancel</button>
        </div>
      )}
    </div>
  </div>
)}


    </div>
  );
};

export default ProductPage;
