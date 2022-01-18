import React, { Component } from 'react';

export const DataContext = React.createContext();

export class DataProvider extends Component {
    
    state = {
        products: [
            {
                // E:/4 (Ky 1 Nam 4)/PBL6/web_client/src/components
                "_id": "1",
                "title": "Shoes 01",
                "src": "/giay_nam_01.png",
                "Description": "Giay bao dep sai 1 ngay hung lien nen dung mua",
                "Content": "Khong biet ghi gi trong nay het a",
                "price": 5000,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1

            },
            {
                "_id": "2",
                "title": "Shoes 02",
                "src": "/giay_nam_02.png",
                "Description": "Giay bao dep sai 1 ngay hung lien nen dung mua",
                "Content": "Khong biet ghi gi trong nay het a",
                "price": 2700,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1

            },
            {
                "_id": "3",
                "title": "Shoes 03",
                "src": "/giay_nam_03.png",
                "Description": "Giay bao dep sai 1 ngay hung lien nen dung mua",
                "Content": "Khong biet ghi gi trong nay het a",
                "price": 5000,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1

            },
            {
                "_id": "4",
                "title": "Shoes 04",
                "src": "/giay_nam_04.png",
                "Description": "Giay bao dep sai 1 ngay hung lien nen dung mua",
                "Content": "Khong biet ghi gi trong nay het a",
                "price": 4000,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1

            },
            {
                "_id": "5",
                "title": "Shoes 05",
                "src": "/giay_nam_05.png",
                "Description": "Giay bao dep sai 1 ngay hung lien nen dung mua",
                "Content": "Khong biet ghi gi trong nay het a",
                "price": 3600,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1

            },
            {
                "_id": "6",
                "title": "Shoes 06",
                "src": "/giay_nam_06.png",
                "Description": "Giay bao dep sai 1 ngay hung lien nen dung mua",
                "Content": "Khong biet ghi gi trong nay het a",
                "price": 6000,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1

            },
            {
                "_id": "7",
                "title": "Shoes 07",
                "src": "/giay_nam_07.png",
                "Description": "Giay bao dep sai 1 ngay hung lien nen dung mua",
                "Content": "Khong biet ghi gi trong nay het a",
                "price": 2300,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1

            },
            {
                "_id": "8",
                "title": "Shoes 08",
                "src": "/giay_nam_08.png",
                "Description": "Giay bao dep sai 1 ngay hung lien nen dung mua",
                "Content": "Khong biet ghi gi trong nay het a",
                "price": 1000,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1

            },
            {
                "_id": "9",
                "title": "Shoes 09",
                "src": "/giay_nam_09.png",
                "Description": "Giay bao dep sai 1 ngay hung lien nen dung mua",
                "Content": "Khong biet ghi gi trong nay het a",
                "price": 5400,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1

            },
            {
                "_id": "10",
                "title": "Shoes 010",
                "src": "/giay_nam_010.png",
                "Description": "Giay bao dep sai 1 ngay hung lien nen dung mua",
                "Content": "Khong biet ghi gi trong nay het a",
                "price": 3000,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 4

            },

            
        ]
    }
    
    render() {
        const {products} = this.state;

        return(
            <DataContext.Provider value={{products}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}

