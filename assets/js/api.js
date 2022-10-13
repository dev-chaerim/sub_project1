const SUBWAY_URL = 'http://apis.data.go.kr/1613000/SubwayInfoService/getKwrdFndSubwaySttnList?'
const SUBWAY_REST_KEY = 'FBNGXh7WiDx75giQGr3STbhDglMlW0OCQwfrIFk9H2P4uC/j9oEB8q37tRxpWHaZRbbEXCWO5vehlXTNzzlHCQ=='
const SUBWAY_NAME = '서울역';   

const CULTURE_URL = 'http://openapi.seoul.go.kr:8088/';
const CULTURE_REST_KEY = '596d734a65646c7333367749686247'
const CULTURE_STRAT = 1;
const CULTURE_END   = 60;
const CULTURE_CODENAME  = "";

const KAKAO_REST_KEY = '0ec224f87893bd9a115d82797a7bc8b6';
const KAKAO_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json'


/** key, url 받아오기 */

function getApiKey(key) {
    let KeyValue = "";
    if(key === "CULTURE"){
        KeyValue = CULTURE_REST_KEY;
    } else if(key === "SUBWAY"){
        KeyValue = SUBWAY_REST_KEY;
    } else if(key === "KAKAO_LOCAL"){
        KeyValue = KAKAO_REST_KEY;
    }
    return KeyValue;
}

function getApiUrl(urlName) {
    let url = "";
    if(urlName === "CULTURE"){
        url = CULTURE_URL;
    } else if(urlName === "SUBWAY"){
        url = SUBWAY_URL;
    } else if(urlName === "KAKAO_LOCAL"){
        url = KAKAO_URL;
    }
    return url;
}


/** 문화정보 데이터 */

async function getCultureData(data){ 
    let json = null;
    const key = getApiKey(data);
    const url = getApiUrl(data);
    try {
        const response = await axios.get(`${url}` + `${key}`+'/json/culturalEventInfo/'+`${CULTURE_STRAT}`+'/'+ `${CULTURE_END}`);  
        json = response.data;
        // console.log(json)
    } catch(e){
        console.error(e);
        alert('요청을 처리하는데 실패했습니다.');
        return;
    }

    return json.culturalEventInfo.row;  
}


/** 지하철 데이터 */
async function getSubwayData(data, stationName) {
    let json = null;
    const key = getApiKey(data);
    const url = getApiUrl(data);

    try {
        const response = await axios.get(url, {
            params: {
                serviceKey: key,
                subwayStationName : stationName,
            },
        });
        json = response.data.response.body.items.item;
        // console.log(json);
    } catch (e) {
        console.error(e);
        alert('요청을 처리하는데 실패했습니다.')
        return;
    }

    return json;

}

/** 카카오 로컬 데이터 */
async function getKakaoData(data, place) {
    let json = null;
    const key = getApiKey(data);
    const url = getApiUrl(data);

    try {
        const response = await axios.get(url,{
            params : {
                query : place,
            },
            headers : {
                Authorization : `KakaoAK ${key}`,
            },
        });

        json = response.data.documents;
        // console.log(json);
    } catch (e) {
        console.error(e);
        alert('요청을 처리하는데 실패했습니다.')
        return;
    }

    return json;
}


export { getCultureData, getSubwayData, getKakaoData };
