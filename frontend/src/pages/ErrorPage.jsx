import "./ErrorPage.css";

function ErrorPage() {
  return (
    <section className="errorpage-container">
      <div className="banner">
        <img src="404.png" alt="404-Banner" />
      </div>
      <div className="content">
        <h1>Something's missing.</h1>
        <p>The requested page is not found!</p>
        <a href="/">Go to Home</a>
      </div>
    </section>
  );
}

export default ErrorPage;
