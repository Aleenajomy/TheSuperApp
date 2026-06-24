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
    <div className="categories-page">
      <div className="categories-left">
        <h1 className="brand-logo">Super app</h1>
        <h2 className="categories-heading">Choose your entertainment category</h2>

        <div className="selected-chips-container">
          {selected.map((catId) => {
            const cat = CATEGORIES_DATA.find((c) => c.id === catId);
            return (
              <div
                key={catId}
                className="selected-chip"
                onClick={() => handleDeselect(catId)}
              >
                <span>{cat?.name}</span>
                <span className="deselect-x">X</span>
              </div>
            );
          })}
        </div>

        {!isMinRequiredSatisfied && (
          <div className="min-categories-error">
            <AlertTriangle size={18} className="error-icon" />
            <span>Minimum 3 category required</span>
          </div>
        )}
      </div>

      <div className="categories-right">
        <div className="categories-grid">
          {CATEGORIES_DATA.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isSelected={selected.includes(cat.id)}
              onToggle={handleToggle}
            />
          ))}
        </div>

        <button
          className="next-page-btn"
          disabled={!isMinRequiredSatisfied}
          onClick={handleNext}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Categories;
