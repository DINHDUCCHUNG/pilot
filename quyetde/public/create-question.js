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
});
$('#send').click(()=>{
    $.ajax({
        url: '/create-question',
        type: 'POST',
        data: {
            content: textArea.value
        },
        success:(data)=>{
            window.location.assign(data.url);
        },
        error:(error)=>{
            console.log(error);
        },
        
    })
})
