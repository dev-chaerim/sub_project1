import {getApiData} from './api2.js';

const data = await getApiData("CULTURE",1,60,""); 
// console.log('cultureData:',data);
// console.log(location.search);

const queryIndex = location.search.substring(1);
// console.log(queryIndex);
console.log(data[queryIndex]);


//상세페이지 dom 요소 생성
const subcontainer = document.querySelector('.sub_container')

const img = document.createElement('img');
img.setAttribute('src', `${data[queryIndex].MAIN_IMG}`);
subcontainer.appendChild(img);

const detailCon = document.createElement('div');
detailCon.classList.add('sub_detail');

//목차 리스트 배열로 집어넣기
let arr = ['공연/행사명', '분류', '날짜/시간', '이용요금', '장소', '이용대상']

arr.forEach((v, i) => {
    const detailItem = document.createElement('div');
    detailItem.classList.add('sub_detail_item');

    const subList = document.createElement('div');
    subList.classList.add('sub_list');
    detailItem.appendChild(subList);

    const subListCon = document.createElement('div');
    subListCon.classList.add('sub_list_content');
    const h2 = document.createElement('h2');
    subListCon.appendChild(h2);
    detailItem.appendChild(subListCon);

    const listName = document.createElement('h2');
    listName.innerHTML = v;
    subList.appendChild(listName);
    
    detailCon.appendChild(detailItem);
})

subcontainer.appendChild(detailCon);

//필요한 상세 데이터 배열로 추출
if(data[queryIndex].USE_FEE == "") {
    data[queryIndex].USE_FEE = " - ";
}
let detailArr = [data[queryIndex].TITLE, data[queryIndex].CODENAME, data[queryIndex].DATE, data[queryIndex].USE_FEE, data[queryIndex].PLACE, data[queryIndex].USE_TRGT, ]
//화면에 넣어주기
document.querySelectorAll('.sub_list_content h2').forEach((v, i) => {
    v.innerHTML = detailArr[i];
});



// 카카오 api 데이터 받아오기
const Localdata = await getApiData('KAKAO_LOCAL',"","",data[queryIndex].PLACE); // KAKAO LOCAL API 접속 데이터 받아 오기
// console.log(Localdata);
// console.log(Localdata[0].x,Localdata[0].y); // 받아온 장소의 x(경도), y(위도) 데이터 확인 ex) 세종문화회관 좌표 
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










