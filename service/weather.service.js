var weather = require("../model/weather");
var message = require("./../util/message");
module.exports = {
  getAllWeather: getAllWeather,
  getOneWeather: getOneWeather,
  createWeather: createWeather,
  // updateWeather: updateWeather,
  deleteWeather: deleteWeather
};

function getAllWeather(callback) {
  
  weather.find({}).exec((err, weathers) => {
    if (err) {   
      callback(err);
    } else {
      callback(null, weathers);
    }
  });
}


function getOneWeather(id) {
  return new Promise((res, rej) => {
    //tìm một địa điểm có _id = id
    weather.findOne({ _id: id}).exec((err, weatherData) => {
      if (err) {
        rej(err);
      } else {
        if (!weatherData) {
          rej({
            statusCode: 400,
            message: message.ERROR_MESSAGE.WEATHER.NOT_FOUND
          });
        } else {
          res(weatherData);
        }
      }
    });
  });
}

function createWeather(request, callback) {
  var newWeather = new weather({
    name:request.name,
    description:request.description,
    day:[{dayName:request.dayName,temp:request.temp}],
    time:request.time,
    tempmax:request.tempmax,
    tempmin:request.tempmin,
    tempnow:request.tempnow,
    humid:request.humid,
    statenow: request.statenow,
    uv: request.uv,
    winspeed:request.winspeed
  });
 
  newWeather.save((err, response) => {
    if (err) {
      callback(err);
    } else {
      callback(null,response);
    }
  });
}

// function updateWeather(request) {
//   return new Promise((res, rej) => {
//     weather.find({
//         _id: request.id
//       }).exec((err, weatherData) => {
//         if (err) {
//           rej(err);
//         } else {
//           if (!weatherData) {
//             rej({
//               statusCode: 400,
//               message: message.ERROR_MESSAGE.WEATHER.NOT_FOUND
//             });
//           } else {
//             // có địa chỉ id của địa điểm mình cần sửa thì cập nhật lại dữ liệu
//             weatherData.name = request.name || weatherData.name;
//             weatherData.description = request.description || weatherData.description;
//             weatherData.day = request.day || weatherData.day;
//             weatherData.time = request.time || weatherData.time;
//             weatherData.tempmax = request.tempmax || weatherData.tempmax; 
//             weatherData.tempmin = request.tempmin || weatherData.tempmin; 
//             weatherData.tempnow = request.tempnow || weatherData.tempnow;
//             weatherData.statenow = request.statenow || weatherData.statenow;
//             weatherData.uv = request.uv || weatherData.uv;
//             weatherData.winspeed = request.winspeed || weatherData.winspeed;
//             weatherData.save((err, response) => {
//               if (err) {
//                 rej(err);
//               } else {
//                 res(response); 
//               }
//             });
//           }
//         }
//       });
//   });
// }

function deleteWeather(id) {
  return new Promise((res, rej) => {
    weather.find({ _id: id }).exec((err, weatherData) => {
      if (err) {
        rej(err);
      } else {
        if (!weatherData) {
          rej({
            statusCode: 400,
            message: message.ERROR_MESSAGE.WEATHER.NOT_FOUND
          });
        }else{
            weather.remove({_id:id}).exec((err,response) => {
                if(err){
                    rej(err);
                }else{
                    res({
                        message: message.SUCCESS_MESSAGE.WEATHER.DELETED
                    });
                }
            })
        }
      }
    });
  });
}
