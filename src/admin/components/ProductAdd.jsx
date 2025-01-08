

import React, { useEffect, useState, createContext } from 'react'

import axios from 'axios';
import { Button, Space, Modal, Tabs } from 'antd';
import { Image, Flex } from 'antd';
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}





const ProductAdd = () => {


  const Swal = require('sweetalert2')

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


  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border-2 border-gray-400">
      {/* <h3 className="text-lg font-semibold mb-2">Add New Product</h3>
      <form>
        <label className="block mb-2">
          Product Name:
          <input type="text" className="border p-2 w-full rounded-md" />
        </label>
        <label className="block mb-2">
          Price:
          <input type="number" className="border p-2 w-full rounded-md" />
        </label>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add Product
        </button>
      </form> */}



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
                <label class="block mb-2 text-sm font-medium text-black dark:text-black">Animal ID or Name</label>
                <input type='text' value={id} onChange={(e) => setId(e.target.value)} class="bg-gray-50 border border-red-800 text-red-800 text-sm rounded-lg  block w-52 p-2.5  dark:text-red-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your animals ID" required ></input>
                <p>or</p>
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



          </Tabs>
    </div>
  );
};

export default ProductAdd;
