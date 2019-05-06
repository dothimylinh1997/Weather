var message = require("./../util/message");
var weatherService = require("./../service/weather.service");
var weather = require('../model/weather');

module.exports = {
    getAllWeather: getAllWeather,
    getOneWeather: getOneWeather,
    createWeather: createWeather,
    updateWeather: updateWeather,
    deleteWeather: deleteWeather,
    findCityByName: findCityByName
}

function getAllWeather(req, res, next) {
    weatherService.getAllWeather((err, response) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(response);
        }
    });
}

function updateWeather(req, res, next) {
    var _id = req.params.id;
    var weatherData = req.body;
    weatherService.updateWeather(_id, weatherData).then(() => {
        res.send(weatherData);
    }).catch((err) => {
        res.status(400).send(err);
    });
}

function findCityByName(req, res) {
    const cityName = convert_cityname(req.params.cityname);
    console.log(cityName);
    let _citys = [];
    weather.find().then(citys => {
        for (let index = 0; index < citys.length; index++) {
            if (convert_cityname(citys[index].name).includes(cityName)) {
                _citys.push(citys[index]);
            }
        }
        console.log(_citys);
        res.send(_citys);
    }).catch(err => {
        res.send({ message: err.message });
    })
}

function getOneWeather(req, res, next) {
    let id = req.params.id;
    if (!id) {
        res.status(400).send({
            message: message.ERROR_MESSAGE.WEATHER.INVALD
        });
    }

    weatherService.getOneWeather(id).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(400).send(err);
    })
}

// function createWeather(req, res, next) {
//     var params = {
//         name: req.body.name,
//         description: req.body.description,
//         day: [{ dayName: req.body.dayName, temp: req.body.temp }],
//         time: req.body.time,
//         tempmax: req.body.tempmax,
//         tempmin: req.body.tempmin,
//         tempnow: req.body.tempnow,
//         humid: req.body.humid,
//         statenow: req.body.statenow,
//         uv: req.body.uv,
//         winspeed: req.body.winspeed
//     }

//     weatherService.createWeather(params, (err, response) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(response);
//         }
//     });
// }

function createWeather(req, res, next) {
    weather.findOne({ name: req.body.name }).then((result) => {
        if (!result) {
            var newWeather = new weather(req.body);
            newWeather.save().then((Weather) => {
                console.log(Weather);

                return res.send(Weather);
            }).catch((err) => {
                console.log('catch');

                return res.send(err.message);
            });
        } else {
            console.log('server');

            return res
                .status(404)
                .send({ message: "Thanh pho da ton tai. Kiem tra lai" });
        }
    });
}


function deleteWeather(req, res, next) {
    let id = req.params.id;

    weatherService.deleteWeather(id).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(err.statusCode).send(err);
    });
}

function convert_cityname(str) {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
}