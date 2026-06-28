function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    document.getElementById("mySidenav").style.height = "40%";
    document.getElementById("main").classList.add("open"); // Add class to push down
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").classList.remove("open"); // Remove class to return to original position
  }

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
    });
    $(".appointment").click(function(event) {
      event.preventDefault();
      $(".lab-tb1").css("display", "none");
      $(".lab-appointment-tb").css("display", "block");
      
      });
    $(".appointment").click(function(event) {
      event.preventDefault();
      $(".card-tb").css("display", "none");
      $(".card-rec").css("display", "none");
      $(".treatp-table").css("display", "none");
      $(".regp-table").css("display", "none");
      $(".ptest-table").css("display", "none");
      $(".lab-appointment-tb").css("display", "block");
      
      });
    $(".appointment").click(function(event) {
      event.preventDefault();
      $(".result-tb").css("display", "none");
      $(".lab-appointment-tb").css("display", "block");
      
      });
