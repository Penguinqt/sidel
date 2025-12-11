import React, { useEffect, useState } from "react";

const ProvidersPage = () => {
  const [provider, setProvider] = useState(null);
  const [gigs, setGigs] = useState([]);
  const [newGig, setNewGig] = useState({
    id: Date.now(),
    title: "",
    description: "",
    price: "",
    category: "",
    tags: [],
    photos: [],
  });
  const [tagInput, setTagInput] = useState([]);
  const [photoFiles, setPhotoFiles] = useState([]);

  useEffect(() => {
    const loggedProvider = JSON.parse(localStorage.getItem("loggedProvider"));

    if (!loggedProvider) {
      alert("You must log in first.");
      window.location.href = "/";
      return;
    }

    if (loggedProvider.status !== "approved") {
      alert("Your provider application is still pending approval.");
      window.location.href = "/dashboard";
      return;
    }

    setProvider(loggedProvider);
    setGigs(loggedProvider.gigs || []);
  }, []);

  const handleGigChange = (e) => {
    const { name, value } = e.target;
    setNewGig({ ...newGig, [name]: value });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !newGig.tags.includes(tagInput.trim())) {
      setNewGig({ ...newGig, tags: [...newGig.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNewGig({
      ...newGig,
      tags: newGig.tags.filter((t) => t !== tagToRemove),
    });
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + photoFiles.length > 10) {
      alert("You can upload a maximum of 10 photos/videos.");
      return;
    }
    setPhotoFiles([...photoFiles, ...files]);
    setNewGig({
      ...newGig,
      photos: [...photoFiles.map(f => f.name), ...files.map(f => f.name)],
    });
  };

  const handleAddGig = (e) => {
    e.preventDefault();
    const updatedGigs = [...gigs, newGig];
    setGigs(updatedGigs);

    const updatedProvider = { ...provider, gigs: updatedGigs };
    setProvider(updatedProvider);
    localStorage.setItem("loggedProvider", JSON.stringify(updatedProvider));

    // reset form
    setNewGig({ id: Date.now(), title: "", description: "", price: "", category: "", tags: [], photos: [] });
    setPhotoFiles([]);
    setTagInput("");
  };

  const handleDeleteGig = (id) => {
    const updatedGigs = gigs.filter(g => g.id !== id);
    setGigs(updatedGigs);

    const updatedProvider = { ...provider, gigs: updatedGigs };
    setProvider(updatedProvider);
    localStorage.setItem("loggedProvider", JSON.stringify(updatedProvider));
  };

  if (!provider) return null;

  return (
    <div className="provider-page-container">
      <h1>Welcome, {provider.name}!</h1>
      <p><strong>Email:</strong> {provider.email}</p>
      <p><strong>Service:</strong> {provider.serviceCategory}</p>
      <p><strong>Description:</strong> {provider.description}</p>
      <p><strong>Rate:</strong> {provider.rate}</p>
      <p><strong>Experience:</strong> {provider.experience}</p>
      <p><strong>Availability:</strong> {provider.availability}</p>

      <h3>Skills</h3>
      <ul>{provider.tags?.map((t, i) => <li key={i}>{t}</li>)}</ul>

      <hr />

      <h2>Manage Your Gigs</h2>
      <form onSubmit={handleAddGig}>
        <input type="text" name="title" placeholder="Gig Title" value={newGig.title} onChange={handleGigChange} required />
        <textarea name="description" placeholder="Gig Description" value={newGig.description} onChange={handleGigChange} required />
        <input type="text" name="price" placeholder="Price" value={newGig.price} onChange={handleGigChange} required />
        <input type="text" name="category" placeholder="Category" value={newGig.category} onChange={handleGigChange} required />

        <input type="text" placeholder="Add Tag" value={tagInput} onChange={(e) => setTagInput(e.target.value)} />
        <button type="button" onClick={handleAddTag}>Add Tag</button>
        <div>
          {newGig.tags.map((tag, i) => (
            <span key={i} onClick={() => handleRemoveTag(tag)} style={{marginRight: '5px', cursor:'pointer'}}>{tag} ×</span>
          ))}
        </div>

        <input type="file" multiple accept="image/*,video/*" onChange={handlePhotoUpload} />
        {photoFiles.length > 0 && <p>{photoFiles.length} file(s) selected</p>}

        <button type="submit">Add Gig</button>
      </form>

      <h3>Your Uploaded Gigs</h3>
      {gigs.length === 0 ? (
        <p>No gigs yet</p>
      ) : (
        gigs.map((g) => (
          <div key={g.id} style={{border:'1px solid #ccc', margin:'10px', padding:'10px'}}>
            <h4>{g.title}</h4>
            <p>{g.description}</p>
            <p>Price: ${g.price}</p>
            <p>Category: {g.category}</p>
            <p>Tags: {g.tags.join(", ")}</p>
            <p>Photos/Videos: {g.photos.join(", ")}</p>
            <button onClick={() => handleDeleteGig(g.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ProvidersPage;
