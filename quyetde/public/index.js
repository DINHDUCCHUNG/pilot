
$(document).ready(()=>{
    const questionId = 2;
    $.ajax({
        url:`/get-question-by-id?questionId=${questionId}`,
        type: 'GET',
        success: (data)=>{
            document.getElementById('question').innerText = data.content;
        },
        error: (error)=>{
            console.log(error);
        },
    });
});