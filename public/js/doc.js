
document.addEventListener('DOMContentLoaded', () => {
  $(".docreg").click(function(event) {
    event.preventDefault();
    $("#doc-form").css("display", "block");
    $(".doc").css("display", "none");
    $(".appointment-tb").css("display", "none");
    $(".p-card").css("display", "none");
    $(".treatp-table").css("display", "none");
    
    });
  $(".appointment-li").click(function(event) {
    event.preventDefault();
    $(".appointment-tb").css("display", "block");
    $(".p-card").css("display", "none");
    $(".treatp-table").css("display", "none");
    $("#doc-form").css("display", "none");
    
    });
  const navItems = document.querySelectorAll('ul li');
  const active =document.querySelector('.active')

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
function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    document.getElementById("mySidenav").style.height = "40%";
    document.getElementById("main").classList.add("open"); // Add class to push down
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").classList.remove("open"); // Remove class to return to original position
  }
 


 