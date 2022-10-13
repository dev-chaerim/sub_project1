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

//데이터 종류별로 분류하기
cultureData.forEach((v, i) => {
    
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


const setActiveGnb = (kind) => {
    if (kind) {
        document.querySelectorAll('.gnb a').forEach((v, i) => {
            if(v.dataset.kind == kind) {
                v.classList.add('active');
                console.log(v)
            } else {
                v.classList.remove('active');
            }
        })
    }
}


console.log(location.search)
const query = new URLSearchParams(location.search);
const kind = query.get('kind');
setActiveGnb(kind);

const currentList = kindData[`${kind}`];
console.log(currentList);

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





