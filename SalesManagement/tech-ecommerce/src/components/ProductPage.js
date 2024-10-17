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

  const addToCart = (productId) => {
    console.log(`Added product with id ${productId} to cart`);
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

    </div>
  );
};

export default ProductPage;
