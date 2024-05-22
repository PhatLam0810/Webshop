
    function toast({title ='' , message = '' , type = 'info' , duration = 2000}){
    const main = document.getElementById('toast');
    if (main){
        const toast = document.createElement('div');
        const icons ={
            success : 'fas fa-solid fa-check'
            //error : ( thay doi các icon)
        }
        const icon = icons[type];
        toast.classList.add('toast',`toast-${type}`); //set type success hoặc error cho box
        toast.onclick = function(e){
            if(e.target.closest('.toast-close')){
                main.removeChild(toast);
            }
        }
        // const delay = (duration / 1000).toFixed(2);
        // toast.style.animation =`slideInLeft ease .3s, fadeOut linear 1s ${delay}s forward;`;
        toast.innerHTML= ` 
            <div class="toast-icon" ><i class="${icon}"></i></div>
            <div class="toast-body">
            <h3 class="toast-success">${title}</h3>
            <p class="toast-msg">${message}</p>
            </div>
            <div class="toast-close"><i class="fa-solid fa-xmark"></i></div>
        `
        main.appendChild(toast);
        setTimeout(function(){
            if (main.contains(toast))
            {
            main.removeChild(toast);
            }
        },duration + 1000);
    }

}
    function Success(){
        toast({
        title: 'Success',
        message : 'Bạn đã thêm mặt hàng thành công',
        type : 'success',
        duration: 2000,
    })
    }