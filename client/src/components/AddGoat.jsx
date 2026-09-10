import React, { useState } from "react";
import {
  ArrowLeft,
  Upload,
  CalendarDays,
  Scale,
  Plus,
  Check,
  ChevronDown,
  Camera,
  Tag,
  Heart,
  ShoppingBag,
} from "lucide-react";
import "./AddGoat.css";

const AddGoat = ({ onBack }) => {
  const [photo, setPhoto] = useState(null);
  const [gender, setGender] = useState("female");
  const [origin, setOrigin] = useState("born");
  const [form, setForm] = useState({
    tagNumber: "",
    name: "",
    breed: "",
    birthDate: "",
    farmEntry: "",
    weight: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      ...form,
      photo,
      gender,
      origin,
    });

    alert("Goat profile created successfully!");
  };

  return (
    <div className="goat-page">

      {/* TOP BAR */}
      <header className="goat-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={19} />
          <span>Goats</span>
        </button>

        <button className="save-top-btn" onClick={handleSubmit}>
          SAVE & CONTINUE
        </button>
      </header>

      <main className="goat-container">

        {/* TITLE */}
        <div className="goat-title">
          <span className="eyebrow">GOAT MANAGEMENT</span>
          <h1>Add New Goat</h1>
          <p>Create a digital profile for your goat</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* PHOTO CARD */}
          <section className="photo-card">

            <div className="photo-preview">
              {photo ? (
                <img src={photo} alt="Goat preview" />
              ) : (
                <>
                  <div className="goat-icon">
                    🐐
                  </div>

                  <h3>Add Goat Photo</h3>

                  <p>
                    Upload a clear photo of your goat
                  </p>
                </>
              )}
            </div>

            <label className="upload-btn">
              <Camera size={17} />
              {photo ? "Change Photo" : "Upload Photo"}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhoto}
                hidden
              />
            </label>

            <span className="upload-hint">
              JPG, PNG or WEBP · Max 5MB
            </span>

          </section>


          {/* TWO COLUMN SECTION */}
          <div className="details-grid">

            {/* IDENTITY */}
            <section className="info-card">

              <div className="card-heading">
                <div className="heading-icon">
                  <Tag size={18} />
                </div>

                <div>
                  <span>01</span>
                  <h2>Identity</h2>
                </div>
              </div>

              <div className="field">
                <label>Tag Number</label>

                <div className="input-with-prefix">
                  <span>#</span>

                  <input
                    type="text"
                    name="tagNumber"
                    placeholder="214"
                    value={form.tagNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <label>Goat Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Bella"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

            </section>


            {/* CLASSIFICATION */}
            <section className="info-card">

              <div className="card-heading">
                <div className="heading-icon">
                  <Heart size={18} />
                </div>

                <div>
                  <span>02</span>
                  <h2>Classification</h2>
                </div>
              </div>

              <div className="field">
                <label>Breed</label>

                <div className="select-wrapper">
                  <select
                    name="breed"
                    value={form.breed}
                    onChange={handleChange}
                  >
                    <option value="">Select breed</option>
                    <option value="Boer">Boer</option>
                    <option value="Jamunapari">Jamunapari</option>
                    <option value="Sirohi">Sirohi</option>
                    <option value="Beetal">Beetal</option>
                    <option value="Kanni Adu">Kanni Adu</option>
                    <option value="Kodi Adu">Kodi Adu</option>
                    <option value="Other">Other</option>
                  </select>

                  <ChevronDown size={17} />
                </div>
              </div>

              <div className="field">
                <label>Gender</label>

                <div className="gender-options">

                  <button
                    type="button"
                    className={
                      gender === "female"
                        ? "gender-btn active female"
                        : "gender-btn"
                    }
                    onClick={() => setGender("female")}
                  >
                    <span>♀</span>
                    Female

                    {gender === "female" && (
                      <Check size={15} />
                    )}
                  </button>

                  <button
                    type="button"
                    className={
                      gender === "male"
                        ? "gender-btn active male"
                        : "gender-btn"
                    }
                    onClick={() => setGender("male")}
                  >
                    <span>♂</span>
                    Male

                    {gender === "male" && (
                      <Check size={15} />
                    )}
                  </button>

                </div>
              </div>

            </section>

          </div>


          {/* TIMELINE */}
          <section className="timeline-card">

            <div className="timeline-heading">
              <div>
                <span className="eyebrow">PROFILE DETAILS</span>
                <h2>Goat Timeline</h2>
              </div>

              <div className="timeline-line"></div>
            </div>

            <div className="timeline-grid">

              <div className="timeline-field">
                <div className="timeline-icon">
                  <CalendarDays size={18} />
                </div>

                <div>
                  <label>Birth Date</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={form.birthDate}
                    onChange={handleChange}
                  />
                </div>
              </div>


              <div className="timeline-field">
                <div className="timeline-icon">
                  <CalendarDays size={18} />
                </div>

                <div>
                  <label>Farm Entry</label>
                  <input
                    type="date"
                    name="farmEntry"
                    value={form.farmEntry}
                    onChange={handleChange}
                  />
                </div>
              </div>


              <div className="timeline-field">
                <div className="timeline-icon weight">
                  <Scale size={18} />
                </div>

                <div className="weight-input">
                  <label>Current Weight</label>

                  <div>
                    <input
                      type="number"
                      step="0.1"
                      name="weight"
                      placeholder="32.5"
                      value={form.weight}
                      onChange={handleChange}
                    />
                    <span>kg</span>
                  </div>
                </div>
              </div>

            </div>

          </section>


          {/* ORIGIN */}
          <section className="origin-section">

            <div className="section-label">
              <span>03</span>

              <div>
                <h2>How did this goat join your farm?</h2>
                <p>Select one option</p>
              </div>
            </div>


            <div className="origin-grid">

              {/* BORN */}
              <button
                type="button"
                className={
                  origin === "born"
                    ? "origin-card selected"
                    : "origin-card"
                }
                onClick={() => setOrigin("born")}
              >
                <div className="origin-icon">
                  🐐
                </div>

                <div className="origin-text">
                  <strong>Born Here</strong>
                  <span>Born on your farm</span>
                </div>

                {origin === "born" && (
                  <div className="selected-check">
                    <Check size={14} />
                  </div>
                )}
              </button>


              {/* PURCHASED */}
              <button
                type="button"
                className={
                  origin === "purchased"
                    ? "origin-card selected"
                    : "origin-card"
                }
                onClick={() => setOrigin("purchased")}
              >
                <div className="origin-icon">
                  <ShoppingBag size={21} />
                </div>

                <div className="origin-text">
                  <strong>Purchased</strong>
                  <span>Bought from another farm</span>
                </div>

                {origin === "purchased" && (
                  <div className="selected-check">
                    <Check size={14} />
                  </div>
                )}
              </button>


              {/* OTHER */}
              <button
                type="button"
                className={
                  origin === "other"
                    ? "origin-card selected"
                    : "origin-card"
                }
                onClick={() => setOrigin("other")}
              >
                <div className="origin-icon">
                  <Plus size={22} />
                </div>

                <div className="origin-text">
                  <strong>Other</strong>
                  <span>Another source</span>
                </div>

                {origin === "other" && (
                  <div className="selected-check">
                    <Check size={14} />
                  </div>
                )}
              </button>

            </div>

          </section>


          {/* BOTTOM ACTIONS */}
          <div className="bottom-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={onBack}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-btn"
            >
              Create Goat Profile
              <ArrowLeft
                size={18}
                className="arrow-right"
              />
            </button>

          </div>

        </form>

      </main>
    </div>
  );
};

export default AddGoat;