import Toastify from 'toastify-js'

export const add_src_http = (string) => {
    const localhost = 'http://127.0.0.1:8000/'

    var temp = string
    var val = ""
    var b = temp.search("http://")
    if (b == -1) {
        val = localhost + temp
    }
    else {
        val = string
    }
    return val
}
export const getFormatImageSource = (imageSource) => {
    let customImageSource = imageSource.trim();

    if (!customImageSource.startsWith('http')) {
        customImageSource = `http://127.0.0.1:8000/${customImageSource}`
    }

    return customImageSource;
}

export const getImageListByString = (string) => {
    var newString = ""
    const arr_image = pri_cutUrlinImage_list(string)
    for (let i = 0; i < arr_image.length; i++) {
        const val = pri_getFormatImageSource(arr_image[i])
        if (i != (arr_image.length - 1)) {
            newString = newString + val + ";"
        } else {
            newString = newString + val
        }
    }
    return newString
}

export const cutUrlinSpecification = (string) => {
    var list_index = []
    var temp = string
    while (true) {
        var len = temp.length;
        var b = temp.search(";")
        if (b == -1) {
            list_index.push(temp.slice(b + 1, len))
            break;
        } else {
            list_index.push(temp.slice(0, b))
            temp = temp.slice(b + 1, len)
        }

    }
    return list_index
}

export const Toast = (string, color, time) => {

    return Toastify({
        text: string,
        className: "info",
        newWindow: true,
        position: "right",
        duration: time,
        style: {
            display: "flex",
            "min-width": "280px",
            height: "40px",
            color: "#fff",
            background: color,
            //"#f74747"
            position: "fixed",
            "margin-top": "87px",
            "padding-right": "10px",
            "padding-left": "10px",
            right: "25px",
            "font-size": "14px",
            "justify-content": "center",
            "align-items": "center",
            "border-radius": '5px',
        },
    }).showToast();
}
const pri_cutUrlinImage_list = (string) => {
    var list_index = []
    var temp = string
    while (true) {
        var len = temp.length;
        var a = 0
        var b = temp.search(".jpg")
        if (b == -1) {
            break;
        }
        list_index.push(temp.slice(a, b + 4))
        temp = temp.slice(b + 5, len)
    }
    return list_index
}
export const cutUrlinImage_list = (string) => {
    var list_index = []
    var temp = string
    while (true) {
        var len = temp.length;
        var a = 0
        var b = temp.search(".jpg")
        if (b == -1) {
            break;
        }
        list_index.push(temp.slice(a, b + 4))
        temp = temp.slice(b + 5, len)
    }
    return list_index
}
const pri_getFormatImageSource = (imageSource) => {
    let customImageSource = imageSource.trim();

    if (!customImageSource.startsWith('http')) {
        customImageSource = `https://shop-adidas.herokuapp.com/${customImageSource}`
        //http://127.0.0.1:8000/
        //http://127.0.0.1:8000/product/36/chup-anh-giay-dep (1).jpg
    }

    return customImageSource;
}
export const getFormatVnPaySource = (vnpaySource) => {
    let customImageSource = vnpaySource.trim();
    let index = customImageSource.search('vnp_ResponseCode')

    if (index != -1) {
        let check = customImageSource.slice(index + 17, index + 17 + 2)
        if (check == "00") {
            return 1
        }
        else {
            let length_string = customImageSource.length;
            let index_false = customImageSource.search('vnp_TxnRef')
            let temp_string = customImageSource.slice(index_false, length_string)
            let val_TxnRef = temp_string.slice(11, temp_string.search('&'))
            return parseInt(val_TxnRef)
        }
    }
    else {
        return 0
    }
}
export const getFormatVnPay_DateSource = (vnpaySource) => {
    let customImageSource = vnpaySource.trim();
    customImageSource.search('vnp_PayDate');//date_pay.slice(8, 10) + ":" + date_pay.slice(10, 12)
    let date_pay = customImageSource.slice((customImageSource.search('vnp_PayDate') + 12), (customImageSource.search('vnp_PayDate') + 12 + 14))
    let string_date = "Vào lúc " + pri_train_datetime(date_pay.slice(8, 10), date_pay.slice(10, 12)) + " |" + " ngày " + date_pay.slice(6, 8) + "/" + date_pay.slice(4, 6) + "/" + date_pay.slice(0, 4)
    return string_date
}
const pri_train_datetime = (hour, minute) => {
    let val = ""
    let hour_temp = parseInt(hour)
    let minute_temp = parseInt(minute)
    if (hour_temp - 12 < 0) {
        val = hour + ":" + minute + " AM"
    } else {
        val = hour_temp - 12 + ":" + minute + " PM"
    }
    return val
}