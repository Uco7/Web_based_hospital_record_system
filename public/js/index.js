

document.addEventListener("DOMContentLoaded", function(){
    document.querySelector("#bookBtn").addEventListener("click",function(e){
        e.preventDefault();
        const form=document.querySelector("#appointment");
        const formData=new FormData(form)
        const formObject={}
        formData.forEach((value,key)=>{
            formObject[key]=value
        })
        console.log("form object",formObject)
        fetch(`/reg/appointment`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formObject)
        }).then(response=>response.json()).then(data=>{
            if(data.status==="success"){
                console.log("data saved",data)
                alert("appointment Booked")
              window.location.reload

            }else{
                alert("failed to save data",data.message)
            }
        }).catch(error=>{
            alert("response failed",error)
        })
            
        
    })
    // 
})