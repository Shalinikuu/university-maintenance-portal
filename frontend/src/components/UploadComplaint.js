import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UploadComplaint() {

  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState(null);

  const navigate = useNavigate();

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        console.log("Location fetched:", position.coords);
      },
      (error) => {
        console.log("Location Error:", error);
        alert("Please allow location access");
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleSubmit = async () => {

    const userId = localStorage.getItem("userId");

    if (!image || !description || !category || !location) {
      alert("Fill all fields");
      return;
    }

    if (!coords) {
      alert("Location not detected. Please allow location.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("userId", userId);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("latitude", coords.lat);
    formData.append("longitude", coords.lng);

    try {

      const response = await fetch(
        "https://university-maintenance-portal.onrender.com/api/complaint/upload",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();
      console.log("Complaint Response:", data);

      if (response.ok) {
        alert("Complaint Submitted Successfully");
        navigate("/user");
      } else {
        alert(data.message || "Failed to submit complaint");
      }

    } catch (error) {
      console.error("Submit Error:", error);
      alert("Server error while submitting complaint");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "auto" }}>
      <h2>Upload Complaint</h2>

      <button onClick={getLocation} style={{ marginBottom: "15px" }}>
        Get Current Location
      </button>

      {coords && (
        <p>
          📍 {coords.lat}, {coords.lng}
        </p>
      )}

      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <br /><br />

      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option>Electrical</option>
        <option>Plumbing</option>
        <option>Furniture</option>
        <option>IT Issue</option>
      </select>

      <br /><br />

      <input
        placeholder="Enter Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Describe issue..."
        rows="4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Submit Complaint
      </button>

    </div>
  );
}

export default UploadComplaint;