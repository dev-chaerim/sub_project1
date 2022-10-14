import {getApiData} from './api2.js';

const data = await getApiData("CULTURE",1,60,""); 
// console.log('cultureData:',data);
// console.log(location.search);

const queryIndex = location.search.substring(1);
// console.log(queryIndex);
console.log(data[queryIndex]);

console.log(data[queryIndex].PLACE);
let PlaceSearch = 0;
PlaceSearch = data[queryIndex].PLACE.search(/[(,.0-9]/g); //문화축제 api에서 장소에서 특문 및 숫자를 찾기 위한 정규식 
//const p1 = data[queryIndex].PLACE.indexOf("(");
console.log("정규표현식 : " , PlaceSearch);

let LocalPlace = 0;         // 여러번 사용하기 위해 let 변수 사용 
LocalPlace = PlaceSearch == -1 ? data[queryIndex].PLACE.substring(0,data[queryIndex].PLACE.length) : data[queryIndex].PLACE.substring(0,PlaceSearch);        // 문화축제 api PLACE 파싱 주소에 검출된 특문과 숫자 이전 까지
/******************************************************** */

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

/**************************************************** */
// 카카오 Local_API 데이터 생성 및 지도 생성
let Localdata = 0;
console.log(LocalPlace)
Localdata =  await getApiData('KAKAO_LOCAL',"","",LocalPlace); //  KAKAO LOCAL API 접속 데이터 받아 오기
console.log("Local : " , Localdata);
// LocalPlace에서 파싱 후 KAKAO_LOCAP API에 전달한 검색어에서 오류가 있어 다시 한번 데이터 받아 오기 
if(Localdata.length == 0)      
{
    PlaceSearch = data[queryIndex].PLACE.indexOf(" ");
    LocalPlace = data[queryIndex].PLACE.substring(0,PlaceSearch);
    Localdata =  await getApiData('KAKAO_LOCAL',"","",LocalPlace); // KAKAO LOCAL API 접속 데이터 받아 오기
}
const Latitude = Localdata[0].y ;  // 위도
const Longitude = Localdata[0].x;   // 경도

Map(Latitude,Longitude);            // 카카오맵 API를 이용해 지도 생성 및 축제 마커 표시 함수 

function Map(x,y){
    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(x,y), //지도의 중심좌표.
        level: 4 //지도의 레벨(확대, 축소 정도)
    };
    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    // 마커가 표시될 위치입니다 
    var markerPosition  = new kakao.maps.LatLng(x, y); 
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
    // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
    // marker.setMap(null);    

}












