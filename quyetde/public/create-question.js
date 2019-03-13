console.log('loentung')
$(document).ready(()=>{
    // find element
    const textArea = document.getElementById('content');
    // .addEventListener()
    textArea.addEventListener('input',(event)=>{
        const contentLength = textArea.value.length;
        console.log(contentLength);
        const remainCharacters = document.getElementById('remain-characters');
        remainCharacters.innerText = `${200-contentLength} characters left`;
    });

    document.getElementById('create-form').addEventListener('submit',(e)=>{
        
        //hanh dong mac dinh bo qua click, phu thuoc element, cancel hanh dong mac dinh
        e.preventDefault();
         //get question content
        const form = document.getElementById('create-form');
        const questionContent = form.content.value;
        if(!questionContent){
            document.getElementById('error-message').innerText = 'Please Input Question';
        }else{
            $.ajax({
                url: '/create-question',
                type: 'POST',
                data: {
                    content: questionContent,
                },
                success: (data)=>{
                    if(data.id!=null){
                        window.location.href = `/result/${data.id}`;
                    }
                },
                error: (error)=>{
                    window.alert('Fail to create question');
                },
            });
        }
    });
});
