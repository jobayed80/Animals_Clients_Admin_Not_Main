import React, { useState, useEffect } from 'react'
import { AiFillHeart, AiFillEye, AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import './shop.css'
import Homeproduct from './home_product';

import {
    AppBar,
    Toolbar,
    TextField,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton
} from "@mui/material";
import { styled } from "@mui/system";
import { FiShoppingCart, FiSearch } from "react-icons/fi";

const StyledCard = styled(Card)(({ theme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s",
    "&:hover": {
        transform: "scale(1.02)"
    }
}));


const Shop = ({ shop, Filter, allcatefilter, addtocart }) => {

    const [productsAll, setProductsAll] = useState([]);
    //Tranding Product
    const [trendingProduct, setTrendingProduct] = useState(Homeproduct)
    const [currentStartIndex, setCurrentStartIndex] = useState(0); // To track the start index of visible products
    const itemsPerPage = 8; // Number of products to show per page
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    // Combine 'productsAll' and 'trendingProduct' arrays
const combinedProducts = [...trendingProduct, ...productsAll];

// Filter combined products based on the search term
const filteredProducts = combinedProducts.filter((product) =>
  product.Name.toLowerCase().includes(searchTerm.toLowerCase())
);

    // Determine the products to display based on the currentStartIndex
    const visibleProducts = filteredProducts.slice(
        currentStartIndex,
        currentStartIndex + itemsPerPage
    );

    // Handlers for pagination
    const handleNext = () => {
        if (currentStartIndex + itemsPerPage < filteredProducts.length) {
            setCurrentStartIndex(currentStartIndex + itemsPerPage);
        }
    };

    const handlePrevious = () => {
        if (currentStartIndex - itemsPerPage >= 0) {
            setCurrentStartIndex(currentStartIndex - itemsPerPage);
        }
    };




    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setIsDetailsOpen(true);
    };

    const handleCloseDetails = () => {
        setIsDetailsOpen(false);
    };

    const ProductCard = ({ product }) => (
        <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col">
            <img
                className="h-32 w-full object-contain rounded-t-lg"
                src={product.image}
                alt={product.name}
            />
            <div className="flex-grow mt-4">
                <h2 className="text-lg font-bold mb-2">{product.Name}</h2>
                <p className="text-primary text-xl font-semibold">${product.price}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
                <button
                    className="bg-blue-500 text-white py-2 rounded-md flex items-center justify-center hover:bg-blue-600 transition-colors"
                    onClick={() => addtocart(product)}
                >
                    <FiShoppingCart className="mr-2" />
                    Add to Cart
                </button>
                <button
                    className="border border-blue-500 text-blue-500 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors"
                    onClick={() => handleViewDetails(product)}
                >
                    View Details
                </button>
            </div>
        </div>
    );



    
    // Fetch all products from the server
    useEffect(() => {
        const fetchProductsAll = async () => {
            try {
                const response = await axios.get('http://localhost:8082/productsDis');
                setProductsAll(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProductsAll();
    }, []);









    return (

        <>
            <div>

                <Toolbar>
                    <Container maxWidth="lg">
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={12} md={6}>


                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>


                <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>

                    <TextField
                        className='mb-10'
                        fullWidth
                        variant="outlined"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: (
                                <IconButton edge="start">
                                    <FiSearch />
                                </IconButton>
                            ),
                            sx: { backgroundColor: "white", borderRadius: 1 }
                        }}
                    />


                    <Grid container spacing={4}>
                        {visibleProducts.map((product) => (
                            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>

                    <div className="flex justify-between mt-6">
                    <button
                        className={`px-4 py-2 rounded-md ${currentStartIndex === 0
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                        onClick={handlePrevious}
                        disabled={currentStartIndex === 0}
                    >
                        Previous
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md ${currentStartIndex + itemsPerPage >= filteredProducts.length
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                        onClick={handleNext}
                        disabled={currentStartIndex + itemsPerPage >= filteredProducts.length}
                    >
                        See More
                    </button>
                </div>
                </Container>

                

                <Dialog open={isDetailsOpen} onClose={handleCloseDetails} maxWidth="md" fullWidth>
                    {selectedProduct && (
                        <>
                            <DialogTitle>{selectedProduct.name}</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image={selectedProduct.image}
                                            alt={selectedProduct.name}
                                            sx={{ objectFit: "cover", borderRadius: 1 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="h4" gutterBottom>
                                            ${selectedProduct.price}
                                        </Typography>
                                        <Typography variant="body1" paragraph>
                                            {selectedProduct.description}
                                        </Typography>
                                        <Typography variant="h6" gutterBottom>
                                            Specifications:
                                        </Typography>
                                        {/* <ul>
                    {selectedProduct.specs.map((spec, index) => (
                      <Typography key={index} component="li">
                        {spec}
                      </Typography>
                    ))}
                  </ul> */}
                                        <Button
                                            variant="contained"
                                            size="large"
                                            startIcon={<FiShoppingCart />}
                                            sx={{ mt: 2 }}
                                            onClick={() => addtocart(selectedProduct)}

                                        >
                                            Add to Cart
                                        </Button>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDetails}>Close</Button>
                            </DialogActions>
                        </>
                    )}
                </Dialog>
            </div>
        </>
    )
}

export default Shop