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
import { Image, Flex, Modal } from 'antd';

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




    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

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
    const filteredProducts = productsAll.filter((product) =>
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
                src={`data:${product.mime_type};base64,${product.image}`}
                alt={product.name}
            />
            <div className="flex-grow mt-4">
                <h2 className="text-lg font-bold mb-2">{product.Name}</h2>
                <p className="text-primary text-xl font-semibold">${product.price}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
                <button
                    className="bg-blue-500 text-white py-2 rounded-md flex items-center justify-center hover:bg-blue-600 transition-colors"
                    onClick={() =>  showModal(product)}
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

                <button onClick={showModal}>modal</button>




                {selectedProduct && (
                    <>
                        <Dialog open={isDetailsOpen} onClose={handleCloseDetails} maxWidth="md" fullWidth>
                            {/* <DialogTitle>{selectedProduct.name}</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            src={`data:${selectedProduct.mime_type};base64,${selectedProduct.image}`}
                                            // image={selectedProduct.image}
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
                            </DialogActions> */}

                            <section class="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
                                <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                                    <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                                        <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
                                            <img class="w-full dark:hidden" src={`data:${selectedProduct.mime_type};base64,${selectedProduct.image}`} alt="" />
                                        </div>

                                        <div class="mt-6 sm:mt-8 lg:mt-0">
                                            <h1
                                                class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
                                            >
                                                {selectedProduct.Name}
                                            </h1>

                                            <div class="flex mb-4 mt-8">
                                                <div class="mr-4">
                                                    <span class="font-bold text-gray-700 dark:text-gray-300">Scientific Name: </span>
                                                    <span class="text-rose-600 italic text-bold dark:text-gray-300">{selectedProduct.Scientific_Name}</span>
                                                </div>
                                                <div>
                                                    <span class="font-bold text-gray-700 dark:text-gray-300">Classification: </span>
                                                    <span class="text-gray-600 dark:text-gray-300 ">{selectedProduct.Classification}</span>
                                                </div>
                                            </div>

                                            <div class="flex mb-4">
                                                <div class="mr-4">
                                                    <span class="font-bold text-gray-700 dark:text-gray-300">Size: </span>
                                                    <span class="text-gray-600 dark:text-gray-300">{selectedProduct.Size}</span>
                                                </div>
                                                <div>
                                                    <span class="font-bold text-gray-700 dark:text-gray-300">Weight: </span>
                                                    <span class="text-gray-600 dark:text-gray-300 ">{selectedProduct.Weight}</span>
                                                </div>
                                            </div>

                                            <div class="flex mb-4">
                                                <div class="mr-4">
                                                    <span class="font-bold text-gray-700 dark:text-gray-300">Skin_Color: </span>
                                                    <span class="text-gray-600 dark:text-gray-300">{selectedProduct.Skin_Color}</span>
                                                </div>
                                                <div>
                                                    <span class="font-bold text-gray-700 dark:text-gray-300">Others_Info: </span>
                                                    <span class="text-gray-600 dark:text-gray-300 ">{selectedProduct.Others_Info}</span>
                                                </div>
                                            </div>


                                            <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
                                                <p
                                                    class="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
                                                >
                                                    ${selectedProduct.Price}
                                                </p>

                                                <div class="flex items-center gap-2 mt-2 sm:mt-0">
                                                    <div class="flex items-center gap-1">
                                                        <svg
                                                            class="w-4 h-4 text-yellow-300"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                                            />
                                                        </svg>
                                                        <svg
                                                            class="w-4 h-4 text-yellow-300"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                                            />
                                                        </svg>
                                                        <svg
                                                            class="w-4 h-4 text-yellow-300"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                                            />
                                                        </svg>
                                                        <svg
                                                            class="w-4 h-4 text-yellow-300"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                                            />
                                                        </svg>
                                                        <svg
                                                            class="w-4 h-4 text-yellow-300"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <p
                                                        class="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
                                                    >
                                                        (5.0)
                                                    </p>
                                                    <a
                                                        href="#"
                                                        class="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                                                    >
                                                        345 Reviews
                                                    </a>
                                                </div>
                                            </div>

                                            <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                                                <a
                                                    href="#"
                                                    title=""
                                                    class="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                                    role="button"
                                                >
                                                    <svg
                                                        class="w-5 h-5 -ms-2 me-2"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                                        />
                                                    </svg>
                                                    Add to favorites
                                                </a>

                                                <button
                                                    href="#"
                                                    title=""
                                                    class="text-white mt-4 sm:mt-0 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                                                    role="button"
                                                >
                                                    <svg
                                                        class="w-5 h-5 -ms-2 me-2"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                                                        />
                                                    </svg>

                                                    Add to cart
                                                </button>
                                            </div>

                                            <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                                            <p class="mb-6 text-gray-500 dark:text-gray-400">
                                                Animals are multicellular, eukaryotic organisms in the biological kingdom Animalia (/ˌænɪˈmeɪliə/). With few exceptions, animals consume organic material, breathe oxygen, have myocytes and are able to move, can reproduce sexually, and grow from a hollow sphere of cells, the blastula, during embryonic development.
                                            </p>


                                        </div>
                                    </div>
                                </div>
                            </section>




                            {/*  eta use kora hoice jokhn payment confirm korbne tokhn mOdal asbe */}
                            <Flex vertical gap="middle" align="flex-start">
                                {/* Basic */}

                                {/* <Modal

                        centered
                        open={openPayment}
                        onOk={() => setOpenPayment(false)}
                        onCancel={() => setOpenPayment(false)}
                        width={1000}
                      >
                        <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                          <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                            <div class="mx-auto max-w-5xl">
                              <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Payment</h2>

                              <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                                <form action="#" class="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
                                  <div class="mb-6 grid grid-cols-2 gap-4">
                                    <div class="col-span-2 sm:col-span-1">
                                      <label for="full_name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Full name (as displayed on card)* </label>
                                      <input type="text" id="full_name" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Bonnie Green" required />
                                    </div>

                                    <div class="col-span-2 sm:col-span-1">
                                      <label for="card-number-input" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Card number* </label>
                                      <input type="text" id="card-number-input" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="xxxx-xxxx-xxxx-xxxx" pattern="^4[0-9]{12}(?:[0-9]{3})?$" required />
                                    </div>

                                    <div>
                                      <label for="card-expiration-input" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Card expiration* </label>
                                      <div class="relative">
                                        <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                                          <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                              fill-rule="evenodd"
                                              d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                                              clip-rule="evenodd"
                                            />
                                          </svg>
                                        </div>
                                        <input datepicker datepicker-format="mm/yy" id="card-expiration-input" type="text" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="12/23" required />
                                      </div>
                                    </div>
                                    <div>
                                      <label for="cvv-input" class="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                                        CVV*
                                        <button data-tooltip-target="cvv-desc" data-tooltip-trigger="hover" class="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white">
                                          <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clip-rule="evenodd" />
                                          </svg>
                                        </button>
                                        <div id="cvv-desc" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                                          The last 3 digits on back of card
                                          <div class="tooltip-arrow" data-popper-arrow></div>
                                        </div>
                                      </label>
                                      <input type="number" id="cvv-input" aria-describedby="helper-text-explanation" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="•••" required />
                                    </div>
                                  </div>

                                  <button type="submit" class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Pay now</button>
                                </form>

                                <div class="mt-6 grow sm:mt-8 lg:mt-0">
                                  <div class="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                                    <div class="space-y-2">
                                      <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                        <dd class="text-base font-medium text-gray-900 dark:text-white">${selectedProduct.Price}</dd>
                                      </dl>

                                      <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                                        <dd class="text-base font-medium text-green-500">$16</dd>
                                      </dl>

                                      <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                                        <dd class="text-base font-medium text-gray-900 dark:text-white">${selectedProduct.Price - 200}</dd>
                                      </dl>

                                      <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                                        <dd class="text-base font-medium text-gray-900 dark:text-white">$20</dd>
                                      </dl>
                                    </div>

                                    <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                      <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                      <dd class="text-base font-bold text-gray-900 dark:text-white">${(selectedProduct.Price - 200) + 20}</dd>
                                    </dl>
                                  </div>

                                  <div class="mt-6 flex items-center justify-center gap-8">
                                    <img class="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="" />
                                    <img class="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg" alt="" />
                                    <img class="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="" />
                                    <img class="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt="" />
                                    <img class="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="" />
                                    <img class="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg" alt="" />
                                  </div>
                                </div>
                              </div>

                              <p class="mt-6 text-center text-gray-500 dark:text-gray-400 sm:mt-8 lg:text-left">
                                Payment processed by <a href="#" title="" class="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Paddle</a> for <a href="#" title="" class="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Flowbite LLC</a>
                                - United States Of America
                              </p>
                            </div>
                          </div>
                        </section>

                        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/datepicker.min.js"></script>
                      </Modal> */}

                            </Flex>


                        </Dialog>
                         
                        <Flex vertical gap="middle" align="flex-start">
                        <Modal
                           
                            open={open}
                            onOk={handleOk}
                            confirmLoading={confirmLoading}
                            onCancel={handleCancel}
                            width={1100}
                        >
                            <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                                <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                                    <div class="mx-auto max-w-5xl">
                                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Payment</h2>

                                        <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                                            <form action="#" class="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
                                                <div class="mb-6 grid grid-cols-2 gap-4">
                                                    <div class="col-span-2 sm:col-span-1">
                                                        <label for="full_name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Full name (as displayed on card)* </label>
                                                        <input type="text" id="full_name" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Bonnie Green" required />
                                                    </div>

                                                    <div class="col-span-2 sm:col-span-1">
                                                        <label for="card-number-input" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Card number* </label>
                                                        <input type="text" id="card-number-input" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="xxxx-xxxx-xxxx-xxxx" pattern="^4[0-9]{12}(?:[0-9]{3})?$" required />
                                                    </div>

                                                    <div>
                                                        <label for="card-expiration-input" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Card expiration* </label>
                                                        <div class="relative">
                                                            <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                                                                <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                                                                        clip-rule="evenodd"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <input datepicker datepicker-format="mm/yy" id="card-expiration-input" type="text" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="12/23" required />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label for="cvv-input" class="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                                                            CVV*
                                                            <button data-tooltip-target="cvv-desc" data-tooltip-trigger="hover" class="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white">
                                                                <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clip-rule="evenodd" />
                                                                </svg>
                                                            </button>
                                                            <div id="cvv-desc" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                                                                The last 3 digits on back of card
                                                                <div class="tooltip-arrow" data-popper-arrow></div>
                                                            </div>
                                                        </label>
                                                        <input type="number" id="cvv-input" aria-describedby="helper-text-explanation" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="•••" required />
                                                    </div>
                                                </div>

                                                <button type="submit" class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Pay now</button>
                                            </form>

                                            <div class="mt-6 grow sm:mt-8 lg:mt-0">
                                                <div class="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                                                    <div class="space-y-2">
                                                        <dl class="flex items-center justify-between gap-4">
                                                            <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                                            <dd class="text-base font-medium text-gray-900 dark:text-white">${selectedProduct.Price}</dd>
                                                        </dl>

                                                        <dl class="flex items-center justify-between gap-4">
                                                            <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                                                            <dd class="text-base font-medium text-green-500">$16</dd>
                                                        </dl>

                                                        <dl class="flex items-center justify-between gap-4">
                                                            <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                                                            <dd class="text-base font-medium text-gray-900 dark:text-white">${selectedProduct.Price - 200}</dd>
                                                        </dl>

                                                        <dl class="flex items-center justify-between gap-4">
                                                            <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                                                            <dd class="text-base font-medium text-gray-900 dark:text-white">$20</dd>
                                                        </dl>
                                                    </div>

                                                    <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                                        <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                                        <dd class="text-base font-bold text-gray-900 dark:text-white">${(selectedProduct.Price - 200) + 20}</dd>
                                                    </dl>
                                                </div>

                                                <div class="mt-6 flex items-center justify-center gap-8">
                                                    <img class="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="" />
                                                    <img class="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg" alt="" />
                                                    <img class="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="" />
                                                    <img class="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt="" />
                                                    <img class="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="" />
                                                    <img class="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg" alt="" />
                                                </div>
                                            </div>
                                        </div>

                                        <p class="mt-6 text-center text-gray-500 dark:text-gray-400 sm:mt-8 lg:text-left">
                                            Payment processed by <a href="#" title="" class="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Paddle</a> for <a href="#" title="" class="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Flowbite LLC</a>
                                            - United States Of America
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </Modal>
                        </Flex>
                    </>
                )}
                


                

            </div>
        </>
    )
}

export default Shop