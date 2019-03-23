$(document).ready(()=>{
    document.getElementById('button').addEventListener('click',(e)=>{
        e.preventDefault();
        const form = document.getElementById('create-form');
        var namePlayer = new Array(form.player1.value,form.player2.value,form.player3.value,form.player4.value);
        $.ajax({
            url: "/",
            type: 'POST',
            data: {
                player: JSON.stringify(namePlayer) ,
            },
            success:(data)=>{
                window.location.href = `/games/${data.id}`;
            },
            error: (error)=>{
                console.log(error);
            }
        });
    });
});