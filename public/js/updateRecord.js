


const patientBtn=document.querySelector(".updatePatientBtn")
if(patientBtn){
    patientBtn.addEventListener("click", function(e) {
        e.preventDefault();
        const updatePatientRecords = document.getElementById("updateRecords");
    
    
    
        // Convert FormData to JSON
        const formData = new FormData(updatePatientRecords);
        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });
    
        const patientId = formDataObj.patientId;
    
        // Debugging to check form data
        console.log('FormData as JSON:', formDataObj);
    
        fetch(`/api/admin/update/patient/${patientId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDataObj)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert("Data updated successfully");
            } else {
                alert("Failed to update data: " + data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while updating the data.");
        });
    });

};


const  staffBtn=document.querySelector(".staffBtn")
if(staffBtn){
    staffBtn.addEventListener("click", function(e) {
        e.preventDefault();
        
        const updateStaff = document.getElementById("staffForm");
        const formData = new FormData(updateStaff);
        const formObject = {};
        
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        console.log("Form Object:", formObject);
        
        const staffId = formObject.staffId;
        console.log("Staff ID:", staffId);
        
        fetch(`/api/admin/update/staff/${staffId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        })
        .then(response => {
          
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                alert("Updated successfully");
            } else {
                alert("Error updating record: " + data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to update record: " + (error.message || "Unknown error"));
        });
    });
};

const testResultBtn=document.querySelector(".testResultBtn")
if(testResultBtn){
    testResultBtn.addEventListener("click",function(e){
        e.preventDefault();
        const updateTestResult=document.getElementById("updateTestResult")
        const formData=new FormData(updateTestResult)
        const formObject={}
        formData.forEach((value,key)=>{
            formObject[key]=value
        })
        const testId=formObject.testId;
       console.log("test result id",testId)
        console.log("form data",formObject);
        fetch(`/api/admin/update/test/results/${testId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("Updated successfully");
            } else {
                alert("Error updating record: " + data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to update record: " + (error.message || "Unknown error"));
        });
        
    })
}



