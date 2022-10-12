import {getCultureData, getSubwayData, getKakaoData} from './api.js';
        
const cultureData = await getCultureData('CULTURE')

console.log('cultureData:',cultureData);

const festival = '축제';
const concert = '공연';
const exhibit = '전시';
const edu = '교육/체험';
const el = '기타';

// 분류할 데이터 객체
const kindData = {
    '축제' : [],
    '공연' : [],
    '전시' : [],
    '교육/체험' : [],
    '기타' : [],
};

//데이터 종류별로 분류하기
cultureData.forEach((v, i) => {
    
    if(v.CODENAME.includes('축제')) {
        kindData['축제'].push(v);
    } else if(v.CODENAME == '기타') {
        kindData['기타'].push(v);
    } else if(v.CODENAME == '문화교양/강좌') {
        kindData['교육/체험'].push(v);
    } else if(v.CODENAME == '전시/미술') {
        kindData['전시'].push(v);
    } else {
        kindData['공연'].push(v);
    }
})

console.log(kindData['축제']);

const setActiveGnb = (kind) => {
    if (kind) {
        document.querySelectorAll('.gnb a').forEach((v, i) => {
            if(v.dataset.kind == kind) {
                v.classList.add('active');
            } else {
                v.classList.remove('active');
            }
        })
    }
}



const query = new URLSearchParams(location.search);
const kind = query.get('kind');
console.log(kind);
setActiveGnb(kind);

const currentList = kindData[kind];

const container = document.querySelector('.main_container')





