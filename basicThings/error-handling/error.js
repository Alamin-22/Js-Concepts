function checkAge(){
    const AgeField= document.getElementById("age");
    const errorTag = document.getElementById("error")
    const ageText= AgeField.value;
    try{
        const age= parseInt(ageText);

        if(isNaN(age)){
            throw "Please Enter a valid number"
        }
        else if( age < 18){
            throw " bnaccha polapin not Allowed"
        }
        else if(age > 30){
            throw " murubbi ai khane aisen na   "
        }
        errorTag.innerHTML= "";
    }
    catch(err){
        console.log("Error:", err)
        errorTag.innerHTML= "Error:  " +   err;
        
    }
    finally{
        console.log("All done inside try catch")
    }
    console.log(1111)
}