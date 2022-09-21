
const multerSingleImage = document.querySelector('#multerSingleImage');
const ptImage = document.querySelector('.ptImage');

if(multerSingleImage){
    multerSingleImage.onchange = (e) => {
        const imgUrl = URL.createObjectURL(e.target.files[0]);
        ptImage.src = imgUrl
    }
}

const createFormData = document.querySelector('#createFormData');
const loading        = document.querySelector('#loading');

if(createFormData){
    createFormData.onsubmit = () => {
        loading.style.display = 'block';
    }
}


const userDelate = document.querySelector('#userDelate');

if(userDelate){
    userDelate.onclick = (e) => {
        if(confirm('Are you sure?') == false){
            return false
        }else{
            return true
        }

    }
}
