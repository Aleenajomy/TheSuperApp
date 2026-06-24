import React from "react";

const CategoryCard = ({ category, isSelected, onToggle }) => {
  return (
    <div
      className={`category-card ${isSelected ? "selected" : ""}`}
      style={{ backgroundColor: category.color }}
      onClick={() => onToggle(category.id)}
    >
      <h3 className="category-title">{category.name}</h3>
      <div className="category-image-container">
        <img
          src={category.image}
          alt={category.name}
          className="category-image"
        />
      </div>
    </div>
  );
};

export default CategoryCard;
