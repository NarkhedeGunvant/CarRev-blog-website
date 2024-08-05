// scripts.js
document.addEventListener("DOMContentLoaded", () => {
    const blogTitle = document.getElementById("blog-title");
    const backToTopButton = document.getElementById("back-to-top");
    const commentForms = document.querySelectorAll(".comment-form");
    const searchButton = document.getElementById("search-button");
    const searchBar = document.getElementById("search-bar");
  
    // Refresh page to show all blogs
    blogTitle.addEventListener("click", () => {
      window.location.reload();
    });
  
    // Show/hide back-to-top button
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.style.display = "block";
      } else {
        backToTopButton.style.display = "none";
      }
    });
  
    // Back to top button functionality
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
    // Handle comment form submission and store comments in local storage
    commentForms.forEach((form) => {
      const postId = form.closest("article").id;
      const commentsContainer = form.nextElementSibling;
  
      // Load stored comments
      const storedComments = JSON.parse(localStorage.getItem(postId) || "[]");
      storedComments.forEach(comment => {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        commentElement.innerHTML = `<strong>${comment.name}</strong><p>${comment.text}</p>`;
        commentsContainer.appendChild(commentElement);
      });
  
      // Submit new comment
      form.addEventListener("submit", (event) => {
        event.preventDefault();
  
        const name = form.querySelector("input").value;
        const comment = form.querySelector("textarea").value;
  
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        commentElement.innerHTML = `<strong>${name}</strong><p>${comment}</p>`;
  
        commentsContainer.appendChild(commentElement);
  
        // Store comment in local storage
        const storedComments = JSON.parse(localStorage.getItem(postId) || "[]");
        storedComments.push({ name, text: comment });
        localStorage.setItem(postId, JSON.stringify(storedComments));
  
        form.reset();
      });
    });
  
    // Search bar functionality
    searchButton.addEventListener("click", () => {
      const query = searchBar.value.toLowerCase();
      const blogs = document.querySelectorAll("article");
  
      blogs.forEach(blog => {
        const title = blog.querySelector("h2").textContent.toLowerCase();
        if (title.includes(query)) {
          blog.style.display = "block";
        } else {
          blog.style.display = "none";
        }
      });
    });
  });
  