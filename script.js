function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  // Toggle Love Letter visibility
  function toggleMessage() {
    const fullMessage = document.getElementById("fullMessage");
    if (fullMessage.style.display === "block") {
        fullMessage.style.opacity = "0";
        setTimeout(() => {
            fullMessage.style.display = "none";
        }, 500);
    } else {
        fullMessage.style.display = "block";
        setTimeout(() => {
            fullMessage.style.opacity = "1";
        }, 50);
    }
  }
  
  // Gallery Slider
  let currentIndex = 0;
  const gallery = document.querySelector(".gallery");
  const images = document.querySelectorAll(".gallery img");
  const totalImages = images.length;
  
  function updateGallery() {
    const imageWidth = images[0].clientWidth + 20; // Corrected image width
    gallery.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
  }
  
  function prevSlide() {
    currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
    updateGallery();
  }
  
  function nextSlide() {
    currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
    updateGallery();
  }
  
  window.addEventListener("resize", updateGallery);
  
  // Toggle event details correctly
  function toggleDetails(eventId) {
    const details = document.getElementById(`event${eventId}-details`);
    if (details.style.display === "block") {
        details.style.display = "none";
    } else {
        details.style.display = "block";
    }
  }
  
  // Countdown Timer
  const targetDate = new Date("February 14, 2025 00:00:00").getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
  
    if (distance < 0) {
        document.getElementById("timer").innerHTML = "Happy Valentine's Day! ❤️";
        return;
    }
  
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    document.getElementById("timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  
  setInterval(updateCountdown, 1000);
  updateCountdown();
  
  
  document.addEventListener("DOMContentLoaded", () => {
    const texts = [
        "Welcome to Our Special Page, My Love ❤️",
        "This is a page where we remember our moments together.",
        "I Love You 💗",
         "Enjoy Love"
  
    ];
  
    let currentIndex = 0;
    const heading = document.getElementById('homepage-heading');
    const paragraph = document.getElementById('homepage-paragraph');
    
    function typeText(element, text, speed, callback) {
        let i = 0;
        element.style.visibility = 'visible'; // Make the element visible
        element.innerHTML = ""; // Clear the content
        function typingEffect() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typingEffect, speed); // Continue typing the next character
            } else {
                setTimeout(callback, 1000); // Wait 1 second after typing finishes before calling the callback
            }
        }
        typingEffect();
    }
  
    function cycleTexts() {
        // Clear the text before starting to type a new message
        heading.innerHTML = "";
        paragraph.innerHTML = "";
  
        // Determine which element to type in (heading or paragraph)
        let elementToType = (currentIndex % 2 === 0) ? heading : paragraph;
  
        // Start typing the next message
        typeText(elementToType, texts[currentIndex], 100, () => {
            // After typing finishes, hide the element before the next cycle
            elementToType.style.visibility = 'hidden';
            currentIndex = (currentIndex + 1) % texts.length; // Move to the next message in the array
            setTimeout(cycleTexts, 1000); // Wait for 1 second before the next cycle starts
        });
    }
  
    // Start the loop
    cycleTexts();
  });
  
  document.getElementById("imageInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:3000/upload", {  // Ensure this matches your backend URL
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server Response:", data);

        if (data.url) {
            // Show success message
            document.getElementById("uploadMessage").textContent = "Image uploaded successfully!";
            document.getElementById("uploadMessage").style.display = "block";

            // Create a new image element for the gallery
            const newImage = document.createElement("img");
            newImage.src = data.url;
            newImage.alt = "Uploaded Memory";
            newImage.style.width = "200px";
            newImage.style.margin = "10px";

            // Append the image to the gallery container
            document.querySelector(".gallery").appendChild(newImage);
        } else {
            document.getElementById("uploadMessage").textContent = "Upload failed!";
            document.getElementById("uploadMessage").style.color = "red";
            document.getElementById("uploadMessage").style.display = "block";
        }
    })
    .catch(error => {
        console.error("Upload error:", error);
        document.getElementById("uploadMessage").textContent = "Upload failed!";
        document.getElementById("uploadMessage").style.color = "red";
        document.getElementById("uploadMessage").style.display = "block";
    });
  });
