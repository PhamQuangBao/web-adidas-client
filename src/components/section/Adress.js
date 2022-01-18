import React, { useState } from 'react'

import Data from '../data/data_address.json'

function Adress(props) {
    const address = Data

    const [chooseDistricts, setDistrictsy] = useState(0);
    const [chooseWards, setWards] = useState(0);
    
    function setvalProvince(province){
        props.callBacksetProvince(province)
    }
    function setvalDistricts(districts){
        props.callBacksetDistricts(districts)
    }
    function setvalWards(wards){
        props.callBacksetWards(wards)
    }



    return (
        <div className="address-container">
            <select className="form-control" onChange={(e) => {
                setDistrictsy(e.target.options[e.target.options.selectedIndex].getAttribute('data-key')),
                setvalProvince(e.target.value)
            }}>
                <option key="0" >Tỉnh/ Thành phố</option>
                {
                    address.map((item, index) => (
                        <option key={index} data-key={index} value={item.Name}>{item.Name}</option>
                    ))
                }
            </select>

            <div className="address-container-chil">
                <select className="form-control-chil-1" onChange={(e) => {
                    setWards(e.target.options[e.target.options.selectedIndex].getAttribute('data-key')),
                    setvalDistricts(e.target.value)
                }}>
                    <option key="0" >Quận/ Huyện</option>
                    {
                        (address[chooseDistricts].Districts).map((item, index) => (
                            <option key={item.Id} data-key={index} value={item.Name}>{item.Name}</option>
                        ))
                    }
                </select>
                <select className="form-control-chil-2" onChange={(e) => {
                    setvalWards(e.target.value)
                }}>
                    <option key="0" >Phường/ Xã</option>
                    {
                        ((address[chooseDistricts].Districts)[chooseWards].Wards).map((item, index) => (
                            <option key={item.Id} data-key={index} value={item.Name}>{item.Name}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )

}

export default Adress
