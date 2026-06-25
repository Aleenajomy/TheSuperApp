import React from "react";

const CategoryCard = ({ category, isSelected, onToggle }) => {
  return (
    <div
      className={`card h-100 border border-4 cursor-pointer text-decoration-none shadow transition-transform`}
      style={{
        backgroundColor: category.color,
        borderColor: isSelected ? "#117506" : "transparent",
        borderRadius: "16px",
        cursor: "pointer",
        transition: "transform 0.2s, border-color 0.2s"
      }}
      onClick={() => onToggle(category.id)}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div className="card-body d-flex flex-column justify-content-between p-3" style={{ minHeight: "150px" }}>
        <h4 className="card-title fw-bold text-white mb-2 text-start" style={{ fontSize: "1.4rem" }}>
          {category.name}
        </h4>
        <div className="rounded overflow-hidden align-self-end w-100" style={{ height: "70px" }}>
          <img
            src={category.image}
            alt={category.name}
            className="w-100 h-100 object-fit-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
