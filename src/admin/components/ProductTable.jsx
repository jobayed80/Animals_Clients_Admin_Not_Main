import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:8082/productsDis");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add a title
    doc.setFontSize(18);
    doc.text("Product Report", 14, 22);

    // Add some extra content
    doc.setFontSize(12);
    doc.text(
      `Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      14,
      30
    );
    doc.text("This report contains detailed product information.", 14, 36);

    // Prepare table data
    const tableColumn = [
      "ID",
      "Name",
      "Scientific Name",
      "Classification",
      "Size",
      "Weight",
      "Price",
      "Skin Color",
      "Other Info",
    ];

    const tableRows = filteredProducts.map((product) => [
      product.id,
      product.Name,
      product.Scientific_Name,
      product.Classification,
      product.Size,
      product.Weight,
      product.Price,
      product.Skin_Color,
      product.Others_Info,
    ]);

    // Generate table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    // Save the PDF
    doc.save("product_report.pdf");
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Product Table
      </h2>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-3 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      

      {/* Product Table */}
      <div className="overflow-y-auto max-h-96 rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                ID
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Image
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Name
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Scientific Name
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Classification
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Size
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Weight
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Price
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Skin Color
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                Others Info
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr
                key={product.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-100 transition duration-200`}
              >
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {product.id}
                </td>
                <td className="py-3 px-6 text-gray-800 font-medium">
                  <Image
                    className="h-20 w-20 object-contain rounded-2xl"
                    width={50}
                    src={`data:${product.mimeType};base64,${product.image}`}
                  />
                </td>
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {product.Name}
                </td>
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {product.Scientific_Name}
                </td>
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {product.Classification}
                </td>
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {product.Size}
                </td>
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {product.Weight}
                </td>
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {product.Price}
                </td>
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {product.Skin_Color}
                </td>
                <td className="py-3 px-6 text-gray-800 font-medium">
                  {product.Others_Info}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{/* Download PDF Button */}
      <div className="flex justify-center mb-4 mt-4 text-center ">
        <button
          onClick={generatePDF}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
