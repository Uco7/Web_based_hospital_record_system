document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('ul li');
    let active = document.querySelector('.active');

    navItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.classList.add('active');
            active.classList.remove('active');
            active = item;
        });
        item.addEventListener('mouseout', () => {
            if (item !== active) {
                item.classList.remove('active');
            }
        });
    });
    });

   

    $(document).ready(function() {
      $("#purchase_card > a").click(function(event) {
          event.preventDefault();
          $(".buycard").css("display", "block");
          $("#ftb").css("display", "none");
          $("#testTb").css("display", "none");
          $("#cardTb").css("display", "none");
      });
  
      $("#test-result > a").click(function(event) {
          event.preventDefault();
          $(".buycard").css("display", "none");
          $(".ftb").css("display", "none");
          $(".testTb").css("display", "block");
          $(".cardTb").css("display", "none");
      });
  
      $("#patient-cards > a").click(function(event) {
          event.preventDefault();
          $(".buycard").css("display", "none");
          $(".ftb").css("display", "none");
          $(".testTb").css("display", "none");
          $("#cardTb").css("display", "block");
      });
  });
  
document.getElementById('cardForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const formData = new FormData(this);

    // Convert FormData to JSON object
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    try {
      // Send POST request to the server
      const response = await fetch('/labTech/submit/card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObject)
      });

      const result = await response.json();

      if (response.ok) {
        // Handle success
        alert('Card submitted successfully!');
        // Optionally, redirect or clear the form
        // window.location.href = '/success';
        // document.getElementById('cardForm').reset();
      } else {
        // Handle error
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
    }
  });
  function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    document.getElementById("mySidenav").style.height = "40%";
    document.getElementById("main").classList.add("open"); // Add class to push down
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").classList.remove("open"); // Remove class to return to original position
  }
