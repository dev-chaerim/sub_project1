import {test_api} from './api2.js';


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

currentList.forEach((v, i) => {
    const item = document.createElement('div');
    item.classList.add('item');

    const a = document.createElement('a');
    a.setAttribute('href', '#');

    const img = document.createElement('img');
    img.setAttribute('src', `${v.MAIN_IMG}`);
    a.appendChild(img);

    item.appendChild(a);

    container.appendChild(item);
    
})














