import {getCultureData, getSubwayData, getKakaoData} from './api.js';
        
const cultureData = await getCultureData('CULTURE')

console.log('cultureData:',cultureData);


// 분류할 데이터 객체
const kindData = {
    'festival' : [],
    'concert' : [],
    'exhibit' : [],
    'edu' : [],
    'el' : [],
};

//데이터 받아오기

const data = await test_api("culture",1,60,""); // parmeta 1,2(문화축제 더보기에서 시작 점),3(끝점),4(codename별로 새롭게 검색 가능 ex 연극 빈 곳으로 놔두면 전체 순번 )
console.log(data);


//데이터 종류별로 분류하기
data.forEach((v, i) => {
    
    if(v.CODENAME.includes('축제')) {
        kindData['festival'].push(v);
    } else if(v.CODENAME == '기타') {
        kindData['concert'].push(v);
    } else if(v.CODENAME == '문화교양/강좌') {
        kindData['exhibit'].push(v);
    } else if(v.CODENAME == '전시/미술') {
        kindData['edu'].push(v);
    } else {
        kindData['el'].push(v);
    }
})

console.log(kindData);


// nav 버튼 작업

const setActiveGnb = (kind) => {
    if (kind) {
        document.querySelectorAll('.gnb a').forEach((v, i) => {
            if(v.dataset.kind == kind) {
                console.log('v.dataset.kind',v.dataset.kind);
                v.classList.add('active');
            } else {
                v.classList.remove('active');
            }
        })
    }

}

const query = new URLSearchParams(location.search);
const kind = query.get('kind');
console.log('!!!', kind);
setActiveGnb(kind);

const currentList = kindData[`${kind}`];
console.log('@@@',currentList);

const container = document.querySelector('.main_container')

currentList.some((v, i) => {

    //3개만 노출되도록 설정
    if( i == 3 ) {
        return true;
    }

    // dom 요소 생성
    const item = document.createElement('div');
    item.classList.add('item');

    const a = document.createElement('a');
    a.setAttribute('href', '#');

    const img = document.createElement('img');
    img.setAttribute('src', `${v.MAIN_IMG}`);
    a.appendChild(img);

    const text = document.createElement('div');
    text.classList.add('item_text');
    
    const h2 = document.createElement('h2');
    h2.innerHTML = v.TITLE;
    
    const p1 = document.createElement('p');
    p1.innerHTML = v.DATE;

    const p2 = document.createElement('p');
    p2.innerHTML = v.PLACE;
    
    text.appendChild(h2);
    text.appendChild(p1);
    text.appendChild(p2);

    a.appendChild(text);

    const btnBox = document.createElement('div');
    btnBox.classList.add('btn_box');

    const btn1 = document.createElement('button');
    btn1.setAttribute('type', 'button');
    btn1.innerHTML = '지도';
    btnBox.appendChild(btn1);
    
    const btn2 = document.createElement('button');
    btn2.setAttribute('type', 'button');
    btn2.innerHTML = '길찾기';
    btnBox.appendChild(btn2);
    
    item.appendChild(a);
    item.appendChild(btnBox);

    container.appendChild(item);
    
})














