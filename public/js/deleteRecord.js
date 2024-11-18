

document.querySelectorAll(".deletePatientBtn").forEach(button => {
    button.addEventListener("click", function(e) {
        e.preventDefault();
        const recordId = this.getAttribute("data-id");
        console.log("Data ID:", recordId);

        if (confirm("Do you want to delete this record?")) {
            fetch(`/api/admin/delete/patient/${recordId}`, {
                method: "DELETE"
            })
            .then(response => {
                return response.json();  // Correctly handle JSON parsing
            })
            .then(data => {
                if (data.status === "success") {
                    console.log("Record deleted successfully");
                    alert("Record deleted successfully");
                    location.reload();  // Reload the page after deletion
                } else {
                    console.log("Failed to delete record:", data.error);
                    alert("Failed to delete record: " + data.error);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Operation failed");
            });
        }
    });
});
document.querySelectorAll(".deleteStaffBtn").forEach(button=>{
    button.addEventListener("click",function(e){
        e.preventDefault();
        const staffId=this.getAttribute("data-id");
        console.log("staff btn",staffId);
        if(confirm("do you want to delete this record?")){
            fetch(`/api/admin/delete/staff/${staffId}`,{
                method:"DELETE"
            }).then(response=> response.json())
            .then(data=>{

                if(data.status==="success"){
                    console.log("record deleted");
                    alert("record deleted successfull");
                    

                }
                else{
                    console.log("failed to delete record",data.error);
                    alert("error deleting record",data.error);
                }
            }
            ).catch(error=>{ 
                console.log("error",error);
                
                alert(error);
            })
        }
        

    })

})

document.addEventListener('DOMContentLoaded', function () {
    // Select all delete buttons
    const deleteButtons = document.querySelectorAll('.deleteTestBtn');

    deleteButtons.forEach(button => {
      button.addEventListener('click', function (e) {
        e.preventDefault();

        const recordId = this.getAttribute('data-id');
        const row = this.closest('tr');

        if (confirm('Are you sure you want to delete this record?')) {
          // Send DELETE request to the server
          fetch(`/api/admin/delete/test/results/${recordId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            if (response.ok) {
              alert('Record deleted successfully.');
              // Remove the row from the table
              row.remove();
            } else {
              alert('Failed to delete the record.');
            }
          })
          .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
          });
        }
      });
    });
  });
    

