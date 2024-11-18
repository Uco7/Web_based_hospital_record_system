
document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('ul li');
  let active =document.querySelector('.active')

  navItems.forEach(item => {
    item.addEventListener('mouseover', () => {
      item.classList.add('active');
      active.classList.remove('active');
      active=item;
      
    });
    item.addEventListener('mouseout', () => {
      if (item!==active) {
        item.classList.remove('active' )
        
      }
      active.addEventListener('mouseover',()=>{
        active.classList.add('active');
      })
      
    });
  });

  $(document).ready(function() {
    $("#pRec").click(function(event) {
      event.preventDefault();
      $(".p-rec").css("display", "block");
      $(".card-rec").css("display", "none");
      $(".rec").css("display", "none");
    });
  
    $(".appointment").click(function(event) {
      event.preventDefault();
      $(".appointment-tb").css("display", "block");
      $(".all-tb").css("display", "none");
      $(".card-tb").css("display", "none");
      $(".prec-tb").css("display", "none");
      $(".regp-tb").css("display", "none");
      $(".regs-tb").css("display", "none");
    });
  });
  
});
  // Function to create pagination for any table
  function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    document.getElementById("mySidenav").style.height = "40%";
    document.getElementById("main").classList.add("open"); // Add class to push down
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").classList.remove("open"); // Remove class to return to original position
  }
  $(document).ready(function() {
    // Handle click on appointment link
    $(".appointent").click(function(event) {
      event.preventDefault(); // Prevent default behavior (e.g., following a link)
      
      // Hide the 'all-tb' section and show the 'appointment-tb' section
      $(".appointment-tb").css("display", "block");
      $(".all-tb").css("display", "none");
      $(".card-tb").css("display", "none");
      $(".prec-tb").css("display", "none");
      $(".regp-tb").css("display", "none");
      $(".regs-tb").css("display", "none");
    });
  });
  