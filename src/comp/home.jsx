import React, { useEffect, useState, createContext } from 'react'
import './home.css'
import ProductDetails from './productDetails'
import { Link } from 'react-router-dom'
import Homeproduct from './home_product'
import Extra from './extra'
import axios from 'axios';
import { AiFillEye, AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiLogoFacebook, BiLogoTwitter, BiLogoInstagram, BiLogoYoutube } from "react-icons/bi";
import { FiMail, FiTwitter, FiInstagram, FiYoutube } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { Image, Flex } from 'antd';
import { Carousel } from 'react-responsive-carousel';
import Cart from './cart'

import { Button, Space, Modal, Tabs } from 'antd';
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}



const Home = ({ addtocart }) => {

  const navigate = useNavigate();
  const Swal = require('sweetalert2')

  const [openPayment, setOpenPayment] = useState(false);
  const [openResponsive, setOpenResponsive] = useState(false);
  // payment method modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");

  const handlePaymentChange = (method) => {
    setSelectedPayment(method);
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Payment Method Selected: ${selectedPayment}`);
    setIsModalOpen(false);
  };


  // see more option button product
  // const [visibleItems, setVisibleItems] = useState(8); // Initially show 5 items
  // const [selectedProduct, setSelectedProduct] = useState(null); // Store selected product

  //  const [currentStartIndex, setCurrentStartIndex] = useState(0); // To track the start index of visible products
  //     const itemsPerPage = 8; // Number of products to show per page

  // const handleSeeMore = () => {
  //   setVisibleItems((prev) => Math.min(prev + 4, trendingProduct.length));
  // };

  // const handleShowLess = () => {
  //   setVisibleItems((prev) => Math.max(prev - 4, 4));
  // };

  const handleProductClick = (product) => {
    setSelectedProduct(product); // Set the selected product to display individual data
  };

  // const addtocartDetails = (product) => {
  //   console.log("Product added to cart:", product.Name);
  // };

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


  const [cart, setCart] = useState([]);

  // Function to add product to the cart
  const addToCart = (product) => {
    // Check if product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
      // If it exists, increase quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Otherwise, add the product to the cart with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };





  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };



  // _______________________________________ Start used for ANimals Insert data______________________________

  // get MaxId produt
  const [maxId, setMaxId] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:8082/getAnimalsId')
      .then(response => {
        setMaxId(response.data.max_id);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // ekhane ei variable gula database er moddhe jei column name chilo like same
  const [Name, setName] = useState('');
  const [Scientific_Name, setScientific_Name] = useState('');
  const [Classification, setClassification] = useState('');
  const [Size, setSize] = useState('');
  const [Weight, setWeight] = useState('');
  const [Skin_Color, setSkinColor] = useState('');
  const [Price, setPrice] = useState('');
  const [Others_Info, setOthersInfo] = useState('');
  const [image, setImage] = useState(null); // State for the image file

  // ekhane ei variable gula database er moddhe jei column name chilo like same
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Name', Name);
    formData.append('Scientific_Name', Scientific_Name);
    formData.append('Classification', Classification);
    formData.append('Size', Size);
    formData.append('Weight', Weight);
    formData.append('Skin_Color', Skin_Color);
    formData.append('Price', Price);
    formData.append('Others_Info', Others_Info);
    if (image) {
      formData.append('image', image); // Append the image file
    }

    try {
      const response = await axios.post('http://localhost:8082/api/animals_insert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
      // Reset form fields
      setName('');
      setScientific_Name('');
      setClassification('');
      setSize('');
      setWeight('');
      setSkinColor('');
      setPrice('');
      setOthersInfo('');
      setImage(null);

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Inserted data in database"
      });
    } catch (error) {
      console.error('There was an error!', error);
    }

  };

  // _______________________________________ End  used for ANimals Insert data______________________________



  // ************************************    Start  used for ANimals Display and Updated data______________________________

  // ekhane databse er kunu column er name dewya hoi ni, just dewya drekar tai dci
  const [id, setId] = useState('');
  const [NameUp, setNameUp] = useState('');
  const [animals, setAnimals] = useState([]);
  const [editData, setEditData] = useState({});
  const [isEditing, setIsEditing] = useState(null);

  // Fetch animals based on ID or name
  const fetchAnimals = async () => {
    try {
      const response = await axios.get('http://localhost:8082/animals_search', {
        params: { id, NameUp }
      });
      setAnimals(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target; //eta textfield er name and value,,,,not database column
    setEditData({ ...editData, [name]: value });
  };

  // Update animal data
  const updateAnimal = async (animalId) => {
    try {
      await axios.put(`http://localhost:8082/animals_update/${animalId}`, editData);
      fetchAnimals();  // Refresh data
      setIsEditing(null);  // Stop editing mode
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  // Delete animal by ID
  const deleteAnimal = async (animalId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });

        // deleted query
        try {
          axios.delete(`http://localhost:8082/animalsDelete/${animalId}`);
          setAnimals(animals.filter(animal => animal.id !== animalId)); // Update UI after delete
        } catch (error) {
          console.error('Error deleting data:', error);
        }
      }
    });
  };

  // ************************************    End  used for ANimals Display and Updated data______________________________






  // ****************************************  All data display from database *******************************************


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





  // Product category
  const [newProduct, setNewProduct] = useState([])
  const [featuredProduct, setFeaturdProduct] = useState([])
  const [topProduct, setTopProduct] = useState([])


  //Tranding Product
  // const [trendingProduct, setTrendingProduct] = useState(Homeproduct)
  // Filter of tranding product
  const filtercate = (x) => {
    const filterproduct = Extra.filter((curElm) => {
      return curElm.type === x
    })
    setTrendingProduct(filterproduct)
  }



  //All Trending Product
  const allTrendingProduct = () => {
    setTrendingProduct(Homeproduct)
  }


  useEffect(() => {
    productcategory()
  })
  const productcategory = () => {
    // New Product
    const newcategory = Homeproduct.filter((x) => {
      return x.type === 'new'
    })
    setNewProduct(newcategory)

    // Featured Product
    const featuredcategory = Homeproduct.filter((x) => {
      return x.type === 'featured'
    })
    setFeaturdProduct(featuredcategory)

    // Top Product
    const topcategory = Homeproduct.filter((x) => {
      return x.type === 'top'
    })
    setTopProduct(topcategory)



















  }

  return (
    <>
      <div className='home'>

        <div className='top_banner'>
          {/* <div className='contant'>

            <Link to='/shop' className='link'>Shop Now</Link>
          </div> */}

          <Carousel autoPlay={true}>
            <div>
              <img src='image/ani-1.jpg' ></img>
              <p className="legend">Legend 1</p>
            </div>
            <div>
              <img src="image/ani-2.jpg" />
              <p className="legend">Legend 2</p>
            </div>
            <div>
              <img src="image/ani-3.jpg"></img>
              <p className="legend">Legend 3</p>
            </div>
          </Carousel>


        </div>

        <div className='trending'>
          <div className='container'>
            <div className='left_box'>
              {/* <div className='header'>
                <div className='heading'>
                  <h2 onClick={showLoading}>Add</h2>
                </div>
                <div className='cate'>
                  <h3 onClick={() => filtercate('new')}>New</h3>
                  <h3 onClick={() => filtercate('featured')}>Featured</h3>
                  <h3 onClick={() => filtercate('top')}>top selling</h3>
                </div>
              </div> */}

              <div class="bg-gray-50  border-2 antialiased">
                {/* Start all display data from Local */}

                <div class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
                  <div>

                    <h2 class=" mx-3 mt-3 text-4xl font-bold text-blue-600 animate-bounce">Animals</h2>
                  </div>

                  <div className="mb-6">
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md bg-gray-200"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>



                  <div class="flex items-center space-x-4">
                    <button onClick={showLoading} data-modal-toggle="filterModal" data-modal-target="filterModal" type="button" class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">
                      <svg class="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
                      </svg>
                      Add Pets
                      <svg class="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                      </svg>
                    </button>
                    <button id="sortDropdownButton1" data-dropdown-toggle="dropdownSort1" type="button" class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">
                      <svg class="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4" />
                      </svg>
                      Sort
                      <svg class="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                      </svg>
                    </button>

                  </div>
                </div>

                {selectedProduct ? (
                  <>

                    <div class="bg-gray-100 dark:bg-gray-800 py-8">
                      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-2">
                        <div class="flex flex-col md:flex-row -mx-4 mt-3">
                          <div class="md:flex-1 px-4">
                            <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                              <img class="w-full h-full object-fit" src={`data:${selectedProduct.mime_type};base64,${selectedProduct.image}`}
                                alt={selectedProduct.Product_Name}></img>
                            </div>

                          </div>
                          <div class="md:flex-1 mt-3 px-4">
                            <h1 className='text-center text-bold'> ID: {selectedProduct.id}</h1>
                            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">{selectedProduct.Name}</h2>


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


                            <div class="flex mb-4">
                              <div class="mr-4">
                                <span class="font-bold text-gray-700 dark:text-gray-300">Price: </span>
                                <span class="text-gray-600 dark:text-gray-300">${selectedProduct.Price}</span>
                              </div>
                              <div>
                                <span class="font-bold text-gray-700 dark:text-gray-300">Availability: </span>
                                <span class="text-gray-600 dark:text-gray-300 ">In Stock</span>
                              </div>
                            </div>


                            <div>
                              <span class="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                              <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                {selectedProduct.Description}
                              </p>



                            </div>
                            <p>
                              <div class="flex mt-5 mb-4">
                                <div class="w-1/2 px-2">
                                  <p onClick={() => setOpenPayment(true)} class="w-full cursor-pointer text-center bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</p>
                                </div>
                                <div class="w-1/2 px-2 pointer">
                                  <p onClick={() => setSelectedProduct(null)} class=" cursor-pointer w-full text-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Back to products</p>
                                </div>
                              </div>
                            </p>



                          </div>
                        </div>
                      </div>
                    </div>

                    {/*  eta use kora hoice jokhn payment confirm korbne tokhn mOdal asbe */}
                    <Flex vertical gap="middle" align="flex-start">
                      {/* Basic */}

                      <Modal

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
                      </Modal>


                    </Flex>

                  </>








                ) : (
                  <>
                    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0 ">
                      <div class="mb-4 grid gap-2 sm:grid-cols-2 md:mb-8 lg:grid-row-3 xl:grid-cols-4 ">

                        {visibleProducts.map((curElm, index) => (
                          <div
                            className="box cursor-pointer p-2 rounded mx-3 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
                            key={index}
                            onClick={() => handleProductClick(curElm)}
                          >
                            <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                              <div class="h-36 w-full">
                                <span href="#">
                                  <img class="mx-auto h-full dark:hidden" src={`data:${curElm.mime_type};base64,${curElm.image}`}
                                    alt={curElm.Product_Name} />

                                </span>
                              </div>
                            </div>
                            <div class="pt-2">
                              <div class="mb-4 flex items-center justify-between gap-4">
                                <span class="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"> Up to 35% off </span>

                                <div class="flex items-center justify-end gap-1">
                                  <button type="button" data-tooltip-target="tooltip-quick-look" class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span class="sr-only"> Quick look </span>
                                    <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                      <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                      <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                  </button>
                                  <div id="tooltip-quick-look" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
                                    Quick look
                                    <div class="tooltip-arrow" data-popper-arrow=""></div>
                                  </div>

                                  <button type="button" data-tooltip-target="tooltip-add-to-favorites" class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span class="sr-only"> Add to Favorites </span>
                                    <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
                                    </svg>
                                  </button>
                                  <div id="tooltip-add-to-favorites" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
                                    Add to favorites
                                    <div class="tooltip-arrow" data-popper-arrow=""></div>
                                  </div>
                                </div>
                              </div>

                              <a href="#" class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{curElm.Name}</a>

                              <div class="mt-2 flex items-center gap-2">
                                <div class="flex items-center">
                                  <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                  </svg>

                                  <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                  </svg>

                                  <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                  </svg>

                                  <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                  </svg>

                                  <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                  </svg>
                                </div>

                                <p class="text-sm font-medium text-gray-900 dark:text-white">5.0</p>
                                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">(455)</p>
                              </div>

                              <ul class="mt-2 flex items-center gap-4">
                                <li class="flex items-center gap-2">
                                  <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                  </svg>
                                  <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Fast Delivery</p>
                                </li>

                                <li class="flex items-center gap-2">
                                  <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                  </svg>
                                  <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Best Price</p>
                                </li>
                              </ul>

                              <div class="mt-4 flex items-center sm:gap-2 ">
                                <p class="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">${curElm.Price}</p>

                                {/* <button
                                  onClick={() => addToCart(curElm)}
                                  type="button"
                                  className="inline-flex items-center rounded-lg bg-rose-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-800"
                                >
                                  Add
                                </button> */}
                              </div>
                            </div>
                          </div>


                        ))}



                      </div>
                      <div className="flex justify-center gap-5 mt-6  p-2">
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
                    </div>

                  </>
                )}





                {/* <section class="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
                  <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">

                   
                    
                    <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-row-3 xl:grid-cols-4">

                      {trendingProduct.slice(0, visibleItems).map((curElm, index) => (
                        <>
                        
                          <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">

                            <div class="h-56 w-full">
                              <span href="#">
                                <img class="mx-auto h-full dark:hidden" src={curElm.image} alt="" />

                              </span>
                            </div>

                            <div class="pt-6">
                              <div class="mb-4 flex items-center justify-between gap-4">
                                <span class="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"> Up to 35% off </span>

                                <div class="flex items-center justify-end gap-1">
                                  <button type="button" data-tooltip-target="tooltip-quick-look" class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span class="sr-only"> Quick look </span>
                                    <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                      <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                      <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                  </button>
                                  <div id="tooltip-quick-look" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
                                    Quick look
                                    <div class="tooltip-arrow" data-popper-arrow=""></div>
                                  </div>

                                  <button type="button" data-tooltip-target="tooltip-add-to-favorites" class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span class="sr-only"> Add to Favorites </span>
                                    <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
                                    </svg>
                                  </button>
                                  <div id="tooltip-add-to-favorites" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
                                    Add to favorites
                                    <div class="tooltip-arrow" data-popper-arrow=""></div>
                                  </div>
                                </div>
                              </div>

                              <a href="#" class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max</a>

                              <div class="mt-2 flex items-center gap-2">
                                <div class="flex items-center">
                                  <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                  </svg>

                                  <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                  </svg>

                                  <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                  </svg>

                                  <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                  </svg>

                                  <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                  </svg>
                                </div>

                                <p class="text-sm font-medium text-gray-900 dark:text-white">5.0</p>
                                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">(455)</p>
                              </div>

                              <ul class="mt-2 flex items-center gap-4">
                                <li class="flex items-center gap-2">
                                  <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                  </svg>
                                  <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Fast Delivery</p>
                                </li>

                                <li class="flex items-center gap-2">
                                  <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                  </svg>
                                  <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Best Price</p>
                                </li>
                              </ul>

                              <div class="mt-4 flex items-center justify-between gap-4">
                                <p class="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">${curElm.price}</p>

                                <button onClick={(e) => {
                                  e.stopPropagation();
                                  addtocart(curElm);
                                }} type="button" class="inline-flex items-center rounded-lg bg-rose-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                  <svg class="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                                  </svg>
                                  Add to cart
                                </button>
                              </div>
                            </div>
                          </div>



                        </>
                      ))}
                  
                      
                    </div>







                    
                    <div className="flex justify-center space-x-4 mt-6">
                        <button
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
                          onClick={handleShowLess}
                          disabled={visibleItems <= 5}
                        >
                          Show Less
                        </button>
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                          onClick={handleSeeMore}
                          disabled={visibleItems >= trendingProduct.length}
                        >
                          See More
                        </button>
                      </div>
                  </div>

                </section> */}




              </div>


              {/* <div className="pagination">
                  <button
                    className="btn"
                    onClick={handleShowLess}
                    disabled={visibleItems <= 5}
                  >
                    Show Less
                  </button>
                  <button
                    className="btn"
                    onClick={handleSeeMore}
                    disabled={visibleItems >= trendingProduct.length}
                  >
                    See More
                  </button>
                </div> */}



              {/* <button>Show More</button> */}

            </div>

            <div className="right_box bg-gray-50 p-6 rounded-lg shadow-lg">
              {/* Testimonial Section */}
              <div className="testimonial bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="head text-center">
                  <h3 className="text-2xl font-bold text-gray-700">What Our Clients Say</h3>
                </div>
                <div className="detail mt-6 flex items-center">
                  <div className="img_box flex-shrink-0 w-16 h-16">
                    <img
                      src="https://via.placeholder.com/64"
                      alt="testimonial"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="info ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">Sophia Williams</h3>
                    <h4 className="text-sm text-blue-600">Product Manager</h4>
                    <p className="text-gray-600 mt-2 text-sm">
                      "The team's dedication and skill exceeded our expectations. We saw real results
                      within weeks!"
                    </p>
                  </div>
                </div>
              </div>

              {/* Newsletter Section */}
              <div className="newsletter bg-blue-100 p-6 rounded-lg shadow-md">
                <div className="head text-center">
                  <h3 className="text-2xl font-bold text-blue-700">Stay Updated</h3>
                  <p className="text-gray-600 mt-2 text-sm">
                    Subscribe to our newsletter for the latest updates.
                  </p>
                </div>
                <div className="form mt-6">
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 p-3 border rounded-l-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <button className="bg-blue-600 text-white px-6 rounded-r-md hover:bg-blue-700 transition">
                      Subscribe
                    </button>
                  </div>
                </div>
                <div className="icon_box flex justify-center mt-6 space-x-4">
                  <div className="icon p-2 bg-white rounded-full shadow-lg hover:bg-blue-100 transition">
                    <FiMail className="text-blue-700 text-xl" />
                  </div>
                  <div className="icon p-2 bg-white rounded-full shadow-lg hover:bg-blue-100 transition">
                    <FiTwitter className="text-blue-700 text-xl" />
                  </div>
                  <div className="icon p-2 bg-white rounded-full shadow-lg hover:bg-blue-100 transition">
                    <FiInstagram className="text-blue-700 text-xl" />
                  </div>
                  <div className="icon p-2 bg-white rounded-full shadow-lg hover:bg-blue-100 transition">
                    <FiYoutube className="text-blue-700 text-xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



































        <div className='banners'>
          <div className='container'>
            <div className='left_box '>
              <div className='box'>
                <img src='image/dog.jpeg' alt='banner'></img>
              </div>
              <div className='box'>
                <img src='image/cat2.jpeg' alt='banner'></img>
                <img className='mt-4' src='image/cat2.jpeg' alt='banner'></img>
              </div>
            </div>
            <div className='right_box'>
              <div className='top'>
                {/* <img className='object-fill' src='image/pack-cat.jpeg' alt=''></img>
                <img src='image/Multi-Banner-4.avif' alt=''></img> */}
              </div>
              <div className='bottom'>
                <img src='image/cat-banner.jpeg' alt=''></img>
              </div>
            </div>
          </div>
        </div>








        {/* Modal used for Animals Add */}
        <Modal
          title={<p>Animal Information</p>}
          centered
          style={{ botto: 20 }}
          footer={
            <></>
          }
          loading={loading}
          open={open}
          onCancel={() => setOpen(false)}
          width={750}
        >

          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Insert" key="1">

              <form onSubmit={handleSubmit} >
                <h1 className='flex gap-5 mt-5 mb-3 items-center text-[20px]'>Your Animal Id :  <p className='text-red-700 font-semibold text-[20px]'>{maxId + 1}</p></h1>
                <div class="grid gap-6 mb-6 md:grid-cols-2">

                  <div>
                    <label class="block mb-2 text-sm font-medium text-black dark:text-black">Animal Name</label>
                    <input type="text" value={Name} onChange={(e) => setName(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cat" required />
                  </div>
                  <div>
                    <label class="block mb-2 text-sm font-medium text-black dark:text-black">Acientific Name</label>
                    <input type="text" value={Scientific_Name} onChange={(e) => setScientific_Name(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Felis catus" required />
                  </div>
                  <div>
                    <label class="block mb-2 text-sm font-medium text-black dark:text-black">Classification</label>
                    <input type="text" value={Classification} onChange={(e) => setClassification(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Felis" required />
                  </div>
                  <div>
                    <label class="block mb-2 text-sm font-medium text-black dark:text-black">Size feet</label>
                    <input type="text" value={Size} onChange={(e) => setSize(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="71.1 cm (28 inches)" required />
                  </div>
                  <div>
                    <label class="block mb-2 text-sm font-medium text-black dark:text-black">Weight</label>
                    <input type="text" value={Weight} onChange={(e) => setWeight(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="6 to 10 pounds" required />
                  </div>
                  <div>
                    <label class="block mb-2 text-sm font-medium text-black dark:text-black">Skin Color</label>
                    <input type="text" value={Skin_Color} onChange={(e) => setSkinColor(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="red" required />
                  </div>

                </div>

                <div class="mb-6">
                  <label class="block mb-2 text-sm font-medium text-black dark:text-black">Price</label>
                  <input type="number" value={Price} onChange={(e) => setPrice(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="3000" required />
                </div>
                <div class="mb-6">
                  <label class="block mb-2 text-sm font-medium text-black dark:text-black">Another Information</label>
                  <textarea value={Others_Info} onChange={(e) => setOthersInfo(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Others information" required ></textarea>
                </div>

                <div class="mb-6">
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Animal picture</label>
                  <input type="file" onChange={(e) => setImage(e.target.files[0])} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                </div>

                <div class="flex items-start mb-6">
                  <div class="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                  </div>
                  <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

              </form>

            </TabPane>

            <TabPane tab="Update" key="2">

              <div class=" flex items-center justify-center gap-6 mb-6 md:grid-cols-2 mt-3">
                <label class="block mb-2 text-sm font-medium text-black dark:text-black">Animal ID & Name</label>
                <input type='text' value={id} onChange={(e) => setId(e.target.value)} class="bg-gray-50 border border-red-800 text-red-800 text-sm rounded-lg  block w-52 p-2.5  dark:text-red-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your animals ID" required ></input>
                <input type='text' value={NameUp} onChange={(e) => setNameUp(e.target.value)} class="bg-gray-50 border border-red-800 text-red-800 text-sm rounded-lg  block w-52 p-2.5  dark:text-red-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your animals Name" required ></input>
                <button onClick={fetchAnimals} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
              <div>
                {animals.length > 0 ? (
                  animals.map((animal) => (
                    <div key={animal.id} style={{ border: '2px solid #ccc', padding: '10px', margin: '10px' }}>
                      {isEditing === animal.id ? (

                        <>

                          <div class="grid gap-6 mb-6 md:grid-cols-2">

                            <div>
                              <label class="block mb-2 text-sm font-medium text-black dark:text-black">Animal Name</label>
                              <input type='text' name="Name" defaultValue={animal.Name} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cat" required />
                            </div>
                            <div>
                              <label class="block mb-2 text-sm font-medium text-black dark:text-black">Scientific Name</label>
                              <input type='text' name="Scientific_Name" defaultValue={animal.Scientific_Name} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Felis catus" required />
                            </div>
                            <div>
                              <label class="block mb-2 text-sm font-medium text-black dark:text-black">Classification</label>
                              <input type='text' name="Classification" defaultValue={animal.Classification} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Felis" required />
                            </div>
                            <div>
                              <label class="block mb-2 text-sm font-medium text-black dark:text-black">Size feet</label>
                              <input type='text' name="Size" defaultValue={animal.Size} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="71.1 cm (28 inches)" required />
                            </div>
                            <div>
                              <label class="block mb-2 text-sm font-medium text-black dark:text-black">Weight</label>
                              <input type='text' name="Weight" defaultValue={animal.Weight} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="6 to 10 pounds" required />
                            </div>
                            <div>
                              <label class="block mb-2 text-sm font-medium text-black dark:text-black">Skin Color</label>
                              <input type='text' name="Skin_Color" defaultValue={animal.Skin_Color} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="red" required />
                            </div>

                          </div>
                          <div class="mb-6">
                            <label class="block mb-2 text-sm font-medium text-black dark:text-black">Another Information</label>
                            <textarea type='text' name="Others_Info" defaultValue={animal.Others_Info} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Others information" required ></textarea>
                          </div>
                          <div className='flex gap-10 '>
                            <button onClick={() => updateAnimal(animal.id)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                            <button onClick={() => setIsEditing(null)} class="text-white bg-red-800 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">Cancel</button>
                          </div>

                        </>

                      ) : (
                        <>
                          <div class="grid gap-6 mb-6 md:grid-cols-2">

                            <div>
                              <label class="block mb-2 text-sm font-medium text-black dark:text-black">Animal Name</label>
                              <input value={animal.Name} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cat" required />
                            </div>
                            <div>
                              <label class="block mb-2 text-sm font-medium text-black dark:text-black">Scientific Name</label>
                              <input value={animal.Scientific_Name} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Felis catus" required />
                            </div>
                            <div>
                              <label class="block mb-2 text-sm font-medium text-black dark:text-black">Classification</label>
                              <input type="text" value={animal.Classification} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Felis" required />
                            </div>
                            <div>
                              <label class="block mb-2 text-sm font-medium text-black dark:text-black">Size feet</label>
                              <input type="text" value={animal.Size} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="71.1 cm (28 inches)" required />
                            </div>
                            <div>
                              <label class="block mb-2 text-sm font-medium text-black dark:text-black">Weight</label>
                              <input type="text" value={animal.Weight} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="6 to 10 pounds" required />
                            </div>
                            <div>
                              <label class="block mb-2 text-sm font-medium text-black dark:text-black">Skin Color</label>
                              <input type="text" value={animal.Skin_Color} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="red" required />
                            </div>

                          </div>
                          <div class="mb-6">
                            <label class="block mb-2 text-sm font-medium text-black dark:text-black">Another Information</label>
                            <textarea value={animal.Others_Info} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Others information" required ></textarea>
                          </div>

                          {animal.image && (
                            <Image
                              width={200}
                              height={200}
                              centered
                              class="h-auto max-w-xl rounded-lg shadow-xl dark:shadow-gray-800"
                              src={`data:image/jpeg;base64,${animal.image}`}
                            />

                          )}
                          <div className='flex items-end justify-end gap-8'>
                            <button onClick={() => setIsEditing(animal.id)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
                            <button onClick={() => deleteAnimal(animal.id)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-rose-500 dark:hover:bg-rose-800 dark:focus:ring-blue-800">Delete</button>

                          </div>

                        </>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No animals found</p>
                )}
              </div>




              {/* 
              <div>
                <h1>Animal Data Search & Update</h1>
                <div>
                  <input
                    type="text"
                    placeholder="Enter ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Enter Name"
                    value={NameUp}
                    onChange={(e) => setNameUp(e.target.value)}
                  />
                  <button onClick={fetchAnimals}>Search</button>
                </div>

                <div>
                  <h2>Results:</h2>
                  {animals.length > 0 ? (
                    animals.map((animal) => (
                      <div key={animal.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
                        {isEditing === animal.id ? (
                          <>
                            <label>Name:  </label>
                            <input
                              type="text"
                              name="Name"
                              defaultValue={animal.Name}
                              onChange={handleChange}
                            />
                            <label>Scienctific:  </label>
                            <input
                              type="text"
                              name="Scientific_Name"
                              defaultValue={animal.Scientific_Name}
                              onChange={handleChange}
                            />
                            <label>Classifi :  </label>
                            <input
                              type="text"
                              name="Classification"
                              defaultValue={animal.Classification}
                              onChange={handleChange}
                            />
                            <label>Size:  </label>
                            <input
                              type="text"
                              name="Size"
                              defaultValue={animal.Size}
                              onChange={handleChange}
                            />
                            <label>Weight:  </label>
                            <input
                              type="text"
                              name="Weight"
                              defaultValue={animal.Weight}
                              onChange={handleChange}
                            />
                            <label>Color:  </label>
                            <input
                              type="text"
                              name="Skin_Color"
                              defaultValue={animal.Skin_Color}
                              onChange={handleChange}
                            />
                            <label>Price:  </label>
                            <input
                              type="number"
                              name="Price"
                              defaultValue={animal.Price}
                              onChange={handleChange}
                            />
                            <label>Others:  </label>
                            <input
                              type="text"
                              name="Others_Info"
                              defaultValue={animal.Others_Info}
                              onChange={handleChange}
                            />
                            <br></br><br></br>
                            <button onClick={() => updateAnimal(animal.id)}>Save</button>
                            <button onClick={() => setIsEditing(null)}>Cancel</button>
                          </>
                        ) : (
                          <>
                            <p>Name: {animal.Name}</p>
                            <p>Scientific Name: {animal.Scientific_Name}</p>
                            <p>Classification: {animal.Classification}</p>
                            <p>Size: {animal.Size}</p>
                            <p>Weight: {animal.Weight}</p>
                            <p>Skin Color: {animal.Skin_Color}</p>
                            <p>Price: ${animal.Price}</p>
                            <p>Other Info: {animal.Others_Info}</p>
                            {animal.image && (
                              <img
                                src={`data:image/jpeg;base64,${animal.image}`}
                                // src={`data: base64,${animal.image}`}
                                alt="Animal"
                                width="100"
                              />
                            )}
                            <button onClick={() => setIsEditing(animal.id)}>Edit</button>
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No animals found</p>
                  )}
                </div>
              </div> */}

            </TabPane>



          </Tabs>,



        </Modal>








      </div>
    </>
  )
}

export default Home