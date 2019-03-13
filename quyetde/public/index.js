
$(document).ready(()=>{
    $.ajax({
        url:`/random-question`,
        type: 'GET',
        success: (data)=>{
            if(data.id != null){
                document.getElementById('question').innerText = data.content;

                //listen click
                
                document.getElementById('vote-yes').addEventListener('click',()=>{
                    $.ajax({
                        url: `/vote/${data.id}/yes`,
                        type: 'GET',
                        success: (data1)=>{
                            window.location.href = `/result/${data.id}`;
                        },
                        error: ()=>{
                            console.log(error);
                        },
                    });
                });
                
                document.getElementById('vote-no').addEventListener('click',()=>{
                    $.ajax({
                        url: `/vote/${data.id}/no`,
                        type: 'GET',
                        success: (data1)=>{
                            window.location.href = `/result/${data.id}`;
                        },
                        error: ()=>{
                            console.log(error);
                        },
                    });
                });

                document.getElementById('question-result').addEventListener('click',()=>{
                    window.location.href = `/result/${data.id}`;
                });

                document.getElementById('other-question').addEventListener('click',()=>{
                    window.location.reload();
                });

            }else{
                document.getElementById('question').innerText = 'Not Found!';
            }
        },
        error: (error)=>{
            console.log(error);
        },
    });
});