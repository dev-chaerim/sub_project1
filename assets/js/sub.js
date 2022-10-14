import {getApiData} from './api2.js';

const data = await getApiData("CULTURE",1,60,""); 
console.log('cultureData:',data);

console.log(location.search);

const queryIndex = location.search.substring(1);
console.log(queryIndex);

console.log(data[queryIndex]);


const Localdata = await getApiData('KAKAO_LOCAL',"","",data[queryIndex].PLACE); // KAKAO LOCAL API 접속 데이터 받아 오기
console.log(Localdata);
console.log(Localdata[0].x,Localdata[0].y); // 받아온 장소의 x(경도), y(위도) 데이터 확인 ex) 세종문화회관 좌표 

Map( Localdata[0].x,Localdata[0].y);

const subcontainer = document.querySelector('.sub_container')

const img = document.createElement('img');
img.setAttribute('src', `${data[queryIndex].MAIN_IMG}`);
subcontainer.appendChild(img);

const h2_TITLE = document.createElement('h2');
h2_TITLE.innerHTML = data[queryIndex].TITLE;
subcontainer.appendChild(h2_TITLE);

const h2_CODENAME = document.createElement('h2');
h2_CODENAME.innerHTML = data[queryIndex].CODENAME;
subcontainer.appendChild(h2_CODENAME);

const h2_PLACE = document.createElement('h2');
h2_PLACE.innerHTML = data[queryIndex].PLACE;
subcontainer.appendChild(h2_PLACE);

const h2_USEFEE = document.createElement('h2');
h2_USEFEE.innerHTML = data[queryIndex].USE_FEE;
subcontainer.appendChild(h2_USEFEE);

const h2_TRGT = document.createElement('h2');
h2_TRGT.innerHTML = data[queryIndex].USE_TRGT;
subcontainer.appendChild(h2_TRGT);



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










