/**
 * title：模拟数据
 */
var res = {
    //title名是确定的
    "title": ["year", "distinct", "quota"],
    "year": [2017, 2018, 2019],
    "distinct": ["东城区", "西城区", "朝阳区", "海淀区"],
    "quota": ["常住人口(万人)", "教育人口", "出生人口数(人)", "人口死亡率(‰)"],
    //data名是确定的
    "data": {
        "2017朝阳区人口死亡率(‰)": "11",
        "2017西城区人口死亡率(‰)": "7",
        "2019海淀区常住人口(万人)": "44",
        "2019西城区出生人口数(人)": "38",
        "2017海淀区人口死亡率(‰)": "15",
        "2019朝阳区常住人口(万人)": "40",
        "2017海淀区出生人口数(人)": "14",
        "2018朝阳区人口死亡率(‰)": "27",
        "2019朝阳区出生人口数(人)": "42",
        "2019东城区教育人口": "33",
        "2019东城区出生人口数(人)": "34",
        "2017朝阳区教育人口": "9",
        "2018西城区出生人口数(人)": "22",
        "2018朝阳区教育人口": "25",
        "2019东城区常住人口(万人)": "32",
        "2019朝阳区教育人口": "41",
        "2019西城区常住人口(万人)": "36",
        "2017东城区人口死亡率(‰)": "3",
        "2017东城区教育人口": "1",
        "2018东城区教育人口": "17",
        "2018朝阳区出生人口数(人)": "26",
        "2017西城区教育人口": "5",
        "2018西城区教育人口": "21",
        "2018海淀区出生人口数(人)": "30",
        "2018东城区出生人口数(人)": "18",
        "2018海淀区常住人口(万人)": "28",
        "2018西城区人口死亡率(‰)": "23",
        "2018东城区常住人口(万人)": "16",
        "2018东城区人口死亡率(‰)": "19",
        "2019朝阳区人口死亡率(‰)": "43",
        "2018西城区常住人口(万人)": "20",
        "2019西城区教育人口": "37",
        "2017朝阳区常住人口(万人)": "8",
        "2019海淀区人口死亡率(‰)": "47",
        "2017西城区出生人口数(人)": "6",
        "2017东城区出生人口数(人)": "2",
        "2019海淀区出生人口数(人)": "46",
        "2019海淀区教育人口": "45",
        "2017东城区常住人口(万人)": "0",
        "2017朝阳区出生人口数(人)": "10",
        "2017海淀区常住人口(万人)": "12",
        "2018海淀区教育人口": "29",
        "2019西城区人口死亡率(‰)": "39",
        "2017海淀区教育人口": "13",
        "2019东城区人口死亡率(‰)": "35",
        "2017西城区常住人口(万人)": "4",
        "2018朝阳区常住人口(万人)": "24",
        "2018海淀区人口死亡率(‰)": "31"
    }
};
/**
 * 转置使用
 * 默认 ["year", "distinct", "quota"],
 */
var __param = ["distinct", "quota", "year"];

initTable("dataDiv", __param, res);

/**
 * 反射考虑用eval
 * @param id 生成表格的div盒子
 * @param param 表头数组 分别是左指标，上指标，下指标
 * @param res
 */
function initTable(id, param, res) {
    let defaultParam = res["title"];
    if (!param) {
        param = defaultParam;
    }
    let leftArr = res[param[0]];
    let topArr = res[param[1]];
    let middleArr = res[param[2]];
    let data = res["data"];
    let tableDiv = $("#" + id);
    tableDiv.html("");
    let html = "<table border=\"1\">\n" +
        "        <tbody>\n" +
        "<tr>"
    "<th rowspan=\"2\"></th>";
    html += "<th rowspan=\"2\"></th>"
    for (let i = 0; i < topArr.length; i++) {
        let td = "            <th colspan=\"" + middleArr.length + "\">" + topArr[i] + "</th>";
        html = html + td;
    }
    html += "</tr>"
    html += "<tr>"
    for (let i = 0; i < topArr.length; i++) {
        for (let j = 0; j < middleArr.length; j++) {
            let td = "            <th>" + middleArr[j] + "</th>";
            html = html + td;
        }
    }
    html += "</tr>"
    let sortArr = sort(param, defaultParam);
    for (let i = 0; i < leftArr.length; i++) {
        html += "<tr>"
        html += "<td>" + leftArr[i] + "</td>"
        for (let j = 0; j < topArr.length; j++) {
            for (let k = 0; k < middleArr.length; k++) {
                // todo 待改为可转置的
                let tmp = sortString(param, defaultParam, sortArr, leftArr[i], topArr[j], middleArr[k]);
                html += "<td>" + data[tmp] + "</td>"
            }
        }
        html += "</tr>"
    }
    html += "</tbody>"
    tableDiv.html(html);
}

/**
 * 映射字段排序
 * @param param 转置后的表头
 * @param defaultParam 默认的表头
 * @param str1 字符串1
 * @param str2 字符串2
 * @param str3 字符串3
 * @returns {string}
 */
function sortString(param, defaultParam, sortArr, str1, str2, str3) {
    let str = "";
    //str=str1+str2+str3;
    var func = "str=str" + sortArr[0] + "+str" + sortArr[1] + "+str" + sortArr[2] + ";";
    eval(func);
    return str;
}

function sort(param, defaultParam) {
    let sortArr = [];
    for (let i = 0; i < defaultParam.length; i++) {
        for (let j = 0; j < param.length; j++) {
            if (param[j] == defaultParam[i]) {
                sortArr.push(j + 1);
            }
        }
    }
    return sortArr;
}

/**
 * 按钮测试，随机生成param
 */
function trans() {
    let param = ["quota", "distinct", "year"];
    param = shuffle(param);
    initTable("dataDiv", param, res);
}

function shuffle(param) {
    for (let i = param.length - 1; i >= 0; i--) {
        let num = Math.floor(Math.random() * param.length);
        let temp = param[i];
        param[i] = param[num];
        param[num] = temp;
    }
    return param;
}


