
/** KAKAO REST KEY*/
const SUBWAY_URL = 'http://apis.data.go.kr/1613000/SubwayInfoService/getKwrdFndSubwaySttnList?'
const SUBWAY_REST_KEY = 'FBNGXh7WiDx75giQGr3STbhDglMlW0OCQwfrIFk9H2P4uC/j9oEB8q37tRxpWHaZRbbEXCWO5vehlXTNzzlHCQ=='
const SUBWAY_NAME = '서울역';   

const CULTURE_URL = 'http://openapi.seoul.go.kr:8088/';
const CULTURE_REST_KEY = '596d734a65646c7333367749686247'

const CULTURE_CODENAME  = "";
const KAKAO_REST_KEY = '0ec224f87893bd9a115d82797a7bc8b6';

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

async function test_api(api,start,end,data){  
    let json = null;
    let dataArry = null;
    if(api === "culture"){
        try{
            const response = await axios.get(`${CULTURE_URL}` + `${CULTURE_REST_KEY}`+'/json/culturalEventInfo/'+`${start}`+'/'+ `${end}`+ '/' + data);                
            dataArry= response.data;
            json = dataArry.culturalEventInfo.row;
        }catch(e){
            console.error(e);
            alert('요청을 처리하는데 실패했습니다.');
            return;
        } 
    } else if(api ==="subway"){
        const response1 = await axios.get('http://apis.data.go.kr/1613000/SubwayInfoService/getKwrdFndSubwaySttnList',{
            params : {
                serviceKey : `${SUBWAY_REST_KEY}`,
                subwayStationName : data,
                numOfRows : 10,
                pageNo : 1,
                _type : 'json',
            },
            headers : {
            },
        });
        dataArry = response1.data;
        json = dataArry.response.body.items.item;
    } else if (api ==='kakao'){
        const response2 = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json',{
            params : {
                query : data,
            },
            headers : {
                Authorization : `KakaoAK ${KAKAO_REST_KEY}`,
            },
        }); 
        dataArry =  response2.data;
        json = dataArry.documents[0];
    }

        return json;
}
