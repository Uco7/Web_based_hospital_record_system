document.getElementById('testResultForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Create a FormData object from the form
    const formData = new FormData(event.target);
    
    // Convert FormData to a plain JavaScript object
    const data = Object.fromEntries(formData.entries());
    
    // Log data to verify the format (optional)
    console.log('Form data:', data);

    try {
        // Send the data to the backend
        const response = await fetch('/labTech/submit/test/result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (response.ok) {
            alert('Form submitted successfully!');
            // Optionally, handle successful submission (e.g., redirect, clear form, etc.)
            setTimeout()
        } else {
            alert('Error submitting form: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
    }
});

// Initialize the navigation menu
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('ul li');
    let active = document.querySelector('.active');

    navItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.classList.add('active');
            if (active && active !== item) {
                active.classList.remove('active');
            }
            active = item;
        });
        item.addEventListener('mouseout', () => {
            if (item !== active) {
                item.classList.remove('active');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
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

