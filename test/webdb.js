var express = require('express');
var app = express(); //express 는 함수 
app.use(express.static('public')); //public 이라는 정적 폴더를 서비스하기 위한 미들웨어 //app를 끄집어 내서 3개의 미들웨어를 설치 //app 는 객체 
app.use(express.bodyParser());
app.use(app.router);
//member list 전체 목록을 받는다. 
app.all('/list',function(request,response){ 
// console.log('멤버목록 출력');
// client.query('ksmart'); //ksmart라는 databse를 사용하겠다. 
 var sql = 'select * from member';
 client.query(sql,function(error,result){
// console.log(result); //정상적으로 결과가 나왔으면 result 출력 
    response.send(result)    //list를 요청하면 result를 데이타로 뿌린다.  //json방식으로 넘겨준다. 
 });
});
//멤버 추가
app.all('/add',function(request,response){
// console.log('멤버한명 추가');
 var id = request.param('id'); //데이터타입:문자
 var pw = request.param('pw');
 var name = request.param('name');
 var age = request.param('age');
 var gender = request.param('gender');
// console.log(id+","+pw+","+name+","+age+","+gender); //id값이 넘어왔는지 확인
 var sql = "insert into member(id,pw,name,age,gender)values(?,?,?,?,?)";
 client.query(sql,
  [id,pw,name,age,gender], //query에 입력된 값이 있으면 두번째 매개변수가 필요하다.
  function(error,result){    
  response.send(id);
 });
});
//멤버 삭제
app.all('/remove',function(request,response){
// console.log('멤버 삭제');
 var ck = request.param('ck'); //데이터타입:배열
// console.log(ck);
 for(var i=0; i<ck.length; i++){  //배열의 개수만큼 삭제문이 돌아가야함 
  var sql = 'delete from member where id=?';
  client.query(sql,[ck[i]],function(){});
 } 
 response.send(ck);
});
//멤버 수정
app.all('/modifyById',function(request,response){
// console.log('멤버한명 수정');
 var id = request.param('id');
 var pw = request.param('pw');
 var name = request.param('name');
 var age = request.param('age');
 var gender = request.param('gender');
 var sql = "update member set pw=?,name=?,age=?,gender=? where id=?";
 client.query(sql,
  [pw,name,age,gender,id],  //물음표 순서대로 
  function(error,result){
   response.send(id);
  });
});
http.createServer(app).listen(80,function(){  //http.createServer(app)의 결과물은 객체  //80번 포트를 열어서 쓰겠다.(80번을 허락받아야되니까 기다려야하기떄문에 start가 아닌 listen) 허락하면 ->이벤트 : 콜백함수 => 매개변수자리에 온다. 
 console.log('Server Running at http://127.0.0.1');
});


출처: https://chocobeans.tistory.com/entry/mysql데이터를-웹브라우저에서-출력하기 [keep moving keep living]
