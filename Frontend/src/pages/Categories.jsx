import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import CategoryCard from "../components/CategoryCard";
import { AlertTriangle } from "lucide-react";

const CATEGORIES_DATA = [
  {
    id: "Action",
    name: "Action",
    color: "#FF5720",
    image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "Drama",
    name: "Drama",
    color: "#D7BDE2",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "Romance",
    name: "Romance",
    color: "#148A08",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "Thriller",
    name: "Thriller",
    color: "#84C2E9",
    image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "Western",
    name: "Western",
    color: "#79281A",
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "Horror",
    name: "Horror",
    color: "#7D3C95",
    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "Fantasy",
    name: "Fantasy",
    color: "#FF33F5",
    image: "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "Music",
    name: "Music",
    color: "#E74C3C",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "Fiction",
    name: "Fiction",
    color: "#6EBA7C",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400",
  },
];

const Categories = () => {
  const storeCategories = useStore((state) => state.categories);
  const setCategories = useStore((state) => state.setCategories);
  const navigate = useNavigate();

  const [selected, setSelected] = useState([]);

  // Load from store on mount
  useEffect(() => {
    if (storeCategories && storeCategories.length > 0) {
      setSelected(storeCategories);
    }
  }, [storeCategories]);

  const handleToggle = (categoryId) => {
    if (selected.includes(categoryId)) {
      setSelected(selected.filter((id) => id !== categoryId));
    } else {
      setSelected([...selected, categoryId]);
    }
  };

  const handleDeselect = (categoryId) => {
    setSelected(selected.filter((id) => id !== categoryId));
  };

  const handleNext = () => {
    if (selected.length >= 3) {
      setCategories(selected);
      navigate("/dashboard");
    }
  };

  const isMinRequiredSatisfied = selected.length >= 3;

  return (
    <div className="categories-page container-fluid min-vh-100 p-4 p-md-5 bg-black text-white">
      <div className="row g-5">
        <div className="categories-left col-12 col-lg-5 d-flex flex-column text-start justify-content-between">
          <div>
            <h1 className="brand-logo mb-4">Super app</h1>
            <h2 className="categories-heading display-4 fw-bold mb-4 text-white">Choose your entertainment category</h2>

            <div className="selected-chips-container d-flex flex-wrap gap-2 mb-4">
              {selected.map((catId) => {
                const cat = CATEGORIES_DATA.find((c) => c.id === catId);
                return (
                  <div
                    key={catId}
                    className="selected-chip badge bg-success d-inline-flex align-items-center gap-2 p-2 px-3 rounded-pill cursor-pointer"
                    onClick={() => handleDeselect(catId)}
                    style={{ fontSize: "0.95rem" }}
                  >
                    <span>{cat?.name}</span>
                    <span className="deselect-x bg-white text-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: "16px", height: "16px", fontSize: "0.7rem", fontWeight: "bold" }}>X</span>
                  </div>
                );
              })}
            </div>
          </div>

          {!isMinRequiredSatisfied && (
            <div className="min-categories-error text-danger d-flex align-items-center gap-2 mt-2">
              <AlertTriangle size={18} />
              <span>Minimum 3 categories required</span>
            </div>
          )}
        </div>

        <div className="categories-right col-12 col-lg-7 d-flex flex-column align-items-end gap-4">
          <div className="row row-cols-2 row-cols-md-3 g-3 w-100">
            {CATEGORIES_DATA.map((cat) => (
              <div className="col" key={cat.id}>
                <CategoryCard
                  category={cat}
                  isSelected={selected.includes(cat.id)}
                  onToggle={handleToggle}
                />
              </div>
            ))}
          </div>

          <button
            className="btn btn-success rounded-pill px-5 py-2 fs-5 fw-bold mt-2"
            disabled={!isMinRequiredSatisfied}
            onClick={handleNext}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
