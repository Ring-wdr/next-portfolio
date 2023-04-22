export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-cc align-ic mt-3">
      <h2 className="mb-3 font-20">404 Not Found</h2>
      <i
        className="ri-error-warning-fill mb-2"
        style={{ fontSize: "10rem" }}
      ></i>
      <p>Could not find requested resource</p>
    </div>
  );
}
