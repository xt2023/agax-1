$(function() {
  // 初始化右侧滚动条
  // 这个方法定义在scroll.js中
resetui();

//为按钮绑定鼠标点击事件
$('#btnSend').on('click',function (){
    var text=$('#ipt').val().trim();
    if(text.length<=0){
        return $('#ipt').val('')
    }

//    将用户输入的内容追加到页面上
$('#talk_list').append('<li class="right_word">\n'+'<img src="img/person02.png"/><span>'+text+'</span>\n'+'</li>')
    $('#ipt').val('');
    //重置滚动条
    resetui();
    //发起请求，获取聊天内容
    getMsg(text)
})

//    获取聊天机器人发送回来的消息
function getMsg(text){
    $.ajax({
        method:'GET',
        url:'http://www.liulongbin.top:3006/api/robot',
        data:{
            spoken:text
        },
        success:function (res){
            console.log(res)
            if(res.message==='success'){
                //    接收聊天消息、
                var msg=res.data.info.text
                $('#talk_list').append('<li class="left_word">\n' + '<img src="img/person01.png" /> <span>'+msg+'</span>\n'+'</li>')
                resetui();
            //    调用getVoice函数，使文本转化为语音
                getVoice(msg)
            }

        }
    })
}

function getVoice(text){
    $.ajax({
        method: 'GET',
        url:'http://www.liulongbin.top:3006/api/synthesize',
        data:{
            text:text
        },
        success:function (res){
            console.log(res)
            if(res.status===200){
            //    播放语音
                $('#voice').attr('src',res.voiceUrl)
            }
        }
    })
}


//给input绑定回车事件
$('#ipt').on('keyup',function (e){
    if (e.keyCode===13){
        $('#btnSend').click()
    }
})

})
