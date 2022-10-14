import {getApiData} from './api2.js';

const data = await getApiData("CULTURE",1,60,""); 
console.log('cultureData:',data);

console.log(data[0].PLACE);

const Localdata = await getApiData('KAKAO_LOCAL',"","",data[0].PLACE); // KAKAO LOCAL API 접속 데이터 받아 오기
console.log(Localdata[0].x,Localdata[0].y); // 받아온 장소의 x(경도), y(위도) 데이터 확인 ex) 세종문화회관 좌표 


Map( Localdata[0].x,Localdata[0].y);

function Map(x,y){
    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(y,x), //지도의 중심좌표.
        level: 4 //지도의 레벨(확대, 축소 정도)
    };
    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    // 마커가 표시될 위치입니다 
    var markerPosition  = new kakao.maps.LatLng(Localdata[0].y, Localdata[0].x); 
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
    // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
    // marker.setMap(null);    

}











