<style>
    #Tip{ position: absolute; left: 50%;top: 50%;z-index: 9999; width: 200px;height: 100px; margin-top: -50px;margin-left: -100px; }
    @keyframes hidden {
        100%   { opacity: 0.5;top:0}
    }
    .Tip{
        animation: hidden 10s forwards;
    }
</style>
<script>
function alerts(msg){
    console.log(msg);
    var node = $('#Tip');
    $('#Tip').text(msg).removeClass('hidden').addClass('Tip');
    setTimeout(function(){
        node.removeClass('Tip').addClass('hidden');
    }, 9000);
}
</script>

<div id="Tip" class="alert alert-danger hidden"></div>
