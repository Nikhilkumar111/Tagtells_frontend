const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      alert("Category name cannot be empty.");
      return;
    }

    // ✅ Prevent sending undefined or blank strings
    setValue(trimmedValue);
    handleSubmit(e);
  };

  return (
    <div className="p-3">
      <form onSubmit={handleFormSubmit} className="space-y-3">
        <input
          type="text"
          className="py-3 px-4 border rounded-lg w-full focus:ring focus:ring-pink-300 focus:outline-none"
          placeholder="Write category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex justify-between gap-3">
          <button
            type="submit"
            className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50"
          >
            {buttonText}
          </button>

          {handleDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (window.confirm("Are you sure you want to delete this category?")) {
                  handleDelete();
                }
              }}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
